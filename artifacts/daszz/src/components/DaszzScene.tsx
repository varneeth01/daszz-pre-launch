import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAMPAIGN_START, LAUNCH_TIME } from "@/lib/launch-config";

function countdownProgress() {
  const now = Date.now();
  const total = LAUNCH_TIME.getTime() - CAMPAIGN_START.getTime();
  const elapsed = now - CAMPAIGN_START.getTime();
  return Math.min(1, Math.max(0, elapsed / total));
}

function oval(
  cx: number, cy: number, rx: number, ry: number,
  n: number,
  startAngle = 0, endAngle = Math.PI * 2,
  taper = 0
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= n; i++) {
    const t = startAngle + (endAngle - startAngle) * (i / n);
    const x = cx + Math.cos(t) * rx;
    const taperY = ry * (1 - taper * Math.max(0, -Math.sin(t)));
    const y = cy + Math.sin(t) * taperY;
    pts.push(new THREE.Vector3(x, y, 0));
  }
  return pts;
}

function makeLine(
  points: THREE.Vector3[],
  color: THREE.ColorRepresentation,
  opacity: number
): THREE.Line {
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  return new THREE.Line(geo, mat);
}

function FaceTopology() {
  const groupRef = useRef<THREE.Group>(null!);
  const scanRef = useRef<THREE.Line>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      targetMouse.current = {
        x: ((t.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((t.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [gl]);

  const { lines, extraLines } = useMemo(() => {
    const primary: THREE.Line[] = [];
    const extra: THREE.Line[] = [];
    const indigo = new THREE.Color(0x818cf8);
    const violet = new THREE.Color(0xa5b4fc);
    const dim = new THREE.Color(0x6366f1);

    const add = (pts: THREE.Vector3[], c: THREE.ColorRepresentation, o: number, arr = primary) =>
      arr.push(makeLine(pts, c, o));

    // ─── Outer head silhouette ───
    add(oval(0, 0.08, 1.0, 1.38, 64, 0, Math.PI * 2, 0.12), indigo, 0.45);
    // ─── Inner face oval ───
    add(oval(0, 0.1, 0.72, 1.08, 48, 0, Math.PI * 2, 0.2), violet, 0.3);

    // ─── Jawline ───
    const jaw: THREE.Vector3[] = [
      new THREE.Vector3(-0.72, -0.52, 0),
      new THREE.Vector3(-0.58, -0.78, 0),
      new THREE.Vector3(-0.38, -1.0, 0),
      new THREE.Vector3(-0.14, -1.14, 0),
      new THREE.Vector3(0, -1.18, 0),
      new THREE.Vector3(0.14, -1.14, 0),
      new THREE.Vector3(0.38, -1.0, 0),
      new THREE.Vector3(0.58, -0.78, 0),
      new THREE.Vector3(0.72, -0.52, 0),
    ];
    add(jaw, violet, 0.45);

    // ─── Brows ───
    add([
      new THREE.Vector3(-0.64, 0.65, 0.02),
      new THREE.Vector3(-0.44, 0.73, 0.05),
      new THREE.Vector3(-0.22, 0.70, 0.04),
      new THREE.Vector3(-0.06, 0.64, 0.03),
    ], violet, 0.55);
    add([
      new THREE.Vector3(0.64, 0.65, 0.02),
      new THREE.Vector3(0.44, 0.73, 0.05),
      new THREE.Vector3(0.22, 0.70, 0.04),
      new THREE.Vector3(0.06, 0.64, 0.03),
    ], violet, 0.55);

    // ─── Eye sockets ───
    add(oval(-0.37, 0.45, 0.29, 0.12, 28), violet, 0.5);
    add(oval(0.37, 0.45, 0.29, 0.12, 28), violet, 0.5);

    // ─── Nose bridge ───
    add([
      new THREE.Vector3(0, 0.55, 0.06),
      new THREE.Vector3(-0.04, 0.38, 0.09),
      new THREE.Vector3(-0.06, 0.18, 0.11),
      new THREE.Vector3(-0.05, 0.02, 0.12),
      new THREE.Vector3(0, -0.08, 0.13),
      new THREE.Vector3(0.05, 0.02, 0.12),
      new THREE.Vector3(0.06, 0.18, 0.11),
      new THREE.Vector3(0.04, 0.38, 0.09),
      new THREE.Vector3(0, 0.55, 0.06),
    ], dim, 0.38);

    // ─── Nose wings ───
    add([
      new THREE.Vector3(-0.06, -0.04, 0.12),
      new THREE.Vector3(-0.18, -0.1, 0.09),
      new THREE.Vector3(-0.24, -0.2, 0.06),
      new THREE.Vector3(-0.16, -0.26, 0.04),
    ], violet, 0.38);
    add([
      new THREE.Vector3(0.06, -0.04, 0.12),
      new THREE.Vector3(0.18, -0.1, 0.09),
      new THREE.Vector3(0.24, -0.2, 0.06),
      new THREE.Vector3(0.16, -0.26, 0.04),
    ], violet, 0.38);

    // ─── Lips ───
    const upperLip: THREE.Vector3[] = [];
    for (let i = 0; i <= 22; i++) {
      const t = (i / 22);
      const x = (t - 0.5) * 0.72;
      const cupid = Math.abs(t - 0.5) < 0.08 ? -0.05 : 0;
      const y = -0.46 + 0.06 * Math.sin(t * Math.PI) + cupid;
      upperLip.push(new THREE.Vector3(x, y, 0.06));
    }
    add(upperLip, violet, 0.42);
    add([
      new THREE.Vector3(-0.36, -0.46, 0.06),
      new THREE.Vector3(-0.2, -0.57, 0.11),
      new THREE.Vector3(0, -0.62, 0.12),
      new THREE.Vector3(0.2, -0.57, 0.11),
      new THREE.Vector3(0.36, -0.46, 0.06),
    ], violet, 0.42);

    // ─── Horizontal topology lines ───
    const hLevels = [0.88, 0.56, 0.14, -0.22, -0.56];
    hLevels.forEach(yL => {
      const ry = 1.38 * (1 - 0.12 * Math.max(0, -(yL - 0.08)));
      const xW = Math.sqrt(Math.max(0, 1 - ((yL - 0.08) / ry) ** 2)) * 1.0;
      const hPts: THREE.Vector3[] = [];
      const N = isMobile ? 12 : 20;
      for (let i = 0; i <= N; i++) {
        const tx = -1 + (i / N) * 2;
        hPts.push(new THREE.Vector3(tx * xW, yL, -0.02 * (1 - tx * tx)));
      }
      add(hPts, dim, 0.2);
    });

    // ─── Cheekbone guides ───
    const cheekPts = [
      [[-0.94, 0.18, 0], [-0.84, 0.06, 0.02], [-0.7, -0.06, 0.03], [-0.55, -0.12, 0.04]],
      [[0.94, 0.18, 0], [0.84, 0.06, 0.02], [0.7, -0.06, 0.03], [0.55, -0.12, 0.04]],
    ] as [number, number, number][][];
    cheekPts.forEach(pts => add(pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)), dim, 0.28));

    // ─── Temple guides ───
    [[-1], [1]].forEach(([side]) => {
      add([
        new THREE.Vector3(side * 0.97, 0.72, 0),
        new THREE.Vector3(side * 0.9, 0.46, 0.01),
        new THREE.Vector3(side * 0.86, 0.22, 0.01),
      ], dim, 0.24);
    });

    // ─── Extra reveal lines (connected to progress) ───
    // Forehead topology
    const foreheadLevels = [1.05, 1.22];
    foreheadLevels.forEach(yL => {
      const xW = Math.sqrt(Math.max(0, 1 - ((yL - 0.08) / 1.38) ** 2)) * 1.0;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 16; i++) {
        const tx = -1 + (i / 16) * 2;
        pts.push(new THREE.Vector3(tx * xW, yL, 0));
      }
      extra.push(makeLine(pts, dim, 0.15));
    });

    // Inner eye details
    oval(-0.37, 0.45, 0.14, 0.06, 16).forEach((_v, _i, _arr) => {});
    extra.push(makeLine(oval(-0.37, 0.45, 0.14, 0.06, 16), dim, 0.3));
    extra.push(makeLine(oval(0.37, 0.45, 0.14, 0.06, 16), dim, 0.3));

    // Chin detail
    extra.push(makeLine(oval(0, -1.0, 0.22, 0.1, 18, 0, Math.PI), dim, 0.28));

    return { lines: primary, extraLines: extra };
  }, [isMobile]);

  // Glow disk
  const glowGeo = useMemo(() => new THREE.CircleGeometry(1.6, 48), []);
  const glowMat = useMemo(() =>
    new THREE.MeshBasicMaterial({ color: 0x3b4fd4, transparent: true, opacity: 0.06, side: THREE.DoubleSide }), []);

  // Scan line
  const scanGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1.15, 0, 0.08),
    new THREE.Vector3(1.15, 0, 0.08),
  ]), []);
  const scanMat = useMemo(() =>
    new THREE.LineBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0.65 }), []);

  // Spotlight sprite behind face
  const spotGeo = useMemo(() => new THREE.CircleGeometry(2.2, 32), []);
  const spotMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x4060ee,
    transparent: true,
    opacity: 0.04,
    side: THREE.DoubleSide,
  }), []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !scanRef.current) return;
    const t = clock.getElapsedTime();
    const progress = countdownProgress();

    // Smooth mouse lerp
    mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.04;
    mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.04;

    // Parallax rotation
    groupRef.current.rotation.y = mouse.current.x * 0.08;
    groupRef.current.rotation.x = mouse.current.y * 0.04;

    // Slow drift
    groupRef.current.rotation.y += Math.sin(t * 0.08) * 0.006;

    // Breathing
    const breathe = 1 + Math.sin(t * 0.55) * 0.008;
    groupRef.current.scale.setScalar(breathe);

    // Scan line animation: top to bottom loop
    const scanY = 1.38 - ((t * 0.35) % 2.76);
    scanRef.current.position.y = scanY;

    // Opacity from progress
    const baseOpacity = 0.5 + progress * 0.5;
    lines.forEach(l => {
      const mat = l.material as THREE.LineBasicMaterial;
      mat.opacity = (mat.opacity < 0.3 ? mat.opacity : mat.opacity * baseOpacity);
    });

    // Extra lines opacity
    const extraOpacity = Math.max(0, (progress - 0.1) / 0.9);
    extraLines.forEach(l => {
      const mat = l.material as THREE.LineBasicMaterial;
      mat.opacity = extraOpacity * 0.3;
    });

    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.04 + progress * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Backdrop glow */}
      <mesh ref={glowRef} geometry={glowGeo} material={glowMat} position={[0, 0.08, -0.5]} />
      <mesh geometry={spotGeo} material={spotMat} position={[0, 0.08, -0.8]} />

      {/* Face topology lines */}
      {lines.map((line, i) => <primitive key={i} object={line} />)}
      {extraLines.map((line, i) => <primitive key={`e${i}`} object={line} />)}

      {/* Scan line */}
      <primitive ref={scanRef} object={new THREE.Line(scanGeo, scanMat)} />

      {/* Rim lights */}
      <pointLight position={[-2.5, 0.5, 1.5]} intensity={1.2} color="#5b7bff" distance={6} />
      <pointLight position={[2.5, 0.5, 1.5]} intensity={0.8} color="#7c5bff" distance={6} />
      <pointLight position={[0, 2.5, 2]} intensity={0.4} color="#ffffff" distance={5} />
      <ambientLight intensity={0.1} />
    </group>
  );
}

export default function DaszzScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        frameloop="always"
      >
        <FaceTopology />
      </Canvas>
    </div>
  );
}
