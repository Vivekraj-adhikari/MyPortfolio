import React, { useMemo } from 'react';
import * as THREE from 'three';

const pages = ['home', 'about', 'contact'];

function Pages({position}){
  const WIDTH = 4;
  const HEIGHT = 5;
  const DEPTH = 0.01;
  const WIDTH_SEGMENTS = 30;
  const page = useMemo(() => {
    return new THREE.BoxGeometry(
      WIDTH,
      HEIGHT,
      DEPTH,
      WIDTH_SEGMENTS
    );
  });

  return(
    <mesh geometry={page} position={position} rotation={[90, 0, 0]}>
      <meshBasicMaterial color={'red'} />
    </mesh>
  );
}


function Book({ opened }) {
  return (
    <>
      <group>
        {pages.map((page, index) => (
          <Pages key={index} content={page} position={[0, -0.5, index * 0.01]} />
        ))}
      </group>
    </>
  )
}

export default Book
