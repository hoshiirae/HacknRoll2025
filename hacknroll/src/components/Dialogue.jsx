import { useState } from 'react'
import '../styles/dialogue.css'

const Dialogue = ({dialogue, onClose}) => {
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0)

    const handleNext = () => {
        if (currentDialogueIndex < dialogue.length - 1) {
          setCurrentDialogueIndex(currentDialogueIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentDialogueIndex >= 1) {
          setCurrentDialogueIndex(currentDialogueIndex - 1);
        }
    };

    const currentDialogue = dialogue[currentDialogueIndex];
    
    return (
        <div className="dialogue-container">
          <div className="cat-image">
            {currentDialogue.image && (
              <img src={currentDialogue.image} alt={currentDialogue.character} />
            )}
          </div>

          <div className="dialogue-box">
            <h2>{currentDialogue.character}</h2>
            <p>{currentDialogue.text}</p>
          </div>
          
          {currentDialogue.id === 1 ? null : <button onClick={handlePrevious}>{'<<'}</button>}
            {currentDialogue.id === 6 ? <button onClick={onClose}>{'Close'}</button> : 
                <button onClick={handleNext}>{'>>'}</button>}
        </div>
      );
};

export default Dialogue;