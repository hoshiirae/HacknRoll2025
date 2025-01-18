import React from "react";
import "../style/keyboard.css";

const Keyboard = (props) => {
  let backgroundColor = "d9d9d9d";
  if (props.isSelectedCorrect !== null) {
    backgroundColor = props.isSelectedCorrect ? "green" : "red";
  }
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
