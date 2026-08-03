"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────────────────────
   WellnessCanvas — Three.js particle wellness universe
   ────────────────────────────────────────────────────────────────────────────
   Compact, GPU-friendly particle scene. All geometry is generated procedurally
   and disposed on unmount. Reduced-motion → frameloop="demand" (static).
───────────────────────────────────────────────────────────────────────────── */

type Props = { hovered: boolean };

const COLORS = {
  core: new THREE.Color("#83b0e1"),
  core2: new THREE.Color("#aecbeb"),
  warm: new THREE.Color("#e89b7c"),
  white: new THREE.Color("#f0f4fa"),
  ring: new THREE.Color("#6f7cff"),
};

// ── Central glowing core ──────────────────────────────────────────────────
function Core({ hovered }: { hovered: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const haloRef = React.useRef<THREE.Mesh>(null);
  const halo2Ref = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const beat = Math.pow(Math.sin(t * 1.6) * 0.5 + 0.5, 6) * 0.4 +
                 Math.pow(Math.sin(t * 1.6 + 0.3) * 0.5 + 0.5, 6) * 0.2;
    const baseScale = 1 + beat * 0.18 + (hovered ? 0.05 : 0);

    if (meshRef.current) {
      meshRef.current.scale.setScalar(baseScale);
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.85 + beat * 0.15;
    }
    if (haloRef.current) {
      haloRef.current.scale.setScalar(1 + beat * 0.25 + Math.sin(t * 0.7) * 0.05);
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (hovered ? 0.25 : 0.16) + beat * 0.1;
    }
    if (halo2Ref.current) {
      halo2Ref.current.scale.setScalar(1 + beat * 0.4 + Math.sin(t * 0.5 + 1) * 0.04);
      const mat = halo2Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (hovered ? 0.12 : 0.07) + beat * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={halo2Ref}>
        <circleGeometry args={[1.6, 64]} />
        <meshBasicMaterial color={COLORS.core2} transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={haloRef}>
        <circleGeometry args={[1.0, 64]} />
        <meshBasicMaterial color={COLORS.core} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef}>
        <circleGeometry args={[0.42, 64]} />
        <meshBasicMaterial color={COLORS.white} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ── Orbiting particle galaxy ──────────────────────────────────────────────
function ParticleGalaxy({ hovered }: { hovered: boolean }) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const { size } = useThree();
  const isMobile = size.width < 600;
  const count = isMobile ? 280 : 600;

  // Mutable per-particle state in refs (avoids react-hooks/immutability rule)
  const stateRef = React.useRef({
    positions: new Float32Array(count * 3),
    colors: new Float32Array(count * 3),
    scales: new Float32Array(count),
    angles: new Float32Array(count),
    radii: new Float32Array(count),
    speeds: new Float32Array(count),
    baseY: new Float32Array(count),
  });

  // Initialize once
  if (stateRef.current.angles[0] === 0 && stateRef.current.radii[0] === 0) {
    const s = stateRef.current;
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.5) * 2.6 + 0.6;
      const theta = Math.random() * Math.PI * 2;
      const yJitter = (Math.random() - 0.5) * 0.8;
      s.positions[i * 3] = Math.cos(theta) * r;
      s.positions[i * 3 + 1] = yJitter;
      s.positions[i * 3 + 2] = Math.sin(theta) * r;
      s.baseY[i] = yJitter;
      s.angles[i] = theta;
      s.radii[i] = r;
      s.speeds[i] = (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1);
      const rand = Math.random();
      let c: THREE.Color;
      if (rand < 0.7) c = COLORS.core;
      else if (rand < 0.85) c = COLORS.core2;
      else if (rand < 0.95) c = COLORS.white;
      else c = COLORS.warm;
      s.colors[i * 3] = c.r;
      s.colors[i * 3 + 1] = c.g;
      s.colors[i * 3 + 2] = c.b;
      s.scales[i] = Math.random() * 0.6 + 0.3;
    }
  }

  // Build geometry once
  const geometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(stateRef.current.positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(stateRef.current.colors, 3));
    return g;
  }, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const s = stateRef.current;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const speedMul = hovered ? 1.6 : 1;
    for (let i = 0; i < count; i++) {
      s.angles[i] += s.speeds[i] * delta * 0.15 * speedMul;
      const r = s.radii[i] + Math.sin(t * 0.5 + i) * 0.05;
      posAttr.setXYZ(
        i,
        Math.cos(s.angles[i]) * r,
        s.baseY[i] + Math.sin(t * 0.4 + i * 0.5) * 0.04,
        Math.sin(s.angles[i]) * r
      );
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.032}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Heart-shaped particle cluster ─────────────────────────────────────────
function HeartCluster() {
  const pointsRef = React.useRef<THREE.Points>(null);
  const count = 120;

  const { geometry, basePositions } = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const scale = 0.5;
      const x = scale * 16 * Math.pow(Math.sin(t), 3) * 0.06;
      const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.06;
      const z = (Math.random() - 0.5) * 0.1;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry, basePositions };
  }, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const wobble = Math.sin(t * 1.2 + i * 0.3) * 0.015;
      posAttr.setXYZ(
        i,
        basePositions[i * 3] + wobble,
        basePositions[i * 3 + 1] + Math.cos(t + i * 0.2) * 0.01,
        basePositions[i * 3 + 2]
      );
    }
    posAttr.needsUpdate = true;
    pointsRef.current.position.x = 1.4;
    pointsRef.current.position.y = 0.5;
    pointsRef.current.rotation.z = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.045} color={COLORS.warm} transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// ── DNA-like spiral ribbon ─────────────────────────────────────────────────
function DnaSpiral() {
  const line1Ref = React.useRef<THREE.Line>(null);
  const line2Ref = React.useRef<THREE.Line>(null);

  const { geometry1, geometry2 } = React.useMemo(() => {
    const segments = 80;
    const positions1 = new Float32Array(segments * 3);
    const positions2 = new Float32Array(segments * 3);
    const length = 2.2;
    for (let i = 0; i < segments; i++) {
      const t = i / (segments - 1);
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * length;
      positions1[i * 3] = Math.cos(angle) * 0.25;
      positions1[i * 3 + 1] = y;
      positions1[i * 3 + 2] = Math.sin(angle) * 0.25;
      positions2[i * 3] = Math.cos(angle + Math.PI) * 0.25;
      positions2[i * 3 + 1] = y;
      positions2[i * 3 + 2] = Math.sin(angle + Math.PI) * 0.25;
    }
    const geometry1 = new THREE.BufferGeometry();
    geometry1.setAttribute("position", new THREE.BufferAttribute(positions1, 3));
    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
    return { geometry1, geometry2 };
  }, []);

  React.useEffect(() => () => {
    geometry1.dispose();
    geometry2.dispose();
  }, [geometry1, geometry2]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (line1Ref.current) {
      line1Ref.current.position.x = -1.5;
      line1Ref.current.position.y = -0.2;
      line1Ref.current.rotation.y = t * 0.3;
    }
    if (line2Ref.current) {
      line2Ref.current.position.x = -1.5;
      line2Ref.current.position.y = -0.2;
      line2Ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group>
      {/* @ts-expect-error R3F line element typing */}
      <line ref={line1Ref} geometry={geometry1}>
        <lineBasicMaterial color={COLORS.core2} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </line>
      {/* @ts-expect-error R3F line element typing */}
      <line ref={line2Ref} geometry={geometry2}>
        <lineBasicMaterial color={COLORS.core} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </line>
    </group>
  );
}

// ── ECG pulse wave ────────────────────────────────────────────────────────
function EcgWave({ hovered }: { hovered: boolean }) {
  const lineRef = React.useRef<THREE.Line>(null);
  const segments = 120;

  const { geometry, baseX } = React.useMemo(() => {
    const positions = new Float32Array(segments * 3);
    const baseX = new Float32Array(segments);
    for (let i = 0; i < segments; i++) {
      const x = (i / (segments - 1) - 0.5) * 5;
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
    const intensity = hovered ? 1.4 : 1;
    for (let i = 0; i < segments; i++) {
      const x = baseX[i];
      const spikePos = (t * 0.8) % 5 - 2.5;
      const dist = Math.abs(x - spikePos);
      let y = 0;
      if (dist < 0.15) y = Math.sin((dist / 0.15) * Math.PI) * 0.35 * intensity;
      else if (dist < 0.3) y = -Math.sin(((dist - 0.15) / 0.15) * Math.PI) * 0.12 * intensity;
      y += Math.sin(x * 3 + t * 2) * 0.015;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
    lineRef.current.position.y = -1.2;
  });

  return (
    // @ts-expect-error R3F line element typing
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={COLORS.warm} transparent opacity={hovered ? 0.7 : 0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
    </line>
  );
}

// ── Preventive-health rings ───────────────────────────────────────────────
function HealthRings({ hovered }: { hovered: boolean }) {
  const ring1Ref = React.useRef<THREE.Mesh>(null);
  const ring2Ref = React.useRef<THREE.Mesh>(null);
  const ring3Ref = React.useRef<THREE.Mesh>(null);

  const ringGeom = React.useMemo(() => new THREE.RingGeometry(0.3, 0.32, 64), []);
  React.useEffect(() => () => ringGeom.dispose(), [ringGeom]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = hovered ? 1.3 : 1;
    [ring1Ref, ring2Ref, ring3Ref].forEach((ref, i) => {
      if (!ref.current) return;
      const phase = (t * speed * 0.3 + i * 0.7) % 1;
      const scale = 0.5 + phase * 3;
      ref.current.scale.setScalar(scale);
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - phase) * 0.25;
    });
  });

  return (
    <group>
      <mesh ref={ring1Ref} geometry={ringGeom}>
        <meshBasicMaterial color={COLORS.core} transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring2Ref} geometry={ringGeom}>
        <meshBasicMaterial color={COLORS.core2} transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring3Ref} geometry={ringGeom}>
        <meshBasicMaterial color={COLORS.ring} transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ── Faint rotating energy band ────────────────────────────────────────────
function EnergyBand() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <mesh ref={ref}>
      <ringGeometry args={[1.8, 1.85, 64]} />
      <meshBasicMaterial color={COLORS.core} transparent opacity={0.15} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

// ── Parallax wrapper ──────────────────────────────────────────────────────
function ParallaxGroup({ hovered, children }: { hovered: boolean; children: React.ReactNode }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const target = React.useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;
    target.current.x = pointer.x * (hovered ? 0.15 : 0.05);
    target.current.y = pointer.y * (hovered ? 0.15 : 0.05);
    groupRef.current.rotation.y += (target.current.x - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-target.current.y - groupRef.current.rotation.x) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ── Main scene ────────────────────────────────────────────────────────────
function Scene({ hovered }: { hovered: boolean }) {
  return (
    <ParallaxGroup hovered={hovered}>
      <EnergyBand />
      <HealthRings hovered={hovered} />
      <ParticleGalaxy hovered={hovered} />
      <HeartCluster />
      <DnaSpiral />
      <EcgWave hovered={hovered} />
      <Core hovered={hovered} />
    </ParallaxGroup>
  );
}

export default function WellnessCanvas({ hovered }: Props) {
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
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Scene hovered={hovered} />
    </Canvas>
  );
}
