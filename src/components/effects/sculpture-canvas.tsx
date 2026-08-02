"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = { theme: "dark" | "light" };

type Particle = {
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  velocity: THREE.Vector3;
  index: number;
};

const NODE_COUNT_DESKTOP = 90;
const NODE_COUNT_MOBILE = 38;
const CONNECT_DISTANCE = 1.4;

function getColors(theme: "dark" | "light") {
  return theme === "light"
    ? {
        accent: new THREE.Color("#71a5de"),
        accent2: new THREE.Color("#83b0e1"),
        warm: new THREE.Color("#d97757"),
        line: new THREE.Color("#1f2937"),
      }
    : {
        accent: new THREE.Color("#83b0e1"),
        accent2: new THREE.Color("#aecbeb"),
        warm: new THREE.Color("#e89b7c"),
        line: new THREE.Color("#f0f4fa"),
      };
}

function Sculpture({ theme }: Props) {
  const groupRef = React.useRef<THREE.Group>(null);
  const linesRef = React.useRef<THREE.LineSegments>(null);
  const pointsRef = React.useRef<THREE.Points>(null);
  const ribbonRef = React.useRef<THREE.Mesh>(null);
  const { viewport, pointer, size } = useThree();
  const colors = React.useMemo(() => getColors(theme), [theme]);

  const isMobile = size.width < 760;
  const nodeCount = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;

  // Particles live in a ref so we can mutate freely each frame.
  const particlesRef = React.useRef<Particle[]>([]);
  if (particlesRef.current.length === 0) {
    const arr: Particle[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const r = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.62;
      const z = r * Math.cos(phi);
      const pos = new THREE.Vector3(x, y, z);
      arr.push({
        position: pos.clone(),
        basePosition: pos.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04
        ),
        index: i,
      });
    }
    particlesRef.current = arr;
  }

  // Points geometry
  const pointsGeometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const colorsArr = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const p = particlesRef.current[i]!;
      positions[i * 3] = p.basePosition.x;
      positions[i * 3 + 1] = p.basePosition.y;
      positions[i * 3 + 2] = p.basePosition.z;
      const c = i % 7 === 0 ? colors.accent2 : i % 11 === 0 ? colors.warm : colors.accent;
      colorsArr[i * 3] = c.r;
      colorsArr[i * 3 + 1] = c.g;
      colorsArr[i * 3 + 2] = c.b;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));
    return geo;
  }, [nodeCount, colors]);

  // Lines geometry — maximum possible pairs
  const linesGeometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxLines = Math.floor((nodeCount * (nodeCount - 1)) / 2);
    const positions = new Float32Array(maxLines * 6);
    const colorsArr = new Float32Array(maxLines * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [nodeCount]);

  // Ribbon — a thin strip of points flowing around the scene
  const ribbonGeometry = React.useMemo(() => {
    return new THREE.PlaneGeometry(0.05, 6, 1, 200);
  }, []);

  // Update lines based on proximity
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const paused = typeof document !== "undefined" && document.hidden;
    if (paused) return;

    const particles = particlesRef.current;

    // Update particles
    for (const p of particles) {
      p.position.x += p.velocity.x * 0.6;
      p.position.y += p.velocity.y * 0.6;
      p.position.z += p.velocity.z * 0.6;
      // gentle gravity back to base
      p.position.lerp(p.basePosition, 0.012);
      // breathing
      const breathe = Math.sin(time * 0.4 + p.index) * 0.04;
      p.position.y += breathe * 0.05;
    }

    // Write positions
    const posAttr = pointsGeometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]!;
      posAttr.setXYZ(i, p.position.x, p.position.y, p.position.z);
    }
    posAttr.needsUpdate = true;

    // Update lines
    const linePosAttr = linesGeometry.getAttribute("position") as THREE.BufferAttribute;
    const lineColAttr = linesGeometry.getAttribute("color") as THREE.BufferAttribute;
    let lineCount = 0;
    const maxLines = (linePosAttr.array.length as number) / 6;
    for (let i = 0; i < particles.length && lineCount < maxLines; i++) {
      for (let j = i + 1; j < particles.length && lineCount < maxLines; j++) {
        const a = particles[i]!;
        const b = particles[j]!;
        const dist = a.position.distanceTo(b.position);
        if (dist < CONNECT_DISTANCE) {
          const alpha = 1 - dist / CONNECT_DISTANCE;
          linePosAttr.setXYZ(lineCount * 2, a.position.x, a.position.y, a.position.z);
          linePosAttr.setXYZ(lineCount * 2 + 1, b.position.x, b.position.y, b.position.z);
          const col = colors.line;
          lineColAttr.setXYZ(lineCount * 2, col.r, col.g, col.b);
          lineColAttr.setXYZ(lineCount * 2 + 1, col.r, col.g, col.b);
          (lineColAttr.array as Float32Array)[lineCount * 6 + 3] *= alpha;
          (lineColAttr.array as Float32Array)[lineCount * 6 + 4] *= alpha;
          (lineColAttr.array as Float32Array)[lineCount * 6 + 5] *= alpha;
          lineCount++;
        }
      }
    }
    linesGeometry.setDrawRange(0, lineCount * 2);
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;

    // Rotate group based on pointer
    if (groupRef.current) {
      const targetRotY = pointer.x * 0.4 + time * 0.04;
      const targetRotX = -pointer.y * 0.25;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    }

    if (ribbonRef.current) {
      ribbonRef.current.rotation.z = time * 0.08;
      const mat = ribbonRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 + Math.sin(time * 0.5) * 0.04;
    }

    void delta;
    void viewport;
    void pointsRef;
    void linesRef;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={isMobile ? 0.07 : 0.06}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={theme === "dark" ? 0.32 : 0.5}
          depthWrite={false}
          blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </lineSegments>
      {/* Center ribbon — a slow rotating translucent plane */}
      <mesh ref={ribbonRef} geometry={ribbonGeometry} rotation={[0.4, 0, 0]}>
        <meshBasicMaterial
          color={colors.accent2}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function SculptureCanvas({ theme }: Props) {
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
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Sculpture theme={theme} />
    </Canvas>
  );
}
