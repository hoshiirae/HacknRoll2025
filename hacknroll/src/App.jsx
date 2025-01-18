import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import GuessTheBreedHome from "./pages/guess-the-breed-game/Home";
import TrueOrFalseHome from "./pages/true-or-false-game/Home";
import CompatabilityQuiz from "./pages/compatability-quiz/Home";
import Test from "./pages/compatability-quiz/components/CatBreeds";
import AdoptionPageHome from "./pages/adoption-page/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/guess-the-breed/home" element={<GuessTheBreedHome />} />
        <Route path="/true-or-false/home" element={<TrueOrFalseHome />} />
        <Route path="/adoption-page/home" element={<AdoptionPageHome />} />

        <Route
          path="/compatability-quiz/home"
          element={<CompatabilityQuiz />}
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
