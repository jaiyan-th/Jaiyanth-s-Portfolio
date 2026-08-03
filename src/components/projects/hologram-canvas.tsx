"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────────────────────
   HologramCanvas — Three.js holographic healthcare globe scene
   ────────────────────────────────────────────────────────────────────────────
   Replaces the wellness particle animation with a 3D holographic visual
   inspired by the reference image:
     • Rotating wireframe Earth globe with glowing "continents"
     • Orbital rings encircling the globe
     • Floating medical icons (cross, heart, pulse, user, location, molecule)
     • ECG/heartbeat waveform across the scene
     • Connection lines between icons
     • Soft blue/cyan glow with bloom-like additive blending
   Compact, GPU-friendly, with hover intensification and parallax.
───────────────────────────────────────────────────────────────────────────── */

type Props = { hovered: boolean };

const COLORS = {
  globe: new THREE.Color("#83b0e1"),     // accent (cornflower blue)
  globe2: new THREE.Color("#aecbeb"),    // accent-2 (sky blue)
  ring: new THREE.Color("#6f7cff"),      // secondary blue
  warm: new THREE.Color("#e89b7c"),      // accent-warm
  white: new THREE.Color("#f0f4fa"),     // text-primary
  cyan: new THREE.Color("#7dd3fc"),      // soft cyan for medical feel
};

// ── Wireframe globe with glowing "continents" ────────────────────────────
function Globe({ hovered }: { hovered: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const wireRef = React.useRef<THREE.Mesh>(null);
  const dotsRef = React.useRef<THREE.Points>(null);

  // Generate "continent" dots on the sphere surface
  const dotsGeometry = React.useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random points on sphere surface using fibonacci distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = 1.0;
      const x = Math.cos(theta) * Math.sin(phi) * r;
      const y = Math.sin(theta) * Math.sin(phi) * r;
      const z = Math.cos(phi) * r;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      // Vary colors between blue and cyan
      const rand = Math.random();
      const c = rand < 0.6 ? COLORS.globe : rand < 0.85 ? COLORS.cyan : COLORS.globe2;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, []);

  React.useEffect(() => () => dotsGeometry.dispose(), [dotsGeometry]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = hovered ? 0.3 : 0.15;
      groupRef.current.rotation.y += delta * speed;
    }
    // Subtle pulse on the wireframe
    if (wireRef.current) {
      const t = state.clock.elapsedTime;
      const mat = wireRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial
          color={COLORS.globe}
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Solid faint sphere for depth */}
      <mesh>
        <sphereGeometry args={[0.98, 32, 32]} />
        <meshBasicMaterial
          color={COLORS.globe}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Continent dots */}
      <points ref={dotsRef} geometry={dotsGeometry}>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ── Orbital rings ──────────────────────────────────────────────────────────
function OrbitalRings({ hovered }: { hovered: boolean }) {
  const ring1Ref = React.useRef<THREE.Mesh>(null);
  const ring2Ref = React.useRef<THREE.Mesh>(null);
  const ring3Ref = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = hovered ? 1.4 : 1;
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.2 * speed;
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 3;
      ring2Ref.current.rotation.z = -t * 0.15 * speed;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -Math.PI / 4;
      ring3Ref.current.rotation.z = t * 0.1 * speed;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref}>
        <ringGeometry args={[1.4, 1.42, 64]} />
        <meshBasicMaterial color={COLORS.white} transparent opacity={0.3} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring2Ref}>
        <ringGeometry args={[1.55, 1.57, 64]} />
        <meshBasicMaterial color={COLORS.ring} transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring3Ref}>
        <ringGeometry args={[1.7, 1.72, 64]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.15} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ── Floating medical icons ────────────────────────────────────────────────
const ICON_POSITIONS = [
  { pos: [1.7, 0.9, 0], type: "cross", color: COLORS.warm },
  { pos: [-1.7, 0.7, 0.3], type: "heart", color: COLORS.warm },
  { pos: [1.5, -1.0, 0.2], type: "pulse", color: COLORS.cyan },
  { pos: [-1.6, -0.8, -0.2], type: "user", color: COLORS.globe },
  { pos: [0.4, 1.7, 0.5], type: "location", color: COLORS.globe2 },
  { pos: [-0.5, -1.7, 0.3], type: "molecule", color: COLORS.ring },
] as const;

function FloatingIcons({ hovered }: { hovered: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const floatY = Math.sin(t * 0.8 + i * 0.7) * 0.08;
      const floatX = Math.cos(t * 0.6 + i * 0.5) * 0.04;
      child.position.y = ICON_POSITIONS[i]!.pos[1]! + floatY;
      child.position.x = ICON_POSITIONS[i]!.pos[0]! + floatX;
      // Subtle rotation
      child.rotation.z = Math.sin(t * 0.5 + i) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {ICON_POSITIONS.map((icon, i) => (
        <Icon key={i} {...icon} delay={i * 0.2} hovered={hovered} />
      ))}
    </group>
  );
}

function Icon({
  pos,
  type,
  color,
  delay,
  hovered,
}: {
  pos: readonly number[];
  type: string;
  color: THREE.Color;
  delay: number;
  hovered: boolean;
}) {
  const ref = React.useRef<THREE.Group>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300 + delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const scale = visible ? (hovered ? 1.1 : 1) + Math.sin(t * 2 + delay) * 0.03 : 0;
    ref.current.scale.setScalar(scale);
  });

  return (
    <group ref={ref} position={pos as [number, number, number]}>
      {/* Glow circle background */}
      <mesh>
        <circleGeometry args={[0.18, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Ring */}
      <mesh>
        <ringGeometry args={[0.13, 0.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Icon symbol — simplified shapes */}
      <IconSymbol type={type} color={color} />
    </group>
  );
}

function IconSymbol({ type, color }: { type: string; color: THREE.Color }) {
  // Simple geometric representations of medical icons
  switch (type) {
    case "cross":
      return (
        <group>
          <mesh>
            <planeGeometry args={[0.06, 0.18]} />
            <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh>
            <planeGeometry args={[0.18, 0.06]} />
            <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      );
    case "heart":
      return (
        <mesh>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      );
    case "pulse":
      return (
        <mesh>
          <ringGeometry args={[0.06, 0.08, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      );
    case "user":
      return (
        <mesh>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      );
    case "location":
      return (
        <mesh>
          <circleGeometry args={[0.07, 3]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      );
    case "molecule":
      return (
        <mesh>
          <ringGeometry args={[0.05, 0.07, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      );
    default:
      return null;
  }
}

// ── ECG waveform ──────────────────────────────────────────────────────────
function EcgWave({ hovered }: { hovered: boolean }) {
  const lineRef = React.useRef<THREE.Line>(null);
  const segments = 100;

  const { geometry, baseX } = React.useMemo(() => {
    const positions = new Float32Array(segments * 3);
    const baseX = new Float32Array(segments);
    for (let i = 0; i < segments; i++) {
      const x = (i / (segments - 1) - 0.5) * 4;
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      baseX[i] = x;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry, baseX };
  }, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const intensity = hovered ? 1.5 : 1.2;
    for (let i = 0; i < segments; i++) {
      const x = baseX[i];
      const spikePos = (t * 0.6) % 4 - 2;
      const dist = Math.abs(x - spikePos);
      let y = 0;
      if (dist < 0.1) y = Math.sin((dist / 0.1) * Math.PI) * 0.3 * intensity;
      else if (dist < 0.25) y = -Math.sin(((dist - 0.1) / 0.15) * Math.PI) * 0.1 * intensity;
      y += Math.sin(x * 4 + t * 2) * 0.015;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
    lineRef.current.position.y = -1.8;
    lineRef.current.position.z = 0.5;
  });

  return (
    // @ts-expect-error R3F line element typing
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={COLORS.warm} transparent opacity={hovered ? 0.8 : 0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </line>
  );
}

// ── Connection lines between icons ────────────────────────────────────────
function ConnectionLines({ hovered }: { hovered: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);

  const lines = React.useMemo(() => {
    // Connect icons to the center (globe)
    return ICON_POSITIONS.map((icon) => {
      const positions = new Float32Array(6);
      positions[0] = icon.pos[0]!;
      positions[1] = icon.pos[1]!;
      positions[2] = icon.pos[2]!;
      positions[3] = 0;
      positions[4] = 0;
      positions[5] = 0;
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return geom;
    });
  }, []);

  React.useEffect(() => () => lines.forEach((l) => l.dispose()), [lines]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      mat.opacity = (hovered ? 0.4 : 0.2) + Math.sin(t * 1.5 + i) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((geom, i) => (
        // @ts-expect-error R3F line element typing
        <line key={i} geometry={geom}>
          <lineBasicMaterial
            color={COLORS.cyan}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
}

// ── Central glow halo ─────────────────────────────────────────────────────
function CentralGlow({ hovered }: { hovered: boolean }) {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.2) * 0.05;
    ref.current.scale.setScalar(pulse);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = (hovered ? 0.18 : 0.12) + Math.sin(t * 0.8) * 0.03;
  });
  return (
    <mesh ref={ref}>
      <circleGeometry args={[2.2, 64]} />
      <meshBasicMaterial color={COLORS.globe} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

// ── Parallax wrapper ──────────────────────────────────────────────────────
function ParallaxGroup({ hovered, children }: { hovered: boolean; children: React.ReactNode }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = pointer.x * (hovered ? 0.2 : 0.08);
    const targetY = pointer.y * (hovered ? 0.2 : 0.08);
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ── Scene ─────────────────────────────────────────────────────────────────
function Scene({ hovered }: { hovered: boolean }) {
  return (
    <ParallaxGroup hovered={hovered}>
      <CentralGlow hovered={hovered} />
      <OrbitalRings hovered={hovered} />
      <Globe hovered={hovered} />
      <ConnectionLines hovered={hovered} />
      <FloatingIcons hovered={hovered} />
      <EcgWave hovered={hovered} />
    </ParallaxGroup>
  );
}

export default function HologramCanvas({ hovered }: Props) {
  const [dpr, setDpr] = React.useState<number>(1);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    const capped = Math.min(window.devicePixelRatio || 1, 1.5);
    setDpr(capped);
  }, []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Scene hovered={hovered} />
    </Canvas>
  );
}
