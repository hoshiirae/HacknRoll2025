import React, { useEffect } from "react";
import "../style/keyboard.css";
import hiss from "../../../audio/angry-cat-sound.mp3";

const Keyboard = (props) => {
  let backgroundColor = "d9d9d9d";
  if (props.isSelectedCorrect !== null) {
    backgroundColor = props.isSelectedCorrect ? "green" : "red";
  }

  useEffect(() => {
    if (props.isSelectedCorrect === false) {
      props.modifyNumberOfChances((prev) => prev - 1);
    }
  }, [props.isSelectedCorrect]);

  const hissSound = React.useRef(null);

  React.useEffect(() => {
    hissSound.current = new Audio(hiss);
    hissSound.current.preload = "auto"; // preload the audio
    hissSound.current.volume = 1.0; // Set volume to maximum
  }, []); // ensures this runs only once

  React.useEffect(() => {
    if (props.isSelectedCorrect === false) {
      // Stop any ongoing playback and play from the start
      hissSound.current.pause();
      hissSound.current.currentTime = 0; // Start from the beginning
      hissSound.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  }, [props.isSelectedCorrect]);

  return (
    <div>
      <button
        style={{ backgroundColor: backgroundColor }}
        className="keyboard-button"
        onClick={() => props.onClick(props.letter)}
      >
        {props.letter}
      </button>
    </div>
  );
};

export default Keyboard;
