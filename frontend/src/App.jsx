import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Homepage from './components/Homepage/Homepage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  )
}

export default App
