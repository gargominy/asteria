import React, { useState, useEffect } from 'react'
import Message from './Message/Message'
import './App.css'

function App() {

  return (
    <>
      <h1>Hello, React!</h1>
      <Message url="http://localhost:5000/api/hello" />
    </>
  )
}

export default App
