"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useReducedMotion, useScroll } from "motion/react";
import { Ring3DCard, Ring3DCardData } from "./Ring3DCard";
import "./ring3d.css";

/* ------------------------------------------------
   Component Props
   ------------------------------------------------ */
export interface Ring3DProps<T = Ring3DCardData> {
  items: T[];
  renderCard?: (item: T, index: number, isFront: boolean) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

/* ------------------------------------------------
   Helper: normalize angle to [-180, 180]
   ------------------------------------------------ */
function normalizeAngle(deg: number): number {
  let angle = deg % 360;
  if (angle > 180) angle -= 360;
  if (angle < -180) angle += 360;
  return angle;
}

/* ================================================
   1-Item Specialization: SingleCardTilt
   Pointer-based 3D tilt interaction (max ±6°),
   idle bobbing, no arrows or counter.
   ================================================ */
function SingleCardTilt<T>({
  item,
  renderCard,
  ariaLabel,
  className = "",
}: {
  item: T;
  renderCard?: (item: T, index: number, isFront: boolean) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Pause float when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    const maxTilt = 6;
    setTilt({
      x: -ny * maxTilt,
      y: nx * maxTilt,
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  if (shouldReduceMotion) {
    return (
      <div
        role="region"
        aria-label={ariaLabel || "Card"}
        className={`ring3d-single-stage ${className}`}
      >
        <div className="ring3d-single-card">
          {renderCard ? (
            renderCard(item, 0, true)
          ) : (
            <Ring3DCard
              data={item as unknown as Ring3DCardData}
              isFront={true}
              tabIndex={0}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel || "Interactive 3D card"}
      className={`ring3d-single-stage ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className={`ring3d-single-card ${
          isVisible ? "ring3d-float" : "ring3d-float-paused"
        }`}
        style={{
          transform: `rotateX(${-4 + tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? "transform 0.12s cubic-bezier(0.2, 0, 0, 1)"
            : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
          boxShadow:
            "0 24px 48px -12px rgba(10, 10, 10, 0.12), 0 0 1px rgba(10, 10, 10, 0.08)",
        }}
      >
        {renderCard ? (
          renderCard(item, 0, true)
        ) : (
          <Ring3DCard
            data={item as unknown as Ring3DCardData}
            isFront={true}
            tabIndex={0}
          />
        )}
      </div>
    </div>
  );
}

/* ================================================
   Main Ring3D Carousel Engine
   Supports Arc (2-5 items) and Full Cylinder (≥6 items)
   ================================================ */
export function Ring3D<T = Ring3DCardData>({
  items,
  renderCard,
  ariaLabel = "3D Ring Carousel",
  className = "",
}: Ring3DProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const N = items.length;

  // Single-item fallback delegation
  if (N === 1) {
    return (
      <SingleCardTilt
        item={items[0]}
        renderCard={renderCard}
        ariaLabel={ariaLabel}
        className={className}
      />
    );
  }

  if (N === 0) {
    return null;
  }

  return (
    <Ring3DMulti
      items={items}
      renderCard={renderCard}
      ariaLabel={ariaLabel}
      className={className}
      shouldReduceMotion={!!shouldReduceMotion}
    />
  );
}

/* ------------------------------------------------
   Multi-Card Implementation (N >= 2)
   ------------------------------------------------ */
function Ring3DMulti<T>({
  items,
  renderCard,
  ariaLabel,
  className,
  shouldReduceMotion,
}: {
  items: T[];
  renderCard?: (item: T, index: number, isFront: boolean) => React.ReactNode;
  ariaLabel: string;
  className: string;
  shouldReduceMotion: boolean;
}) {
  const N = items.length;
  const isFullCylinder = N >= 6;

  // Container refs
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedRowRef = useRef<HTMLDivElement>(null);

  // Carousel angles & geometry
  const cardWidth = 250; // px
  const cardHeight = 360; // px

  const { angles, radius, stepAngle } = useMemo(() => {
    if (isFullCylinder) {
      const step = 360 / N;
      // Cylinder radius edge-to-edge with ~35px gap
      const gap = 36;
      const r = Math.round((cardWidth + gap) / (2 * Math.sin(Math.PI / N)));
      const angs = items.map((_, i) => i * step);
      return { angles: angs, radius: r, stepAngle: step };
    } else {
      // Arc mode: cards arranged with comfortable angular spread in front
      const totalArc = Math.min(130, (N - 1) * 36);
      const step = totalArc / (N - 1);
      const angs = items.map((_, i) => (i - (N - 1) / 2) * step);
      const r = 420;
      return { angles: angs, radius: r, stepAngle: step };
    }
  }, [N, isFullCylinder, items]);

  // Rest tilts for organic handmade feel
  const restTilts = useMemo(() => {
    return items.map((_, i) => ({
      tiltX: (((i * 47 + 13) % 31) / 31 - 0.5) * 3, // ±1.5°
      tiltZ: (((i * 67 + 29) % 31) / 31 - 0.5) * 3, // ±1.5°
      delay: -((i * 1.7) % 5), // phase offset in s
      duration: 4.6 + (i % 3) * 0.7, // 4.6s - 6.0s
    }));
  }, [items]);

  // Active front index and rotation state
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorInside, setIsCursorInside] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Target rotation for programmatic animations
  const targetRotRef = useRef(0);
  const currentRotRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Drag tracking refs
  const dragStartRef = useRef<{
    startX: number;
    startRot: number;
    lastX: number;
    lastTime: number;
    velocity: number;
  }>({
    startX: 0,
    startRot: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  // Entrance opening animation offset (starts at 60° offset, relaxes to 0°)
  const entranceOffsetRef = useRef(60);

  // Parallax scroll drift
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });

  const scrollDriftRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (shouldReduceMotion) return;
      // Parallax scroll rotates by ~1.5 card steps across full section scroll
      const drift = (progress - 0.5) * (1.5 * stepAngle);
      scrollDriftRef.current = drift;
    });
    return () => unsubscribe();
  }, [scrollYProgress, stepAngle, shouldReduceMotion]);

  // Viewport intersection observer (pauses animation offscreen, triggers entrance)
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let entranceTriggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !entranceTriggered) {
          entranceTriggered = true;
          // Animate entranceOffsetRef from 60 to 0 over 1.2s
          const startTime = performance.now();
          const startOffset = 60;
          const animateEntrance = (time: number) => {
            const elapsed = (time - startTime) / 1200;
            if (elapsed < 1) {
              // Smooth cubic ease out: 1 - Math.pow(1 - elapsed, 3)
              const ease = 1 - Math.pow(1 - elapsed, 3);
              entranceOffsetRef.current = startOffset * (1 - ease);
              requestAnimationFrame(animateEntrance);
            } else {
              entranceOffsetRef.current = 0;
            }
          };
          requestAnimationFrame(animateEntrance);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute active front index from rotation
  const computeActiveIndex = useCallback(
    (rot: number) => {
      let bestIdx = 0;
      let minDiff = Infinity;

      for (let i = 0; i < N; i++) {
        const effAngle = normalizeAngle(angles[i] + rot);
        const diff = Math.abs(effAngle);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = i;
        }
      }
      return bestIdx;
    },
    [N, angles]
  );

  // Main RAF animation loop: spring physics / smooth interpolation
  useEffect(() => {
    if (shouldReduceMotion) return;

    let lastFrameTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastFrameTime) / 1000, 0.05);
      lastFrameTime = time;

      if (!isDraggingRef.current) {
        // Spring-like interpolation toward target rotation
        const diff = targetRotRef.current - currentRotRef.current;
        if (Math.abs(diff) > 0.01) {
          // Lerp speed proportional to delta
          const speed = 7.5;
          currentRotRef.current += diff * Math.min(speed * dt, 0.95);
        } else {
          currentRotRef.current = targetRotRef.current;
        }
      }

      // Total visual rotation includes entrance and subtle scroll drift
      const totalVisualRot =
        currentRotRef.current +
        entranceOffsetRef.current +
        scrollDriftRef.current;

      setRotation(totalVisualRot);
      setActiveIndex(computeActiveIndex(totalVisualRot));

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [computeActiveIndex, shouldReduceMotion]);

  // Keep a ref of isDragging for the RAF loop
  const isDraggingRef = useRef(isDragging);
  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Snap to a specific card index
  const snapToIndex = useCallback(
    (idx: number, immediate = false) => {
      const clampedIdx = isFullCylinder
        ? (idx + N) % N
        : Math.max(0, Math.min(N - 1, idx));

      let targetAngle: number;
      if (isFullCylinder) {
        // Find nearest rotation matching this card angle
        const currentNorm = currentRotRef.current;
        const cardAngle = angles[clampedIdx];
        // We want (cardAngle + rot) % 360 = 0 -> rot = -cardAngle + k * 360
        const k = Math.round((currentNorm + cardAngle) / 360);
        targetAngle = -cardAngle + k * 360;
      } else {
        targetAngle = -angles[clampedIdx];
      }

      targetRotRef.current = targetAngle;
      if (immediate) {
        currentRotRef.current = targetAngle;
      }
    },
    [N, angles, isFullCylinder]
  );

  // Arrow controls
  const handlePrev = useCallback(() => {
    if (isFullCylinder) {
      snapToIndex(activeIndex - 1);
    } else {
      if (activeIndex > 0) snapToIndex(activeIndex - 1);
    }
  }, [activeIndex, isFullCylinder, snapToIndex]);

  const handleNext = useCallback(() => {
    if (isFullCylinder) {
      snapToIndex(activeIndex + 1);
    } else {
      if (activeIndex < N - 1) snapToIndex(activeIndex + 1);
    }
  }, [activeIndex, N, isFullCylinder, snapToIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Pointer drag events on stage
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);

    const now = performance.now();
    dragStartRef.current = {
      startX: e.clientX,
      startRot: currentRotRef.current,
      lastX: e.clientX,
      lastTime: now,
      velocity: 0,
    };

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Track cursor position for custom cursor
    setCursorPos({ x: e.clientX, y: e.clientY });

    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    // Drag sensitivity ~0.22 deg per pixel
    const sensitivity = 0.22;
    const nextRot = dragStartRef.current.startRot + deltaX * sensitivity;

    // In arc mode, apply soft rubber banding beyond limits
    if (!isFullCylinder) {
      const minRot = -angles[N - 1];
      const maxRot = -angles[0];
      if (nextRot < minRot) {
        currentRotRef.current = minRot + (nextRot - minRot) * 0.25;
      } else if (nextRot > maxRot) {
        currentRotRef.current = maxRot + (nextRot - maxRot) * 0.25;
      } else {
        currentRotRef.current = nextRot;
      }
    } else {
      currentRotRef.current = nextRot;
    }

    targetRotRef.current = currentRotRef.current;

    // Velocity computation
    const now = performance.now();
    const dt = now - dragStartRef.current.lastTime;
    if (dt > 10) {
      const dx = e.clientX - dragStartRef.current.lastX;
      dragStartRef.current.velocity = (dx / dt) * sensitivity * 16.6;
      dragStartRef.current.lastX = e.clientX;
      dragStartRef.current.lastTime = now;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }

    // Inertia: apply velocity flick
    const inertia = dragStartRef.current.velocity * 6;
    const projectedRot = currentRotRef.current + inertia;

    // Find nearest snap card to projected rotation
    let bestIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < N; i++) {
      if (isFullCylinder) {
        const diff = Math.abs(normalizeAngle(angles[i] + projectedRot));
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = i;
        }
      } else {
        const targetRot = -angles[i];
        const diff = Math.abs(targetRot - projectedRot);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = i;
        }
      }
    }

    snapToIndex(bestIdx);
  };

  // Cursor hover state
  const handlePointerEnter = () => setIsCursorInside(true);
  const handlePointerLeave = () => {
    setIsCursorInside(false);
    if (isDragging) setIsDragging(false);
  };

  /* ------------------------------------------------
     Reduced-Motion Fallback: Flat horizontal scroll-snap
     ------------------------------------------------ */
  if (shouldReduceMotion) {
    return (
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={`w-full ${className}`}
      >
        <div
          ref={reducedRowRef}
          className="ring3d-reduced-row"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                width: "min(80vw, 320px)",
                flexShrink: 0,
              }}
            >
              {renderCard ? (
                renderCard(item, i, true)
              ) : (
                <Ring3DCard
                  data={item as unknown as Ring3DCardData}
                  isFront={true}
                  tabIndex={0}
                />
              )}
            </div>
          ))}
        </div>

        {/* Flat Controls */}
        <div className="ring3d-controls">
          <button
            type="button"
            className="ring3d-arrow-btn"
            onClick={() => {
              reducedRowRef.current?.scrollBy({
                left: -280,
                behavior: "smooth",
              });
            }}
            aria-label="Previous card"
          >
            ←
          </button>
          <span className="ring3d-counter">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(N).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="ring3d-arrow-btn"
            onClick={() => {
              reducedRowRef.current?.scrollBy({
                left: 280,
                behavior: "smooth",
              });
            }}
            aria-label="Next card"
          >
            →
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------
     Standard 3D Ring Render
     ------------------------------------------------ */
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={`w-full select-none ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Stage: perspective container */}
      <div
        ref={stageRef}
        className="ring3d-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          cursor: isDragging ? "grabbing" : isCursorInside ? "none" : "default",
        }}
      >
        {/* Custom floating cursor (desktop fine pointer only) */}
        {isCursorInside && (
          <div
            className="ring3d-cursor-el hidden md:flex"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              width: isDragging ? "76px" : "68px",
              height: isDragging ? "36px" : "36px",
              background: isDragging
                ? "var(--accent, #e5341b)"
                : "var(--ink, #0a0a0a)",
            }}
            aria-hidden="true"
          >
            {isDragging ? "DRAGGING" : "← DRAG →"}
          </div>
        )}

        {/* Ring: rotates around Y-axis with -10° top-down tilt */}
        <div
          ref={ringRef}
          className="ring3d-ring"
          style={{
            transform: `rotateX(-10deg) rotateY(${rotation}deg)`,
          }}
        >
          {items.map((item, i) => {
            const cardAngle = angles[i];
            const effAngle = normalizeAngle(cardAngle + rotation);
            const cosVal =
              (Math.cos((effAngle * Math.PI) / 180) + 1) / 2; // 0 (back) to 1 (front)

            // Smooth depth shading factors
            const opacity = 0.35 + 0.65 * cosVal;
            const scale = 0.92 + 0.08 * cosVal;
            const brightness = 0.85 + 0.15 * cosVal;
            const blur = (1 - cosVal) * 2; // 0px to 2px
            const isFront = i === activeIndex;

            const tilt = restTilts[i];

            return (
              <div
                key={i}
                className="ring3d-card-slot"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                }}
              >
                {/* Organic idle floating animation + rest tilt */}
                <div
                  className={`ring3d-float ${
                    isInView ? "" : "ring3d-float-paused"
                  }`}
                  style={{
                    animationDelay: `${tilt.delay}s`,
                    animationDuration: `${tilt.duration}s`,
                    transform: `rotateX(${tilt.tiltX}deg) rotateZ(${tilt.tiltZ}deg) scale(${scale})`,
                    opacity,
                    filter: `blur(${blur}px) brightness(${brightness})`,
                    boxShadow: isFront
                      ? "0 22px 46px -12px rgba(10, 10, 10, 0.14), 0 0 1px rgba(10, 10, 10, 0.08)"
                      : "none",
                    pointerEvents: isFront ? "auto" : "none",
                    transition:
                      "opacity 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  {renderCard ? (
                    renderCard(item, i, isFront)
                  ) : (
                    <Ring3DCard
                      data={item as unknown as Ring3DCardData}
                      isFront={isFront}
                      tabIndex={isFront ? 0 : -1}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls: Prev / Next buttons + numeric counter */}
      <div className="ring3d-controls">
        <button
          type="button"
          className="ring3d-arrow-btn"
          onClick={handlePrev}
          disabled={!isFullCylinder && activeIndex === 0}
          aria-label="Previous card"
        >
          ←
        </button>

        <span className="ring3d-counter" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(N).padStart(2, "0")}
        </span>

        <button
          type="button"
          className="ring3d-arrow-btn"
          onClick={handleNext}
          disabled={!isFullCylinder && activeIndex === N - 1}
          aria-label="Next card"
        >
          →
        </button>
      </div>
    </div>
  );
}
