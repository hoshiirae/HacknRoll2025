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
      <img className="adoption-profile-image" src={props.photo}></img>
      <p className="adoption-profile-name">{props.name}</p>
      <div className="adoption-profile-info-container">
        <div className="adoption-profile-info-age">{props.age}</div>
        <div className="adoption-profile-info-size">{props.size}</div>
        <div className="adoption-profile-info-gender">{props.gender}</div>
      </div>
      <button></button>
    </div>
  );
};

export default AdoptionProfile;
