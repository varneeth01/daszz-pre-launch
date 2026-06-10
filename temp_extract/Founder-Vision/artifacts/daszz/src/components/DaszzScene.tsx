import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 64]} />
          <meshStandardMaterial 
            color="#6b46c1" 
            roughness={0.2} 
            metalness={0.8}
            wireframe={true}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
      </Float>
      
      <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#a5b4fc" />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#e0e7ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#c084fc" />
    </group>
  );
}

export default function DaszzScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
