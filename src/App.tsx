// import { useState } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Play from "./pages/Play";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import Feedback from "./pages/Feedback";
import Ranking from "./pages/Ranking";

function App() {
  const location = useLocation();

  return (
    <>
    {
      location.pathname !== '/' && location.pathname !== '/feedback' && <Header />
    }
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/play" element={ <Play /> } />
        <Route path="/settings" element={ <Settings /> } />
        <Route path="/feedback" element={ <Feedback /> } />
        <Route path="/ranking" element={ <Ranking /> } />
      </Routes>
    </>
  )
}

export default App
