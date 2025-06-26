import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Book from './Book'
import { BookProvider } from './contexts/BookContext'
import Portfolio from './portfolio/Portfolio'
import About from './about/About'
import Home from './home/Home'

function Content() {
    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        setCurrentPage(prev => prev + 1);
        console.log(currentPage);
    }

    const prevPage = () => {
        setCurrentPage(prev => prev - 1);
        console.log(currentPage);
    }
    return (
        <BookProvider value={{currentPage, nextPage, prevPage}}>
            <button onClick={() => prevPage()} className="absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-300 rounded">
                Previous
            </button>
            <div className='w-1/2 h-1/2 bg-amber-500'>
                <Canvas className='bg-lime-500'>
                    <directionalLight intensity={1} />
                    <ambientLight intensity={0.5} />
                    <Book currentPage={currentPage} />
                    <OrbitControls />
                    {currentPage === 1  && <Home />}
                    {currentPage === 2  && <Portfolio />}
                    {currentPage === 3  && <About />}
                </Canvas>
            </div>
            <button onClick={() => nextPage()} className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded">
                Next
            </button>
        </BookProvider>
    )
}

export default Content
