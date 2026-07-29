
import React, { useState } from 'react'
import './App.css'

function Message(props) {
  const [message, setMessage] = useState('')

  return (
    <>
      <p>{props.text}</p>
    </>
  )
}

export default Message
