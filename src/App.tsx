// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Play from "./pages/Play";
import Settings from "./pages/Settings";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/play" element={ <Play /> } />
      <Route path="/settings" element={ <Settings /> } />
    </Routes>
  )
}

export default App
