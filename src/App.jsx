import { useState } from 'react'
import './App.css'
import Book from './components/Book'
import Content from './components/Content'

function App() {
  return (
    <>
      <div className='w-full h-full flex items-center justify-center relative'>
        <Content />
      </div>
    </>
  )
}

export default App
