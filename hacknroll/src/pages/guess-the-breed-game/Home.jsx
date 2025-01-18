import React, { useState } from "react";
import catImage from "./images/coco.jpg";
import messageBubble from "../../images/message.png";
import LetterSlot from "./components/LetterSlot";
import Keyboard from "./components/Keyboard";
import "./home.css";
const Home = () => {
  const [breed, setBreed] = useState("meow");
  const breedArray = breed.split("");

  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz");
  const alphabetArray = alphabet.split("");

  const [guessedWord, setGuessedWord] = useState([]);

  const [numberOfChances, setNumberOfChances] = useState(breedArray.length);

  function handleKeyboardClick(letter) {
    setGuessedWord((prev) => [...prev, letter]);
    console.log(guessedWord);
  }

  return (
    <div className="guess-the-breed-home-page">
      <p className="guess-the-breed-home-title">Guess the breed</p>
      <div className="guess-the-breed-home-body">
        <div className="guess-the-breed-home-body-left-content">
          <img src={catImage}></img>
        </div>
        <div className="guess-the-breed-home-body-right-content">
          <div className="guess-the-breed-home-body-right-content-message-wrapper">
            <div className="guess-the-breed-home-body-right-content-messageandtext-container"></div>
            <img
              className="guess-the-breed-home-body-right-content-message"
              src={messageBubble}
            ></img>
            <p className="guess-the-breed-home-body-right-content-text">
              meow meow meow meow meow meow meow meow meow meow meow meow
            </p>
          </div>
          <div className="guess-the-breed-home-body-right-content-letterslot-container">
            {breedArray.map((current) => (
              <LetterSlot key={current} letter={current} />
            ))}
          </div>
          <div className="guess-the-breed-home-body-right-content-keyboard-container">
            {" "}
            {alphabetArray.map((current) => (
              <Keyboard
                key={current}
                letter={current}
                onClick={handleKeyboardClick}
                isSelectedCorrect={
                  guessedWord.includes(current)
                    ? breedArray.includes(current)
                      ? true
                      : false
                    : null
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
