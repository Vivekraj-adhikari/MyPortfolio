import { useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

const pages = ['home', 'about', 'contact', 'backCover'];

function Pages({ position, currentPage, pageIndex }){
  const WIDTH = 4;
  const HEIGHT = 5;
  const DEPTH = 0.01;
  const PAGE_SEGMENTS = 30;
  const SEGMENT_WIDTH = WIDTH / PAGE_SEGMENTS;
  const pageRef = useRef();
  const skinnedMeshRef = useRef();
  const { scene } = useThree();
  const page = useMemo(() => {
    return new THREE.BoxGeometry(
      WIDTH,
      HEIGHT,
      DEPTH,
      PAGE_SEGMENTS
    );
  });

  page.translate(WIDTH / 2, 0, 0);

  const positions = page.attributes.position;
  const vertex = new THREE.Vector3();
  const skinIndices = [];
  const skinWeights = [];

  for(let i = 0; i < positions.count; i++){
    vertex.fromBufferAttribute(positions, i);
    const x = vertex.x;
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

    skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  page.setAttribute(
    "skinIndex",
    new THREE.Uint16BufferAttribute(skinIndices, 4)
  )
  page.setAttribute(
    "skinWeight",
    new THREE.Float32BufferAttribute(skinWeights, 4)
  )

  const manualSkinnedMesh = useMemo(() => {
    const bones = [];
    for(let i = 0; i <= PAGE_SEGMENTS; i++){
      let bone = new THREE.Bone();
      bones.push(bone);
      if(i === 0){
        bone.position.x = 0;
      }
      else{
        bone.position.x = SEGMENT_WIDTH;
      }

      if(i > 0){
        bones[i - 1].add(bone);
      }
    }
    const skeleton = new THREE.Skeleton(bones);
    const material = new THREE.MeshBasicMaterial({color: 'red'})
    const mesh = new THREE.SkinnedMesh(page, material);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  },[])

  React.useEffect(() => {
    if (!manualSkinnedMesh) return;
    const helper = new THREE.SkeletonHelper(manualSkinnedMesh);
    helper.material.color.set("blue");
    requestAnimationFrame(() => {
      scene.add(helper);
    });
    return () => scene.remove(helper);
  }, [manualSkinnedMesh, scene]);

  const targetRotation = () => {
    if (pageIndex < currentPage) {
      return -Math.PI * 0.95;
    } else if (pageIndex === currentPage) {
      return pageIndex === 0 ? 0 : -Math.PI;
    } else {
      return 0;
    }
  }

  useFrame(() => {
    if(pageRef.current){
      const target = targetRotation();
      pageRef.current.rotation.y = THREE.MathUtils.lerp(pageRef.current.rotation.y, target, 0.08);
    }
  })

  return(
    <group ref={pageRef} position={position} rotation={[90, 0, 0]}>
      {manualSkinnedMesh && (<primitive object={manualSkinnedMesh} />)}
    </group>
  );
}


function Book({ currentPage }) {
  return (
    <>
      <group position={[0, 0, 0]}>
        {pages.map((page, index) => (
          <Pages key={index} pageIndex={index} currentPage={currentPage} position={[0, index * -0.02, 0]} />
        ))}
      </group>
    </>
  )
}

export default Book