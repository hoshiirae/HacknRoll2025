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
                    <button className="coco" ></button>
                    <button className="leon"></button>
                    <button className="louis" onClick={() => navigate("/guess-the-breed/home")}></button>
                </div>
            )}

            {isDialogueVisible && (
               <Dialogue dialogue={dialogueData} onClose={handleDialogueClose}/>
            )}
        </div>
        
    )
}