import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Book from './Book'
import { BookProvider } from './contexts/BookContext'

function Content() {
    const [opened, setOpened] = useState();
    const [page, setPage] = useState("home");
    const nextPage = () => {
        
    }

    const prevPage = () => {

    }
    return (
        <BookProvider value={{opened, page, nextPage, prevPage}}>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-300 rounded">
                Previous
            </button>
            <div className='w-full h-full'>
                <Canvas>
                    <directionalLight intensity={1} />
                    <ambientLight intensity={0.5} />
                    <Book />
                    <OrbitControls />
                </Canvas>
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded">
                Next
            </button>
        </BookProvider>
    )
}

export default Content
