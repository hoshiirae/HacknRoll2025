import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import blackCat from "../../images/mainCat.png";
import trueCat from "../../images/cat-true-paw.png";
import falseCat from "../../images/cat-false-paw.png";
import "./home.css";
import QuestionGenerator from "./QuestionGenerator";
import useTypingEffect from "../../components/TypingEffect";
import monsterCat from "../../images/louismonster.png";
import jumpScareAudio from "../../audio/jumpscare-audio.mp3";

const Home = () => {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [qns, setQns] = useState([]);
  const [currentQnIndex, setCurrentQnIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showAns, setShowAns] = useState("");
  const [answered, setAnswered] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [isJumpScareActive, setJumpScareActive] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);

  const instructions = useTypingEffect(
    "Test your knowledge about our feline friends by deciding whether each statement is true or false. Simply click on the true paw or false paw to select your answer. Good Luck!"
  );
  const win = useTypingEffect(
    `Meow! Your score is ${score}/5! You saved a cat! Well done and keep it up!`,
    50,
    isGameOver
  );
  const lose = useTypingEffect(
    `Despite your efforts, your score is ${score}/5. Louis has changed... the sadness was too much for him, and he’s become something different. Louis the kitten couldn’t be saved this time. `,
    50,
    isGameOver
  );

  useEffect(() => {
    if (isJumpScareActive) {
      const timer = setTimeout(() => {
        setMessageVisible(true);
        setJumpScareActive(false);
      }, 3000);

      return () => clearTimeout(timer); //dismount
    }
  }, [isJumpScareActive]);

  const hissSound = useRef(null);

  useEffect(() => {
    hissSound.current = new Audio(jumpScareAudio);
    hissSound.current.preload = "auto"; // preload the audio
    hissSound.current.volume = 1.0; // Set volume to maximum
  }, []); // ensures this runs only once

  useEffect(() => {
    if (isJumpScareActive) {
      // Stop any ongoing playback and play from the start
      hissSound.current.pause();
      hissSound.current.currentTime = 0; // Start from the beginning
      hissSound.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  }, [isJumpScareActive]);

  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => {
        setMessageVisible(true);
        setJumpScareActive(false);
      }, 3000);

      return () => clearTimeout(timer); //dismount
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver && score < 3) setJumpScareActive(true);
  }, [isGameOver]);

  const handleAnswer = (playerAnswer) => {
    const currentQn = qns[currentQnIndex];

    if (!currentQn) return;

    const correctAns = currentQn[1];

    if (playerAnswer === correctAns) {
      setScore(score + 1);
    }

    setShowAns(currentQn[2]);
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQnIndex < qns.length - 1) {
      setCurrentQnIndex((prevIndex) => prevIndex + 1);
      setShowAns(""); // Clear the explanation for the next question
      setAnswered(false); // Reset answered state for the next question
    } else {
      setIsGameOver(true); // End the game if it's the last question
    }
  };

  if (score < 3) {
    sessionStorage.setItem("louislose", "true");
  } else {
    sessionStorage.setItem("louislose", "false");
  }

  return (
    <div className="true-or-false-game-page">
      {!gameStart && (
        <div className="instructions-overlay">
          <div className="instructions">
            <h1>Instructions</h1>
            <p>{instructions}</p>
            <button
              className="message-button"
              onClick={() => setGameStart(true)}
            >
              Start
            </button>
          </div>
        </div>
      )}

      <div className="true-or-false-top-container">
        <p>
          The Cat's Tale <br /> Fact or Fiction?
        </p>
      </div>
      <div className="true-or-false-body-container">
        <div
          className="true-or-false-left-truecat-container"
          onClick={() => handleAnswer("True")}
        >
          <p>True</p>
          <img src={trueCat}></img>
        </div>
        <div className="true-or-false-middle-blackcat-container">
          <div className="true-or-false-blackcat-wrapper">
            <img className="true-or-false-middle-blackcat" src={blackCat}></img>
            <p className="question">{qns[currentQnIndex]?.[0]}</p>
            {showAns && <p className="show-answer"> Ans: {showAns}</p>}

            {answered && <button onClick={handleNextQuestion}>Next</button>}
          </div>
          <QuestionGenerator setQns={setQns} />
        </div>

        <div
          className="true-or-false-right-truecat-container"
          onClick={() => handleAnswer("False")}
        >
          <p>False</p>
          <img src={falseCat}></img>
        </div>
      </div>

      {isGameOver && score >= 3 && (
        <div className="instructions-overlay">
          <div className="instructions">
            <h1>Stage Cleared!</h1>
            <p>{win}</p>
            <button
              className="message-button"
              onClick={() => navigate("/Main")}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isGameOver && isJumpScareActive && score < 3 && (
        <div className="jump-scare-overlay">
          <img src={monsterCat} className="jump-scare-image"></img>
        </div>
      )}
      {isGameOver && isMessageVisible && score < 3 && (
        <div className="instructions-overlay">
          <div className="instructions">
            <h1>Aw meow...</h1>
            <p>{lose}</p>
            <button
              className="message-button"
              onClick={() => navigate("/Main")}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
