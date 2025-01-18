import {useState} from "react";
import blackCat from "../../images/mainCat.png";
import trueCat from "../../images/cat-true-paw.png";
import falseCat from "../../images/cat-false-paw.png";
import "./home.css";
import QuestionGenerator from "./QuestionGenerator";

const Home = () => {

  const [score, setScore] = useState(0)
  const [qns, setQns] = useState([])
  const [currentQnIndex, setCurrentQnIndex] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [showAns, setShowAns] = useState("")
  const [answered, setAnswered] = useState(false); 

  const handleAnswer = (playerAnswer) => {
    const currentQn = qns[currentQnIndex]

    if (!currentQn) return;

    const correctAns = currentQn[1]

    if (playerAnswer === correctAns) {
      setScore(score + 1)
    }

    setShowAns(currentQn[2])
    setAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQnIndex < qns.length - 1) {
      setCurrentQnIndex((prevIndex) => prevIndex + 1);
      setShowAns(""); // Clear the explanation for the next question
      setAnswered(false); // Reset answered state for the next question
    } else {
      setIsGameOver(true); // End the game if it's the last question
    }
  };


  return (
    <div className="true-or-false-game-page">
      <div className="true-or-false-top-container">
        <p>
          The Cat's Tale <br /> Fact or Fiction?
        </p>
      </div>
      <div className="true-or-false-body-container">
        <div className="true-or-false-left-truecat-container"
          onClick={() => handleAnswer("True")}
        >
          <p>True</p>
          <img src={trueCat}></img>
        </div>
        <div className="true-or-false-middle-blackcat-container">
          <div className="true-or-false-blackcat-wrapper">
            <img className="true-or-false-middle-blackcat" src={blackCat}></img>
            <p className="question">
              {qns[currentQnIndex]?.[0]}
            </p>
            {showAns && <p className="show-answer"> Ans: {showAns}</p>}

            {answered && (
              <button onClick={handleNextQuestion}>Next</button> 
            )}
            
          </div>
          <QuestionGenerator setQns={setQns} />
          
        </div>

        <div className="true-or-false-right-truecat-container"
          onClick={() => handleAnswer("False")}
        >
          <p>False</p>
          <img src={falseCat}></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
