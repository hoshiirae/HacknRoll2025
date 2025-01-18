import React from "react";

const Keyboard = (props) => {
  return (
    <div>
      <button
        style={{
          backgroundColor: "#d9d9d9",
          borderRadius: "14px",
          border: "none",
          width: "50px",
          height: "50px",
          fontSize: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.letter}
      </button>
    </div>
  );
};

export default Keyboard;
