import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const pages = ['Home', 'About', 'Contact'];

function Page({ position, pageIndex, currentPage, content }) {
  const WIDTH = 4;
  const HEIGHT = 5;
  const DEPTH = 0.01;
  const WIDTH_SEGMENTS = 30;
  
  const meshRef = useRef();
  
  const pageGeometry = useMemo(() => {
    return new THREE.BoxGeometry(
      WIDTH,
      HEIGHT,
      DEPTH,
      WIDTH_SEGMENTS
    );
  }, []);

  // Calculate target rotation based on current page
  const getTargetRotation = () => {
    if (pageIndex < currentPage) {
      // Pages that have been flipped (to the left)
      return -Math.PI * 0.95;
    } else if (pageIndex === currentPage) {
      // Current page (slightly open if not the first page)
      return pageIndex === 0 ? 0 : -Math.PI * 0.1;
    } else {
      // Pages that haven't been flipped yet (closed/right side)
      return 0;
    }
  };

  useFrame(() => {
    if (meshRef.current) {
      const targetRotation = getTargetRotation();
      // Smooth rotation animation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation,
        0.08
      );
    }
  });

  // Different colors for each page
  const getPageColor = () => {
    switch (pageIndex) {
      case 0: return '#f8f9fa'; // Light gray for home
      case 1: return '#e9ecef'; // Medium gray for about
      case 2: return '#dee2e6'; // Darker gray for contact
      default: return '#ffffff';
    }
  };

  return (
    <mesh 
      ref={meshRef}
      geometry={pageGeometry} 
      position={position} 
      rotation={[0, 0, 0]}
    >
      <meshLambertMaterial 
        color={getPageColor()} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Book({ currentPage }) {
  return (
    <group>
      {/* Book cover/base */}
      <mesh position={[0, 0, -0.05]} rotation={[0, 0, 0]}>
        <boxGeometry args={[4.1, 5.1, 0.1]} />
        <meshLambertMaterial color="#8b4513" />
      </mesh>
      
      {/* Pages */}
      {pages.map((pageContent, index) => (
        <Page 
          key={index} 
          content={pageContent} 
          position={[0, 0, index * 0.02]} 
          currentPage={currentPage}
          pageIndex={index}
        />
      ))}
    </group>
  );
}

export default Book