import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Book from './Book'
import { BookProvider } from './contexts/BookContext'

function Content() {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 3; // home, about, contact
    
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    }
    
    return (
        <BookProvider value={{currentPage, nextPage, prevPage, totalPages}}>
            <button 
                className={`absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded transition-colors ${
                    currentPage > 0 
                        ? 'bg-gray-300 hover:bg-gray-400 cursor-pointer' 
                        : 'bg-gray-200 cursor-not-allowed opacity-50'
                }`}
                onClick={prevPage}
                disabled={currentPage === 0}
            >
                Previous
            </button>
            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow">
                Page {currentPage + 1} of {totalPages}
            </div>
            
            <div className='w-full h-full'>
                <Canvas>
                    <directionalLight intensity={1} />
                    <ambientLight intensity={0.5} />
                    <Book currentPage={currentPage} />
                    <OrbitControls />
                </Canvas>
            </div>
            <button 
                className={`absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded transition-colors ${
                    currentPage < totalPages - 1 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer' 
                        : 'bg-gray-200 cursor-not-allowed opacity-50'
                }`}
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
            >
                Next
            </button>
        </BookProvider>
    )
}

export default Content