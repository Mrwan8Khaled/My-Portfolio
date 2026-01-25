import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FluidMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(0, 0) },
        uIsMobile: { value: 0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uIsMobile;
    varying vec2 vUv;

    // Classic Perlin Noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      
      vec2 mousePos = uIsMobile > 0.5 ? vec2(0.5) : uMouse;
      
      // Mouse distortion
      float dist = distance(st, mousePos);
      float strength = uIsMobile > 0.5 ? 0.0 : 0.08;
      float radius = 0.6;
      float distortion = smoothstep(radius, 0.0, dist) * strength;
      
      vec2 uv = st + distortion * (st - mousePos);

      // Liquid motion (super subtle and calm)
      float n = snoise(uv * 2.0 + uTime * 0.04);
      n += 0.4 * snoise(uv * 4.0 - uTime * 0.06);
      n += 0.2 * snoise(uv * 8.0 + uTime * 0.08);

      // Deep dark base
      vec3 color1 = vec3(0.04, 0.04, 0.04); // Slightly lighter than #0E0E10 for depth
      vec3 color2 = vec3(0.31, 0.61, 1.0); // #4F9DFF
      
      float mask = smoothstep(-0.5, 1.0, n);
      vec3 finalColor = mix(vec3(0.055, 0.055, 0.063), color2 * 0.08, mask);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const BackgroundPlane = ({ isMobile }) => {
    const mesh = useRef();
    const { size, mouse } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 },
    }), [isMobile, size]);

    useFrame((state) => {
        const { clock } = state;
        mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();

        if (!isMobile) {
            const targetX = (mouse.x + 1) / 2;
            const targetY = (mouse.y + 1) / 2;
            mesh.current.material.uniforms.uMouse.value.x += (targetX - mesh.current.material.uniforms.uMouse.value.x) * 0.02;
            mesh.current.material.uniforms.uMouse.value.y += (targetY - mesh.current.material.uniforms.uMouse.value.y) * 0.02;
        }
    });

    return (
        <mesh ref={mesh} scale={[size.width, size.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                fragmentShader={FluidMaterial.fragmentShader}
                vertexShader={FluidMaterial.vertexShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

const FluidBackground = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#0E0E10]">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 45 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: false, alpha: false }}
            >
                <BackgroundPlane isMobile={isMobile} />
            </Canvas>
        </div>
    );
};

export default FluidBackground;
