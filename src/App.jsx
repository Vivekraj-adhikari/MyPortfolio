import { useState } from 'react'
import './App.css'
import Book from './components/Book'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function App() {
  return (
    <>
      <Canvas>
        <directionalLight intensity={1}/>
        <ambientLight intensity={0.5} />
        <Book />
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
