
import React, { useState } from 'react'
import './App.css'

function Message(props) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(props.url)
      .then(response => response.json())
      .then(data => setMessage(data.message))
  }, [props.url])

  return (
    <>
      <p>{message}</p>
    </>
  )
}

export default Message
