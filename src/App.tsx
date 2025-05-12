// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
    </Routes>
  )
}

export default App
