import React, { useEffect, useState } from "react";
import catImage from "./images/coco.jpg";
import messageBubble from "../../images/message.png";
import LetterSlot from "./components/LetterSlot";
import Keyboard from "./components/Keyboard";
import CatImage from "./components/CatImage";
import monsterCat from "../../images/cocomonster.png";
import { useNavigate } from "react-router-dom";
import useTypingEffect from "../../components/TypingEffect";
import { useCatContext } from "./CatContext";
import FactGenerator from "./FactGenerator";
import jumpScareAudio from "../../audio/jumpscare-audio.mp3";
import "./home.css";
const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isGameWon, setIsGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [isJumpScareActive, setJumpScareActive] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [handleNextLoseMessage, setHandleNextLoseMessage] = useState(false);

  const { breed, setBreed } = useCatContext();
  const [facts, setFacts] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [displayFact, setDisplayFact] = useState("meow ");
  const breedArray = breed.split("");

  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz");
  const alphabetArray = alphabet.split("");

  const [guessedWord, setGuessedWord] = useState([]);

  const [numberOfChances, setNumberOfChances] = useState(-1);

  if (isGameWon) {
    sessionStorage.setItem("cocolose", "false");
  } else {
    sessionStorage.setItem("cocolose", "true");
  }

  useEffect(() => {
    if (isJumpScareActive) {
      const timer = setTimeout(() => {
        setMessageVisible(true);
        setJumpScareActive(false);
      }, 3000);

      return () => clearTimeout(timer); //dismount
    }
  }, [isJumpScareActive]);

  const hissSound = React.useRef(null);

  React.useEffect(() => {
    hissSound.current = new Audio(jumpScareAudio);
    hissSound.current.preload = "auto"; // preload the audio
    hissSound.current.volume = 1.0; // Set volume to maximum
  }, []); // ensures this runs only once

  React.useEffect(() => {
    if (isJumpScareActive) {
      // Stop any ongoing playback and play from the start
      hissSound.current.pause();
      hissSound.current.currentTime = 0; // Start from the beginning
      hissSound.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  }, [isJumpScareActive]);

  function handleKeyboardClick(letter) {
    setGuessedWord((prev) => [...prev, letter]);
    console.log(guessedWord);
  }

  function isSelectedLetterCorrect(letter) {
    return guessedWord.includes(letter)
      ? breedArray.includes(letter)
        ? true
        : false
      : null;
  }

  useEffect(() => {
    const lastGuessedLetter = guessedWord[guessedWord.length - 1];
    if (lastGuessedLetter && breedArray.includes(lastGuessedLetter)) {
      if (facts.length > 0) {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
        setDisplayFact(facts[currentFactIndex]);
      }
    }
  }, [guessedWord]);

  useEffect(() => {
    if (breed) {
      setNumberOfChances(breed.length); // Set chances to the breed length
    }
  }, [breed]);

  useEffect(() => {
    if (breedArray.length > 0) {
      const gameIsOver = breedArray.every((letter) =>
        guessedWord.includes(letter)
      );

      if (gameIsOver === true && numberOfChances > 0) setIsGameWon(true);
      if (gameIsOver === true || numberOfChances === 0) setGameOver(true);
    }

    console.log(breed);
  }, [guessedWord, numberOfChances]);

  const fullInstruction = useTypingEffect(
    "To save the kittens, you need to identify the breed of the cat in the image. With each correct letter you guess, you will unlock a translation of the cat's meow, which will give you another clue to help identify its breed. Good luck!",
    35
  );

  const winningText = useTypingEffect(
    `Well done!  
    You’ve cracked the meow and can now move on to the next stage! 🐾`,
    35,
    isGameWon
  );

  const catTurnedMonsterText = useTypingEffect(
    "Oh no... one of the kittens has transformed into a monster! 😿 It's a tragic turn of events. Can you save the rest before it’s too late?",
    35,
    isMessageVisible
  );

  const doYouHearSmthText = useTypingEffect(
    "But wait... do you hear something?",
    35,
    handleNextLoseMessage
  );

  const losingText = useTypingEffect(
    "Almost there! You can move on to the next stage, but the kittens still need a little more help. Keep going!",
    50,
    isGameWon === false && gameOver
  );

  return (
    <div className="guess-the-breed-home-page">
      {!startGame && (
        <div className="guess-the-breed-beginning-message-overlay">
          <div className="guess-the-breed-beginning-message">
            <h1>Instructions</h1>
            <p>{fullInstruction}</p>
            <button
              className="guess-the-breed-beginning-button"
              onClick={() => setStartGame(true)}
            >
              Start
            </button>
          </div>
        </div>
      )}
      {/*Stage Cleared message*/}
      {gameOver && (
        <div className="guess-the-breed-ending-message-overlay">
          {isGameWon ? (
            <div className="guess-the-breed-ending-message-win">
              <h1>Stage Cleared!</h1>

              <p>{winningText}</p>

              <button
                className="guess-the-breed-end-button-win"
                onClick={() => {
                  setStartGame(true), navigate("/Main");
                }}
              >
                Next
              </button>
            </div>
          ) : handleNextLoseMessage === false ? (
            <div className="guess-the-breed-ending-message-lose">
              <h1>Close, But Not Quite!!</h1>
              <p>{losingText}</p>
              <button
                className="guess-the-breed-end-button-lose"
                onClick={() => {
                  setHandleNextLoseMessage(true);
                }}
              >
                Next
              </button>
            </div>
          ) : isJumpScareActive === false ? (
            <div className="guess-the-breed-ending-message-lose">
              <h1>Close, But Not Quite!!</h1>
              <p>{doYouHearSmthText}</p>
              <button
                className="guess-the-breed-end-button-lose"
                onClick={() => {
                  setJumpScareActive(true);
                }}
              >
                Next
              </button>
            </div>
          ) : (
            isJumpScareActive && (
              <div className="jump-scare-overlay">
                <img
                  src={monsterCat}
                  alt="Scary Cat"
                  className="jump-scare-image"
                />
              </div>
            )
          )}

          {isMessageVisible && (
            <div className="guess-the-breed-ending-message-lose">
              <h1>Close, But Not Quite!!</h1>
              <p>{catTurnedMonsterText}</p>
              <button
                className="guess-the-breed-end-button-lose"
                onClick={() => {
                  setStartGame(true), navigate("/Main");
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      <p className="guess-the-breed-home-title">Guess the breed</p>
      <div className="guess-the-breed-home-body">
        <div className="guess-the-breed-home-body-left-content">
          <div className="guess-the-breed-home-body-left-cat-img-container">
            <CatImage
              setLoading={setLoading}
              setWord={setBreed}
              loading={loading}
            />
          </div>
        </div>
        <div className="guess-the-breed-home-body-right-content">
          <div className="guess-the-breed-home-body-right-content-message-wrapper">
            <div className="guess-the-breed-home-body-right-content-messageandtext-container">
              <img
                className="guess-the-breed-home-body-right-content-message"
                src={messageBubble}
              ></img>
              <p className="guess-the-breed-home-body-right-content-text">
                {displayFact}
              </p>
            </div>
          </div>

          <FactGenerator setFacts={setFacts} />

          <div className="guess-the-breed-home-body-right-content-letterslot-container">
            {!loading &&
              breedArray.map((current, index) => (
                <LetterSlot
                  key={`${current} - ${index}`}
                  letter={current}
                  isLetterGuessed={isSelectedLetterCorrect(current)}
                  numberOfChances={numberOfChances}
                  loading={loading}
                />
              ))}
          </div>
          <div className="guess-the-breed-home-body-right-content-keyboard-container">
            <div className="guess-the-breed-home-body-right-content-keyboard-wrapper">
              {alphabetArray.map((current) => (
                <Keyboard
                  key={current}
                  letter={current}
                  onClick={handleKeyboardClick}
                  isSelectedCorrect={isSelectedLetterCorrect(current)}
                  modifyNumberOfChances={setNumberOfChances}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
