import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader for liquid distortion
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Smooth noise
  float smoothNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;

    // Create wave distortion
    float wave = sin(uv.y * 8.0 + uTime * 0.15) * 0.01;
    wave += sin(uv.x * 6.0 + uTime * 0.1) * 0.008;

    // Mouse influence
    float dist = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.3, 0.0, dist) * 0.2;
    wave += sin(dist * 8.0 - uTime * 0.2) * mouseInfluence * 0.05;

    // Apply distortion
    uv.x += wave;
    uv.y += wave * 0.5;

    // Add some noise for texture
    float n = smoothNoise(uv * 3.0 + uTime * 0.05) * 0.02;
    uv += n;

    // Create liquid color with very low opacity
    vec3 color = mix(
      vec3(0.055, 0.055, 0.063), // #0E0E10
      vec3(0.31, 0.61, 1.0),     // #4F9DFF
      wave * 2.0 + 0.5
    );

    float alpha = 0.06 + wave * 0.03; // Very subtle opacity

    gl_FragColor = vec4(color, alpha);
  }
`;

const LiquidBackground = () => {
  const meshRef = useRef();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }), []);

  // Mouse tracking with lerp
  useEffect(() => {
    const handleMouseMove = (event) => {
      targetMouseRef.current.x = event.clientX / window.innerWidth;
      targetMouseRef.current.y = 1.0 - (event.clientY / window.innerHeight);
    };

    // Only add mouse listener on desktop
    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Update time
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse lerp
      const lerpFactor = 0.02;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerpFactor;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerpFactor;

      // Update mouse uniform
      meshRef.current.material.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const ParticlesBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <LiquidBackground />
      </Canvas>
    </motion.div>
  );
};

export default ParticlesBackground;
