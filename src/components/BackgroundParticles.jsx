import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Particles = ({ count }) => {
  const ref = useRef();

  const [particlesPosition] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4F9DFF"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.15}
      />
    </Points>
  );
};

const BackgroundParticles = () => {
  const [particleCount, setParticleCount] = useState(50);

  useEffect(() => {
    const updateCount = () => {
      setParticleCount(window.innerWidth < 768 ? 20 : 50);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
};

export default BackgroundParticles;