import React from "react";
import "../home.css";
import clsx from "clsx";

const McqOptions = (props) => {
  return (
    <div
      className={clsx(
        "compatability-quiz-mcq-question-container",
        props.isSelected && "selected"
      )}
      onClick={() => props.onClick(props.question)}
    >
      <div className="compatability-quiz-mcq-question-number-container">
        <span className="compatability-quiz-mcq-question-number">
          {props.questionNo}
        </span>
      </div>

      <span className="compatability-quiz-mcq-question">{props.question}</span>
    </div>
  );
};

export default McqOptions;
