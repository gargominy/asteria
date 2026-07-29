import React, { useState, useEffect } from 'react'
import Message from './Message/Message'
import './App.css'

function App() {

  return (
    <>
      <Message url="http://localhost:5000/api/hello" />
    </>
  )
}

export default App
