import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const pages = ['home', 'about', 'contact'];

function Pages({ position, rotation, opened, pageIndex }) {
  const WIDTH = 4;
  const HEIGHT = 5;
  const DEPTH = 0.01;
  const WIDTH_SEGMENTS = 30;
  
  const meshRef = useRef();
  
  const page = useMemo(() => {
    return new THREE.BoxGeometry(
      WIDTH,
      HEIGHT,
      DEPTH,
      WIDTH_SEGMENTS
    );
  }, []);

  // Calculate target rotation based on opened state and page index
  const targetRotationY = opened ? 
    (pageIndex === 0 ? -Math.PI * 0.8 : // Left page opens to the left
     pageIndex === pages.length - 1 ? Math.PI * 0.8 : // Right page opens to the right
     0) : 0; // Closed state

  useFrame(() => {
    if (meshRef.current) {
      // Smooth rotation animation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.05
      );
    }
  });

  return (
    <mesh 
      ref={meshRef}
      geometry={page} 
      position={position} 
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial 
        color={pageIndex === 0 ? '#f0f0f0' : pageIndex === 1 ? '#e0e0e0' : '#d0d0d0'} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Book({ opened }) {
  return (
    <group>
      {pages.map((page, index) => (
        <Pages 
          key={index} 
          content={page} 
          position={[0, 0, index * 0.02]} 
          opened={opened}
          pageIndex={index}
        />
      ))}
    </group>
  );
}

export default Book