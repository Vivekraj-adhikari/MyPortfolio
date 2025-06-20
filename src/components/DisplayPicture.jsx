import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import React, { useRef, useMemo } from 'react'
import { TextureLoader } from 'three';

import Icons from './Icons';

function Skills() {
    const icons = ['CSS3', 'Git', 'GitHub', 'HTML5', 'JavaScript', 'React', 'Tailwind CSS', 'Three.js'];
    const textures = [];

    const { camera } = useThree();

    const groupRef = useRef();
    const cssRef = useRef();
    const gitRef = useRef();
    const githubRef = useRef();
    const htmlRef = useRef();
    const jsRef = useRef();
    const reactRef = useRef();
    const tailwindRef = useRef();
    const threejsRef = useRef();

    const meshes = [cssRef, gitRef, githubRef, htmlRef, jsRef, reactRef, tailwindRef, threejsRef]

    icons.forEach((icon) => {
        const texture = useLoader(TextureLoader, `/icons/${icon}.png`);
        textures.push(texture);
    });

    useFrame(() => {
        if(meshes.length > 0){
            meshes.forEach((mesh) => {
                mesh.current.lookAt(camera.position);

                const euler = mesh.current.rotation;
                mesh.current.rotation.set(euler.x, euler.y, euler.z);
            })
        }
        groupRef.current.rotation.y += Math.PI / 360;
    })


    return (
        <group ref={groupRef}>
            <Icons map={textures[0]} position={[0, 0, 2]} ref={cssRef} />
            <Icons map={textures[1]} position={[0, 0, -2]} ref={gitRef} />
            <Icons map={textures[2]} position={[-2, 0, 0]} ref={githubRef} />
            <Icons map={textures[3]} position={[2, 0, 0]} ref={htmlRef} />
            <Icons map={textures[4]} position={[1, 0, 1]} ref={jsRef} />
            <Icons map={textures[5]} position={[1, 0, -1]} ref={reactRef} />
            <Icons map={textures[6]} position={[-1, 0, 1]} ref={tailwindRef} />
            <Icons map={textures[7]} position={[-1, 0, -1]} ref={threejsRef} />
        </group>
    )
}

function AnimateIcons() {
    return(
        <div className='bg-slate-950 max-w-3xl w-96 h-96'>
            <Canvas>
                <Skills />
                <ambientLight intensity={0.5} />
                <directionalLight intensity={2}/>
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default AnimateIcons
