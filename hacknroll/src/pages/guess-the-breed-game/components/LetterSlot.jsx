import React from "react";

const LetterSlot = (props) => {
  return (
    <div
      style={{
        backgroundColor: "#D9D9D9",
        borderRadius: "20px",
        width: "96px",
        height: "130px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: "80px",
          fontFamily: "Bagel Fat One",
        }}
      >
        {props.letter}
      </p>
    </div>
  );
};

export default LetterSlot;
