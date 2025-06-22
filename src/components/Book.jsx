import React from 'react';
import * as THREE from 'three';

const pages = ['home', 'about', 'constact'];

function Pages({position}){
  const WIDTH = 3.5;
  const HEIGHT = 5;
  const DEPTH = 0.01;
  const WIDTH_SEGMENTS = 30;
  const page = new THREE.BoxGeometry(
    WIDTH,
    HEIGHT,
    DEPTH,
    WIDTH_SEGMENTS
  );

  return(
    <mesh>
      <primitive object={page} position={position} />
      <meshBasicMaterial color={'red'} />
    </mesh>
  );
}


function Book() {
  return (
    <>
      {pages.map((page, index) => (
        <Pages key={index} content={page} position={[index * 2, 0, 0]} />
      ))}
    </>
  )
}

export default Book
