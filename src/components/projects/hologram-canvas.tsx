"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────────────────────
   HologramCanvas — Dark futuristic wellness dashboard
   ────────────────────────────────────────────────────────────────────────────
   Square 1:1 format, pure black background.

   Composition:
     • Center: large glowing 3D wireframe sphere (triangulated mesh, IcosahedronGeometry)
       with glowing white nodes at vertices — holographic, cool white-blue tones
     • 2 faint gray elliptical orbit rings (one horizontal, one tilted ~35°)
     • 6 small circular badge icons evenly spaced along the orbit paths
       — dark circles with glowing colored rings alternating warm amber / cool blue
       — each contains a minimal line icon (cross, flower, target, ring, badge, dot)
     • Thin spoke lines connecting some badges to the central sphere
     • Small thin orange pulse/heartbeat waveform line near bottom center

   Text overlays (in the HTML wrapper, not the canvas):
     • Top-left: "WELLNESS INTELLIGENCE" + sparkle icon
     • Top-right: "PARTICLE · LIVE"
     • Bottom-left: "FIG.01 / WELLNESS.CORE"
     • Bottom-right: "ICETSIS / 2026"

   Behaviour:
     • Slow rotating sphere + counter-rotating orbit rings
     • Floating badges with breathing scale
     • Travelling orange ECG heartbeat waveform
     • Pulsing spoke lines
     • Hover intensifies glow + rotation + parallax
     • Reduced motion → static scene
───────────────────────────────────────────────────────────────────────────── */

type Props = { hovered: boolean };

const COLORS = {
  white: new THREE.Color("#f0f4fa"),
  blue: new THREE.Color("#83b0e1"),
  blueDeep: new THREE.Color("#6f7cff"),
  amber: new THREE.Color("#e89b7c"),
  gray: new THREE.Color("#8b9bb5"),
  grayFaint: new THREE.Color("#3a4252"),
  orange: new THREE.Color("#ff8a68"),
};

// ── Triangulated wireframe sphere with glowing vertex nodes ──────────────
function WireframeSphere({ hovered }: { hovered: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const nodesRef = React.useRef<THREE.Points>(null);
  const wireRef = React.useRef<THREE.LineSegments>(null);

  // Use an icosahedron for a clean triangulated mesh look
  const { wireGeometry, nodePositions, nodeColors } = React.useMemo(() => {
    const icoGeom = new THREE.IcosahedronGeometry(1.0, 3);
    // Wireframe from the triangulated geometry
    const wireGeom = new THREE.WireframeGeometry(icoGeom);
    // Collect unique vertex positions for the glowing nodes
    const posAttr = icoGeom.attributes.position;
    const seen = new Set<string>();
    const positions: number[] = [];
    const colors: number[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      positions.push(x, y, z);
      // Cool white-blue tone, slightly varied
      const mix = Math.random() * 0.3;
      colors.push(
        COLORS.white.r * (1 - mix) + COLORS.blue.r * mix,
        COLORS.white.g * (1 - mix) + COLORS.blue.g * mix,
        COLORS.white.b * (1 - mix) + COLORS.blue.b * mix
      );
    }
    const nodePositions = new Float32Array(positions);
    const nodeColors = new Float32Array(colors);
    const nodeGeom = new THREE.BufferGeometry();
    nodeGeom.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    nodeGeom.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));
    icoGeom.dispose();
    return { wireGeometry: wireGeom, nodePositions, nodeColors, nodeGeometry: nodeGeom };
  }, []);

  // Re-create node geometry inside the memo's return value
  const nodeGeometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));
    return g;
  }, [nodePositions, nodeColors]);

  React.useEffect(() => () => {
    wireGeometry.dispose();
    nodeGeometry.dispose();
  }, [wireGeometry, nodeGeometry]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = hovered ? 0.25 : 0.12;
      groupRef.current.rotation.y += delta * speed;
    }
    if (wireRef.current) {
      const t = state.clock.elapsedTime;
      const mat = wireRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.18 + Math.sin(t * 0.6) * 0.04;
    }
    if (nodesRef.current) {
      const t = state.clock.elapsedTime;
      const mat = nodesRef.current.material as THREE.PointsMaterial;
      mat.size = 0.028 + Math.sin(t * 1.2) * 0.004;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Faint inner sphere fill for depth */}
      <mesh>
        <sphereGeometry args={[0.98, 32, 32]} />
        <meshBasicMaterial color={COLORS.blue} transparent opacity={0.025} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Triangulated wireframe */}
      <lineSegments ref={wireRef} geometry={wireGeometry}>
        <lineBasicMaterial color={COLORS.blue} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      {/* Glowing vertex nodes */}
      <points ref={nodesRef} geometry={nodeGeometry}>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ── 2 faint elliptical orbit rings ────────────────────────────────────────
function OrbitRings({ hovered }: { hovered: boolean }) {
  const ring1Ref = React.useRef<THREE.Mesh>(null);
  const ring2Ref = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = hovered ? 1.3 : 1;
    if (ring1Ref.current) {
      // Horizontal ring — slow rotation
      ring1Ref.current.rotation.z = t * 0.1 * speed;
    }
    if (ring2Ref.current) {
      // Tilted ring — counter-rotation
      ring2Ref.current.rotation.z = -t * 0.08 * speed;
    }
  });

  return (
    <group>
      {/* Horizontal orbit ring — faint gray, elliptical via scale */}
      <group scale={[1.0, 0.28, 1.0]}>
        <mesh ref={ring1Ref}>
          <ringGeometry args={[1.45, 1.47, 96]} />
          <meshBasicMaterial color={COLORS.gray} transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      </group>
      {/* Tilted orbit ring — faint gray, tilted ~35°, elliptical via scale */}
      <group rotation={[Math.PI / 5, 0, Math.PI / 8]} scale={[1.0, 0.32, 1.0]}>
        <mesh ref={ring2Ref}>
          <ringGeometry args={[1.62, 1.64, 96]} />
          <meshBasicMaterial color={COLORS.grayFaint} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

// ── Badge icons along the orbit paths ────────────────────────────────────
// 6 badges evenly spaced: 3 on the horizontal ring, 3 on the tilted ring.
// Alternating warm amber / cool blue.
const BADGES = [
  // Horizontal ring (y=0 plane, scaled by 0.28 → elliptical)
  { angle: 0, ring: "horizontal", color: COLORS.amber, type: "cross" },
  { angle: (Math.PI * 2) / 3, ring: "horizontal", color: COLORS.blue, type: "flower" },
  { angle: (Math.PI * 4) / 3, ring: "horizontal", color: COLORS.amber, type: "target" },
  // Tilted ring
  { angle: Math.PI / 3, ring: "tilted", color: COLORS.blue, type: "ring" },
  { angle: Math.PI, ring: "tilted", color: COLORS.amber, type: "badge" },
  { angle: (Math.PI * 5) / 3, ring: "tilted", color: COLORS.blue, type: "dot" },
] as const;

// Precompute badge world positions on the elliptical orbits
function getBadgePosition(badge: (typeof BADGES)[number]): [number, number, number] {
  const r = badge.ring === "horizontal" ? 1.46 : 1.63;
  const x = Math.cos(badge.angle) * r;
  const y = Math.sin(badge.angle) * r;
  if (badge.ring === "horizontal") {
    return [x, y * 0.28, 0];
  }
  // Tilted ring: apply rotation [PI/5, 0, PI/8] and scale [1, 0.32, 1]
  const sx = x;
  const sy = y * 0.32;
  const sz = 0;
  // Rotate around X by PI/5
  const rx = Math.PI / 5;
  const y1 = sy * Math.cos(rx) - sz * Math.sin(rx);
  const z1 = sy * Math.sin(rx) + sz * Math.cos(rx);
  // Rotate around Z by PI/8
  const rz = Math.PI / 8;
  const x2 = sx * Math.cos(rz) - y1 * Math.sin(rz);
  const y2 = sx * Math.sin(rz) + y1 * Math.cos(rz);
  return [x2, y2, z1];
}

const BADGE_POSITIONS = BADGES.map((b) => ({ ...b, pos: getBadgePosition(b) }));

function Badges({ hovered }: { hovered: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      // Subtle floating bob
      const bob = Math.sin(t * 0.7 + i * 0.9) * 0.02;
      child.position.y = BADGE_POSITIONS[i]!.pos[1]! + bob;
    });
  });

  return (
    <group ref={groupRef}>
      {BADGE_POSITIONS.map((badge, i) => (
        <Badge key={i} badge={badge} delay={i * 0.15} hovered={hovered} />
      ))}
    </group>
  );
}

function Badge({
  badge,
  delay,
  hovered,
}: {
  badge: { pos: [number, number, number]; color: THREE.Color; type: string };
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
    const breath = 1 + Math.sin(t * 1.5 + delay) * 0.04;
    const target = visible ? (hovered ? 1.08 : 1) * breath : 0;
    ref.current.scale.setScalar(target);
  });

  return (
    <group ref={ref} position={badge.pos}>
      {/* Outer glow halo */}
      <mesh>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color={badge.color} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Opaque dark disc — covers orbit ring behind it */}
      <mesh>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.95} depthWrite={true} />
      </mesh>
      {/* Glowing colored ring border */}
      <mesh>
        <ringGeometry args={[0.13, 0.15, 32]} />
        <meshBasicMaterial color={badge.color} transparent opacity={0.95} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* Minimal line icon inside */}
      <BadgeIcon type={badge.type} color={badge.color} />
    </group>
  );
}

function BadgeIcon({ type, color }: { type: string; color: THREE.Color }) {
  switch (type) {
    case "cross":
      return (
        <group>
          <mesh>
            <planeGeometry args={[0.04, 0.1]} />
            <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh>
            <planeGeometry args={[0.1, 0.04]} />
            <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      );
    case "flower":
      return (
        <group>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI * 2]}>
              <planeGeometry args={[0.07, 0.015]} />
              <meshBasicMaterial color={color} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))}
        </group>
      );
    case "target":
      return (
        <group>
          <mesh>
            <ringGeometry args={[0.03, 0.04, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.06, 0.07, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      );
    case "ring":
      return (
        <mesh>
          <ringGeometry args={[0.05, 0.07, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      );
    case "badge":
      return (
        <group>
          <mesh>
            <circleGeometry args={[0.04, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.055, 0.07, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      );
    case "dot":
      return (
        <mesh>
          <circleGeometry args={[0.05, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      );
    default:
      return null;
  }
}

// ── Spoke lines connecting badges to the sphere ──────────────────────────
function SpokeLines({ hovered }: { hovered: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);

  const lines = React.useMemo(() => {
    // Connect each badge to the sphere surface (radius 1.0), stopping short
    return BADGE_POSITIONS.map((badge) => {
      const [bx, by, bz] = badge.pos;
      const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
      const ux = bx / len;
      const uy = by / len;
      const uz = bz / len;
      const startR = 1.05; // just outside the sphere
      const endR = Math.max(startR + 0.1, len - 0.22); // just before the badge
      const positions = new Float32Array(6);
      positions[0] = ux * startR;
      positions[1] = uy * startR;
      positions[2] = uz * startR;
      positions[3] = ux * endR;
      positions[4] = uy * endR;
      positions[5] = uz * endR;
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
      mat.opacity = (hovered ? 0.3 : 0.15) + Math.sin(t * 1.2 + i * 0.8) * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((geom, i) => (
        // @ts-expect-error R3F line element typing
        <line key={i} geometry={geom}>
          <lineBasicMaterial
            color={COLORS.gray}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
}

// ── Orange ECG pulse waveform near bottom center ─────────────────────────
function EcgWave({ hovered }: { hovered: boolean }) {
  const lineRef = React.useRef<THREE.Line>(null);
  const segments = 100;

  const { geometry, baseX } = React.useMemo(() => {
    const positions = new Float32Array(segments * 3);
    const baseX = new Float32Array(segments);
    for (let i = 0; i < segments; i++) {
      const x = (i / (segments - 1) - 0.5) * 2.6;
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
      const spikePos = (t * 0.5) % 2.6 - 1.3;
      const dist = Math.abs(x - spikePos);
      let y = 0;
      if (dist < 0.08) y = Math.sin((dist / 0.08) * Math.PI) * 0.18 * intensity;
      else if (dist < 0.2) y = -Math.sin(((dist - 0.08) / 0.12) * Math.PI) * 0.06 * intensity;
      y += Math.sin(x * 5 + t * 2) * 0.008;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
    // Position near bottom center
    lineRef.current.position.y = -1.85;
    lineRef.current.position.z = 0.3;
  });

  return (
    // @ts-expect-error R3F line element typing
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={COLORS.orange} transparent opacity={hovered ? 0.85 : 0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </line>
  );
}

// ── Central glow halo ─────────────────────────────────────────────────────
function CentralGlow({ hovered }: { hovered: boolean }) {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 0.9) * 0.04;
    ref.current.scale.setScalar(pulse);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = (hovered ? 0.15 : 0.1) + Math.sin(t * 0.6) * 0.02;
  });
  return (
    <mesh ref={ref}>
      <circleGeometry args={[2.0, 64]} />
      <meshBasicMaterial color={COLORS.blue} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

// ── Parallax wrapper ──────────────────────────────────────────────────────
function ParallaxGroup({ hovered, children }: { hovered: boolean; children: React.ReactNode }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = pointer.x * (hovered ? 0.15 : 0.06);
    const targetY = pointer.y * (hovered ? 0.15 : 0.06);
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
      <OrbitRings hovered={hovered} />
      <WireframeSphere hovered={hovered} />
      <SpokeLines hovered={hovered} />
      <Badges hovered={hovered} />
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
