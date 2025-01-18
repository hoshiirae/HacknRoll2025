import "./home.css";
import { useState, useEffect, useRef } from "react";
import QuestionGenerator from "./QuizGenerator";
import useTypingEffect from "../../components/TypingEffect";
import { useNavigate } from "react-router-dom";
import monsterCat from "../../images/leonmonster.png";
import sadMeowAudio from "../../audio/meow-sad-song.mp3";

export default function Home() {
  const navigate = useNavigate();

  const [gameStart, setGameStart] = useState(false);
  const [qns, setQns] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQnIndex, setCurrentQnIndex] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [isJumpScareActive, setJumpScareActive] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);

  const hissSound = useRef(null);

  useEffect(() => {
    hissSound.current = new Audio(sadMeowAudio);
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
    if (gameEnd) {
      const timer = setTimeout(() => {
        setMessageVisible(true);
        setJumpScareActive(false);
      }, 3000);

      return () => clearTimeout(timer); //dismount
    }
  }, [gameEnd]);

  useEffect(() => {
    if (gameEnd && score < 3) setJumpScareActive(true);
  }, [gameEnd]);

  const instructions = useTypingEffect(
    "Test your knowledge about caring for cats by answering 5 multiple-choice questions, each with 3 options to choose from. Take your time, think carefully, and have fun learning about the best ways to care for your feline friends! Good luck!"
  );
  const win = useTypingEffect(
    `Congratulations! Your score is ${score}/5! You've saved a cat! Good job! `,
    35,
    gameEnd
  );
  const lose = useTypingEffect(
    `Your score is ${score}/5...Unfortunately, Leon the kitten wasn't saved this time... 😿 `,
    35,
    gameEnd
  );

  function handleLoseClick() {
    hissSound.current.pause();
    hissSound.current.currentTime = 0;

    navigate("/Main");
  }
  const handleAnswer = (selected) => {
    if (qns[currentQnIndex][4] === selected) {
      setScore(score + 1);
    }

    if (currentQnIndex < qns.length - 1) {
      setCurrentQnIndex(currentQnIndex + 1);
    } else {
      setGameEnd(true);
    }
  };

  if (score < 3) {
    sessionStorage.setItem("leonLose", "true");
  } else {
    sessionStorage.setItem("leonLose", "false");
  }

  return (
    <div className="cat-care">
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

      {!gameEnd && qns.length > 1 && (
        <div className="main">
          <div className="cat-care-questions">
            <h1>Questions</h1>
            <p>{qns[currentQnIndex][0]}</p>
          </div>
          <div className="cat-care-buttons">
            <button
              className="louis-option"
              onClick={() => handleAnswer("1")}
              data-option={qns[currentQnIndex][1]}
            ></button>
            <button
              className="coco-option"
              onClick={() => handleAnswer("2")}
              data-option={qns[currentQnIndex][2]}
            ></button>
            <button
              className="leon-option"
              onClick={() => handleAnswer("3")}
              data-option={qns[currentQnIndex][3]}
            ></button>
          </div>
        </div>
      )}

      <QuestionGenerator setQns={setQns} />

      {gameEnd && score >= 3 && (
        <div className="instructions-overlay">
          <div className="instructions">
            <h1>Stage Cleared!</h1>
            <p>{win}</p>
            <button onClick={() => navigate("/Main")}>Next</button>
          </div>
        </div>
      )}

      {gameEnd && isJumpScareActive && score < 3 && (
        <div className="jump-scare-overlay">
          <img src={monsterCat} className="jump-scare-image"></img>
        </div>
      )}

      {gameEnd && isMessageVisible && score < 3 && (
        <div className="instructions-overlay">
          <div className="instructions">
            <h1>Aw man...</h1>
            <p>{lose}</p>
            <button
              className="message-button"
              onClick={() => handleLoseClick()}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
