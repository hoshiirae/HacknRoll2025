import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/main.css'
import Dialogue from "../components/Dialogue"
import dialogueData from "../dialogueData"
import leonmonster from '../images/leonmonster.png'
import cocomonster from '../images/cocomonster.png'
import louismonster from '../images/louismonster.png'

export default function Main() {

    const navigate = useNavigate()

    const [isDialogueVisible, setIsDialogueVisible] = useState(() => {
        const visibility = sessionStorage.getItem("isDialogueVisible")
        return visibility !== "false"
    }
    )

    const handleDialogueClose = () => {
        setIsDialogueVisible(false);
        sessionStorage.setItem("isDialogueVisible", "false")
    };

    const leonLose = sessionStorage.getItem("leonLose")
    const cocolose = sessionStorage.getItem("cocolose")
    const louislose = sessionStorage.getItem("louislose")

    return(
        <div className="main-container">
            {!isDialogueVisible && (
                <div>
                    {cocolose === "true" ? (<img className="cocomonster" src={cocomonster}></img>) 
                     :  cocolose === "false" ? <button className="coco"></button>
                     : <button className="coco" onClick={() => navigate("/guess-the-breed/home")}></button> }

                    {leonLose === "true" ? (<img className="leonmonster" src={leonmonster}></img>) 
                     :  leonLose === "false" ? <button className="leon"></button>
                     : <button className="leon" onClick={() => navigate("/cat-care-game/home")}></button> }

                    {louislose === "true" ? (<img className="louismonster" src={louismonster}></img>) 
                     :  leonLose === "false" ? <button className="louis"></button>
                     : <button className="leon" onClick={() => navigate("/true-or-false/home")}></button> }
                </div>
            )}

            {isDialogueVisible && (
               <Dialogue dialogue={dialogueData} onClose={handleDialogueClose}/>
            )}
        </div>
        
    )
}