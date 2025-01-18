import React from "react";
import "../style/adoptionProfile.css";
/* key={animal.id} // Unique key for each animal
            name={animal.name}
            age={animal.age}
            gender={animal.gender}
            url={animal.url}
            photo={animal.photos.length > 0 ? animal.photos[0].medium : null}*/
const AdoptionProfile = (props) => {
  return (
    <div className="adoption-profile-indiv-container">
      <div className="adoption-profile-image-container">
        <img className="adoption-profile-image" src={props.photo}></img>
      </div>
      <div className="adoption-profile-name-container">
        <p className="adoption-profile-name">{props.name}</p>
      </div>

      <div className="adoption-profile-info-container">
        <div className="adoption-profile-info-age">
          <p>Age</p>
          {props.age}
        </div>
        <div className="adoption-profile-info-size">
          <p>Size</p>
          {props.size}
        </div>
        <div className="adoption-profile-info-gender">
          <p>Gender</p>
          {props.gender}
        </div>
      </div>
      <button
        className="adoption-profile-button"
        onClick={() => window.open(props.url, "_blank")}
      >
        Adopt me!
      </button>
    </div>
  );
};

export default AdoptionProfile;
