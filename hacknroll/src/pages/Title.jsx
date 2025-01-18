import { useNavigate } from "react-router-dom"
import start from '../images/start.png'
import startHovered from '../images/start-hovered.png'
import '../styles/title.css'

export default function Title() {

    const navigate = useNavigate()

    return(
        <div className="title-page" onClick={() => {navigate('/Main')}}>
            <button className="buttons">
                <img className="start-button" src={start}></img>
                <img className="start-button-hovered" src={startHovered}></img>
            </button>
        </div>
    )
    
}