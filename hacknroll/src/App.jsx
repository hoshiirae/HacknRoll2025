import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './pages/Main';


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/Main" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
