import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/main.css'
import Dialogue from "../components/Dialogue"
import dialogueData from "../dialogueData"
import leonmonster from '../images/leonmonster.png'
import cocomonster from '../images/cocomonster.png'
import louismonster from '../images/louismonster.png'
import useTypingEffect from "../components/TypingEffect"

export default function Main() {

    const navigate = useNavigate()
    const [winCount, setWinCount] = useState(0)
    const [loseCount, setLoseCount] = useState(0)
    const [gameEnd, setGameEnd] = useState(false)

    const winningText = useTypingEffect("Thank you for helping us excape! Please bring us back home with you too!")
    const losingText = useTypingEffect("Meow....m..e.ow....m.....m̷̛̥̻̪̰̙͙̞̲̲̩̄̑͌̉͋̓̚͠͝͝-̵̼̼̫̜̹̱̰̗̯̻̪͖͍̲̀͘-̵̢̛͚̬̱͕͎̐͛̋́̎̈́̊̌̋͗͘ͅ-̷̠͍͕͕̞̰̹̑̆̂͊́͛̄̿̾̅͛̒̕ͅ-̴̛̗̫͙̥̹͙̤̲̮̥̾̍̓̾͘̕͝ę̶̢͖͕̩̖̰͕̭̜͖͙̫̀̌̽̄̂͆̈́̔͗̄͑́̿̚͝ó̸̧̪͓̻͙̦͔̘͔͇͇̊̕͜͝w̶͉͗̇̈̊͊̆̂͐̓̔͐̿̊̕ ̸̢̠̤͚͎͇̫̠̤̤̝̳̜̘̤̀́m̶̱̰̂̽w̵̧̧̠͍̙̮̹̙̰̙͈͖̄̿̀̒̕͘͜ͅ-̷̢͉͖̞̻̳̲̲̟̼̫͈̤́̀̂̋̈͂̄́̂͘͠-̶̥̺̼̤̟̓͊͆̒̕-̸̰̜̦͙͒͐̿́e̴͎̬͚̜̙͎̪̠͆̾͜ǫ̴̢̨̨͙̗͖̯̞̘͖͍̟͊̏̈́̏͂̍͛̌͐̀̏̀̚͝ẃ̷̥̞̖̣̝͉̯̭̽̿̓͊̔̽̉̏́͐̚͠͠ ̴̼͓̬̋͑̊̇́̀̏̋̅̏̆̚͘m̵͚̲̖̣̭̮̞̻̱̆̀̔͐͆̓͒́̚̚͜ͅͅ.̵̡̧͚̗̳̜̥͍͉̹̓̇̒̈̃͑̃̌̆͝.̷̢̟̪̰̼̎̀͊́́̄͋̀̚͜͠ͅẉ̶̡̬͓̬̝̪̫̓̎͐̓͛̽̎̐̚͝͠ọ̸̢̨͓̱͔̱̻͕̪̞͍͂̀̓̽͋͊̒̋̅̄q̴̨̞̩̳̹͚͎̯͔͖̙̂̀͌̐̒͊́͌̿̀͝")

    const [isDialogueVisible, setIsDialogueVisible] = useState(() => {
        const visibility = sessionStorage.getItem("isDialogueVisible")
        return  visibility !== "false";
        }
    )

    const handleDialogueClose = () => {
        setIsDialogueVisible(false);
        sessionStorage.setItem("isDialogueVisible", "false")
    };

    const leonlose = sessionStorage.getItem("leonLose")
    const cocolose = sessionStorage.getItem("cocolose")
    const louislose = sessionStorage.getItem("louislose")

    useEffect(() => {
        if (cocolose === "false") {
            setWinCount((prev) => prev + 1);
        } else if (cocolose === "true") {
            setLoseCount((prev) => prev + 1);
        }
    }, [cocolose]);
    
    useEffect(() => {
        if (leonlose === "false") {
            setWinCount((prev) => prev + 1);
        } else if (leonlose === "true") {
            setLoseCount((prev) => prev + 1);
        }
    }, [leonlose]);
    
    useEffect(() => {
        if (louislose === "false") {
            setWinCount((prev) => prev + 1);
        } else if (louislose === "true") {
            setLoseCount((prev) => prev + 1);
        }
    }, [louislose]);
    

    // Determine if the game has ended
    useEffect(() => {
        if (winCount + loseCount === 6) {
            setGameEnd(true);
        }
    }, [winCount, loseCount]);
    
    console.log(cocolose)
    console.log(louislose)
    console.log(leonlose)
    console.log(`win =  ${winCount}`)
    console.log(`lose = ${loseCount}`)

    return(
        <div className="main-container">
            {!isDialogueVisible && (
                <div>
                    {cocolose === "true" ? (<img className="cocomonster" src={cocomonster}></img>) 
                     :  cocolose === "false" ? <button className="coco"></button>
                     : <button className="coco" onClick={() => navigate("/guess-the-breed/home")}></button> }

                    {leonlose === "true" ? (<img className="leonmonster" src={leonmonster}></img>) 
                     :  leonlose === "false" ? <button className="leon"></button>
                     : <button className="leon" onClick={() => navigate("/cat-care-game/home")}></button> }

                    {louislose === "true" ? (<img className="louismonster" src={louismonster}></img>) 
                     :  louislose === "false" ? <button className="louis"></button>
                     : <button className="louis" onClick={() => navigate("/true-or-false/home")}></button> }
                </div>
            )}

            {isDialogueVisible && (
               <Dialogue dialogue={dialogueData} onClose={handleDialogueClose}/>
            )}

            {gameEnd && winCount >= 4 && (
                <div className='win-text-overlay'>
                    <div className='win-text'>
                        <h1>CONGRATULATIONS</h1>
                        <p>{winningText}</p>
                        <button onClick={() => navigate('/compatability-quiz/home')}>Compatability Quiz</button>
                    </div>
                </div>
            )}

            {gameEnd && winCount < 4 && (
                <div className='win-text-overlay'>
                    <div className='win-text'>
                        <h1>ALL BECAUSE OF YOU</h1>
                        <p>{losingText}</p>
                        <button onClick={() => navigate('/')}>Exit</button>
                    </div>
                </div>
            )}
        </div>
        
    )
}