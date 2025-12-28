import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Login from './component/Login'
import SignUp from './component/SignUp'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Routes>
        <Route path="/" element={
          <Navbar />} >
        </Route>
        <Route path="/login" element={
          <><Login/></>}>

        </Route>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      </>
  )
}

export default App
