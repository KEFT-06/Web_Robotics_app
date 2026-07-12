import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Sky, Water, Clouds, Cloud, MeshDistortMaterial, Sparkles, Grid, Stars, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  type: 'aquatic' | 'terrestrial' | 'aerial';
}

function AquaticScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <>
      <Environment preset="night" />
      <Sky sunPosition={[0, -0.1, -1]} turbidity={0.1} rayleigh={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Water plane mock */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100, 128, 128]} />
        <MeshDistortMaterial color="#001e36" distort={0.2} speed={2} roughness={0} metalness={0.8} />
      </mesh>

      <Sparkles count={200} scale={20} size={2} color="#06B6D4" speed={0.4} />
      
      <Grid infiniteGrid fadeDistance={40} cellColor="#06B6D4" sectionColor="#10B981" position={[0, -0.49, 0]} />

      {/* Futuristic Drone Mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.3, 1, 4, 16]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        
        {/* Glowing thruster */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>
      </mesh>
    </>
  );
}

function TerrestrialScene() {
  const roverRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (roverRef.current) {
      // Basic forward movement simulation or idle vibration
      roverRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.2) * 2;
      const targetRotationY = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
      roverRef.current.rotation.y += (targetRotationY - roverRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <Sky sunPosition={[10, 5, -10]} turbidity={0.8} rayleigh={1} />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[200, 200, 64, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} wireframe={true} />
      </mesh>

      <Grid infiniteGrid fadeDistance={50} cellColor="#10B981" sectionColor="#06B6D4" position={[0, -0.49, 0]} />

      {/* Rover Mock */}
      <group ref={roverRef} position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 1.5]} />
          <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Wheels */}
        {[-0.6, 0.6].map((x, i) => 
          [-0.6, 0.6].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, -0.25, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
              <meshStandardMaterial color="#111" roughness={0.8} />
            </mesh>
          ))
        )}
      </group>
    </>
  );
}

function AerialScene() {
  const droneRef = useRef<THREE.Group>(null);
  const propsRef = useRef<THREE.Group[]>([null, null, null, null] as any);

  useFrame((state) => {
    if (droneRef.current) {
      droneRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 1;
      droneRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      droneRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 1.5) * 0.1;
    }
    propsRef.current.forEach(prop => {
      if (prop) {
        prop.rotation.y += 0.5;
      }
    });
  });

  return (
    <>
      <Environment preset="city" />
      <Sky sunPosition={[0, 1, -1]} turbidity={0.1} />
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud segments={40} bounds={[10, 2, 10]} volume={10} color="#333" opacity={0.3} />
      </Clouds>
      
      <Grid infiniteGrid fadeDistance={100} cellColor="#10B981" sectionColor="#10B981" position={[0, -10, 0]} />

      {/* Quadcopter Mock */}
      <group ref={droneRef} position={[0, 1, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Arms & Props */}
        {[-0.5, 0.5].map((x, i) => 
          [-0.5, 0.5].map((z, j) => (
            <group key={`${i}-${j}`} position={[x, 0, z]}>
              <mesh position={[-x/2, 0, -z/2]} rotation={[0, Math.atan2(x, z), Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
                <meshStandardMaterial color="#555" />
              </mesh>
              {/* Propeller */}
              <group ref={(el) => (propsRef.current[i * 2 + j] = el as any)} position={[0, 0.1, 0]}>
                <mesh>
                  <boxGeometry args={[0.6, 0.02, 0.05]} />
                  <meshStandardMaterial color="#10B981" />
                </mesh>
              </group>
            </group>
          ))
        )}
      </group>
    </>
  );
}

export function Simulation3D({ type }: SceneProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-[#05050A] rounded-[2rem] overflow-hidden relative glass-panel border border-glass-border">
      <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        {type === 'aquatic' && <AquaticScene />}
        {type === 'terrestrial' && <TerrestrialScene />}
        {type === 'aerial' && <AerialScene />}

        <OrbitControls 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2 + 0.1} 
          minDistance={2} 
          maxDistance={15} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-[#10B981] flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
        LIVE 3D SIMULATION
      </div>
    </div>
  );
}
