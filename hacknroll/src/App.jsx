import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import Title from './pages/Title';
import GuessTheBreedHome from "./pages/guess-the-breed-game/Home";
import CatCareHome from "./pages/cat-care-game/Home"
import { CatProvider } from "./pages/guess-the-breed-game/CatContext";
import TrueOrFalseHome from "./pages/true-or-false-game/Home";
import CompatabilityQuiz from "./pages/compatability-quiz/Home";
import Test from "./pages/compatability-quiz/components/CatBreeds";
import AdoptionPageHome from "./pages/adoption-page/Home";
import CompatabilityAi from "./pages/compatability-quiz/CompatabilityAi";

function App() {
  return (
    <BrowserRouter>
      <CatProvider>
        <Routes>
            <Route path="/" element={<Title/>}/>
            <Route path="/Main" element={<Main/>}/>
            <Route path="/Title" element={<Title/>}/>
            <Route path="/guess-the-breed/home" element={<GuessTheBreedHome />} />
            <Route path="/cat-care-game/home" element={<CatCareHome />} />
            <Route path="/true-or-false/home" element={<TrueOrFalseHome />} />
            <Route path="/adoption-page/home" element={<AdoptionPageHome />} />
            <Route path="/compatability-quiz/home" element={<CompatabilityQuiz />}/>
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<CompatabilityAi />} />
            
        </Routes>
      </CatProvider>
    </BrowserRouter>
  );
}

export default App;
