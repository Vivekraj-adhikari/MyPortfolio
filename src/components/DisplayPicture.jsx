import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import React, { useRef, useMemo } from 'react'
import { TextureLoader } from 'three';

function DisplayPicture() {
    const reactTexture = useLoader(TextureLoader, '/icons/React.png');
    const jsTexture = useLoader(TextureLoader, '/icons/JavaScript.png');
    const reactRef = useRef();
    const jsRef = useRef();
    const { camera } = useThree();

    const meshes = [reactRef, jsRef];

    useFrame(() => {
        if(meshes.length > 0){
            meshes.forEach((mesh) => {
                mesh.current.lookAt(camera.position);

                const euler = mesh.current.rotation;
                mesh.current.rotation.set(euler.x, euler.y, euler.z);
            })
        }
    })


    return (
        <group>
            <mesh ref={reactRef} position={[0, 0, -2]}>
                <planeGeometry args={[2, 2, 2]} />
                <meshBasicMaterial
                    map={reactTexture}
                    transparent={false}
                    alphaTest={0.5}
                />
            </mesh>
            <mesh ref={jsRef} position={[0, 0, 2]}>
                <planeGeometry args={[2, 2, 2]} />
                <meshBasicMaterial
                    map={jsTexture}
                    transparent={false}
                    alphaTest={0.5}
                />
            </mesh>
        </group>
    )
}

function AnimateCube() {
    return(
        <div className='bg-gray-400 max-w-3xl w-96 h-96'>
            <Canvas>
                <DisplayPicture />
                <ambientLight intensity={0.5} />
                <directionalLight intensity={2}/>
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default AnimateCube
