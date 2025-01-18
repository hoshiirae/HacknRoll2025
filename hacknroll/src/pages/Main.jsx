import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/main.css'
import Dialogue from "../components/Dialogue"
import dialogueData from "../dialogueData"

export default function Main() {

    const navigate = useNavigate()
    const [isDialogueVisible, setIsDialogueVisible] = useState(true)

    const handleDialogueClose = () => {
        setIsDialogueVisible(false);
    };

    return(
        <div className="main-container">
            {!isDialogueVisible && (
                <div>
                    <button className="coco" onClick={() => navigate("/guess-the-breed/home")}></button>
                    <button className="leon" onClick={() => navigate("/cat-care-game/home")}></button>
                    <button className="louis"></button>
                </div>
            )}

            {isDialogueVisible && (
               <Dialogue dialogue={dialogueData} onClose={handleDialogueClose}/>
            )}
        </div>
        
    )
}