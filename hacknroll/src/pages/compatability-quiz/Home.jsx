import React, { useEffect, useState } from "react";
import "./home.css";
import McqOptions from "./components/McqOptions";
import quizList from "./quizList.js";
import useTypingEffect from "../../components/TypingEffect";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./QuizContext";
import CompatabilityAi from "./CompatabilityAi.jsx";

const Home = () => {

  const navigate = useNavigate()

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [breed, setBreed] = useState("")
  const { quizState, setQuizState } = useQuiz();
  const [startGame, setStartGame] = useState(false);
  const [completedQuiz, setCompletedQuiz] = useState(false);

  function handleBackButton() {
    if (currentQuestionNumber !== 0)
      setCurrentQuestionNumber((prev) => prev - 1);
  }

  function handleNextButton() {
    if (currentQuestionNumber !== quizState.length - 1)
      setCurrentQuestionNumber((prev) => prev + 1);
  }

  function saveSelectedOption(answer) {
    setQuizState((prev) =>
      prev.map((item, index) =>
        index === currentQuestionNumber ? { ...item, userAnswer: answer } : item
      )
    );
    console.log(quizState);
  }

  useEffect(() => {
    if (quizState.length === 0) 
      setQuizState(quizList);
    if (currentQuestionNumber === quizState.length - 1) setCompletedQuiz(true);
  }, [currentQuestionNumber]);

  const fullInstruction = useTypingEffect(
    `Welcome to the Cat Compatibility Quiz!  <br>
    This quiz is designed to help you discover which cat breed best fits your lifestyle and preferences. <br> Read each question carefully and select the option that best describes your preference. <br>
    Let's MEOWWW!`,
    35
  );

  return (
    <div className="compatability-quiz-page">
      {!startGame && (
        <div className="guess-the-breed-beginning-message-overlay">
          <div className="guess-the-breed-beginning-message">
            <h1>Find Your Purr-fect Match!</h1>
            <p
              className="instructions-text"
              dangerouslySetInnerHTML={{ __html: fullInstruction }}
            ></p>
            <button
              className="guess-the-breed-beginning-button"
              onClick={() => setStartGame(true)}
            >
              Start
            </button>
          </div>
        </div>
      )}
      <div className="compatability-quiz-header">
        {quizState.length > 0 && currentQuestionNumber < quizState.length ? (
          <>
            <p className="compatability-quiz-header-question-number">
              {`Question ${currentQuestionNumber + 1}/${quizState.length}`}
            </p>
            <p className="compatability-quiz-header-question">
              {quizState[currentQuestionNumber].question}
            </p>
          </>
        ) : (
          <p>Loading...</p> // Handle the loading state
        )}
      </div>


      <hr></hr>
      <div className="compatability-quiz-mcq-section">
        <button onClick={handleBackButton}>{"<"}</button>
        <div className="compatability-quiz-mcq-container">
        {quizState.length > 0 && quizState[currentQuestionNumber] ? (
          quizState[currentQuestionNumber].options.map((current, index) => (
            <McqOptions
              key={current}
              questionNo={index + 1}
              question={current}
              onClick={saveSelectedOption}
              isSelected={
                quizState[currentQuestionNumber].userAnswer === current
              }
            />
          ))
        ) : (
          <p>Loading options...</p>
        )}
        </div>
        <button onClick={handleNextButton}>{">"}</button>
      </div>
      {completedQuiz && (
        <div className="compatability-quiz-bottom-container">
              <button className="submit-button" onClick={() => navigate('/adoption-page/home')}>
                Submit
              </button>
        </div>
      )}

      {completedQuiz && (
        <CompatabilityAi getBreed={setBreed}/>
      )}

      
    </div>
  );
};

export default Home;
