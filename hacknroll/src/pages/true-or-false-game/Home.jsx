import React from "react";
import blackCat from "../../images/mainCat.png";
import trueCat from "../../images/cat-true-paw.png";
import falseCat from "../../images/cat-false-paw.png";
import "./home.css";

const Home = () => {
  return (
    <div className="true-or-false-game-page">
      <div className="true-or-false-top-container">
        <p>
          The Cat's Tale <br /> Fact or Fiction?
        </p>
      </div>
      <div className="true-or-false-body-container">
        <div className="true-or-false-left-truecat-container">
          <p>True</p>
          <img src={trueCat}></img>
        </div>
        <div className="true-or-false-middle-blackcat-container">
          <div className="true-or-false-blackcat-wrapper">
            <img className="true-or-false-middle-blackcat" src={blackCat}></img>
            <p>
              meow meow meow meow meow meow meow meow meow meow meow meow meow
              meow
            </p>
            <button>Next</button>
          </div>
        </div>

        <div className="true-or-false-right-truecat-container">
          <p>False</p>
          <img src={falseCat}></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
