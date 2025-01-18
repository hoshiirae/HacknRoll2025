import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import Title from './pages/Title';


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Title/>}/>
        <Route path="/Main" element={<Main/>}/>
        <Route path="/Title" element={<Title/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
