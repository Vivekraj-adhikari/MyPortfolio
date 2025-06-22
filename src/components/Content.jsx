import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Book from './Book'
import { BookProvider } from './contexts/BookContext'

function Content() {
    const [opened, setOpened] = useState(false);
    const [page, setPage] = useState("home");
    
    const nextPage = () => {
        setOpened(true);
    }

    const prevPage = () => {
        setOpened(false);
    }
    
    return (
        <BookProvider value={{opened, page, nextPage, prevPage}}>
            <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                onClick={prevPage}
            >
                Previous
            </button>
            <div className='w-full h-full'>
                <Canvas>
                    <directionalLight intensity={1} />
                    <ambientLight intensity={0.5} />
                    <Book opened={opened} />
                    <OrbitControls />
                </Canvas>
            </div>
            <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={nextPage}
            >
                Next
            </button>
        </BookProvider>
    )
}

export default Content