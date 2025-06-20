import React from 'react'

function Icons({ position, map, ref }) {
    return (
        <>
            <mesh ref={ref} position={position}>
                <planeGeometry args={[2, 2, 2]} />
                <meshBasicMaterial
                    map={map}
                    transparent={false}
                    alphaTest={0.5}
                />
            </mesh>
        </>
    )
}

export default Icons
