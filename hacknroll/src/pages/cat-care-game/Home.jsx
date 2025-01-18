import './home.css'
import { useState } from "react"
import QuestionGenerator from './QuizGenerator'
import useTypingEffect from '../../components/TypingEffect'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate()

    const [gameStart, setGameStart] = useState(false)
    const [qns, setQns] = useState([])
    const [score, setScore] = useState(0)
    const [currentQnIndex, setCurrentQnIndex] = useState(0)
    const [gameEnd, setGameEnd] = useState(false)


    const instructions = useTypingEffect( "Test your knowledge about caring for cats by answering 5 multiple-choice questions, each with 3 options to choose from. Take your time, think carefully, and have fun learning about the best ways to care for your feline friends! Good luck!")
    const win = useTypingEffect(`Congratulations! Your score is ${score}/5! You've saved a cat! Good job! `, 35, gameEnd)
    const lose = useTypingEffect(`Your score is ${score}/5...So close! `, 35, gameEnd)

    const handleAnswer = (selected) => {
        if (qns[currentQnIndex][4] === selected) {
            setScore(score + 1)
        }

        if (currentQnIndex < qns.length - 1) {
            setCurrentQnIndex(currentQnIndex + 1)
        } else {
            setGameEnd(true)
        }
    }

    if (score < 3) {
        sessionStorage.setItem("leonLose", "true")
    } else {
        sessionStorage.setItem("leonLose", "false")
    }

    return (
        <div className="cat-care">

            {!gameStart && (
                <div className='instructions-overlay'>
                    <div className='instructions'>
                        <h1>Instructions</h1>
                        <p>{instructions}</p>
                        <button onClick={() => setGameStart(true)}>Start</button>
                    </div>
                </div>
            )}

            {!gameEnd && qns.length > 1 && (
                <div className='main'>
                    <div className="cat-care-questions">
                        <h1>Questions</h1>
                        <p>{qns[currentQnIndex][0]}</p>
                    </div>
                    <div className="cat-care-buttons">
                        <button 
                            className="louis-option"
                            onClick={() => handleAnswer("1")}
                            data-option = {qns[currentQnIndex][1]}
                        ></button>
                        <button 
                            className="coco-option"
                            onClick={() => handleAnswer("2")}
                            data-option = {qns[currentQnIndex][2]}
                        ></button>
                        <button 
                            className="leon-option"
                            onClick={() => handleAnswer("3")}
                            data-option = {qns[currentQnIndex][3]}
                        ></button>
                    </div>
                </div>
            )}

            <QuestionGenerator setQns={setQns}/>

            {gameEnd && score >= 3 && (
                <div className='instructions-overlay'>
                <div className='instructions'>
                    <h1>Stage Cleared!</h1>
                    <p>{win}</p>
                    <button onClick={() => navigate('/Main')}>Next</button>
                </div>
            </div>
            )}

            {gameEnd && score < 3 && (
                <div className='instructions-overlay'>
                <div className='instructions'>
                    <h1>Aw man...</h1>
                    <p>{lose}</p>
                    <button onClick={() => navigate('/Main')}>Next</button>
                </div>
            </div>
            )}
        </div>
    )
}