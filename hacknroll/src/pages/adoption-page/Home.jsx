import React, { useState, useEffect } from "react";
import axios from "axios";
import AdoptionProfile from "./components/AdoptionProfile";
import "./home.css";
import useTypingEffect from "../../components/TypingEffect";

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const breedName = "Abyssinian";
  const [startAdoption, setStartAdoption] = useState(false);

  const fullInstruction = useTypingEffect(
    `Congratulations on proving your cat care skills! You've shown that you have what it takes to provide love and care for our feline friends. 🌟

    Here, you'll find adorable cats looking for their forever homes. Take your time to learn about each one and make a choice that will change both your life and theirs. ❤️🐾`,
    35
  );
  const fetchBreedDetails = async () => {
    try {
      setLoading(true);

      // Step 1: Get Access Token
      const tokenResponse = await axios.post(
        "https://api.petfinder.com/v2/oauth2/token",
        {
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_PETFINDER_API_KEY,
          client_secret: import.meta.env.VITE_PETFINDER_SECRET_API,
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Step 2: Fetch Animals by Breed
      const animalsResponse = await axios.get(
        `https://api.petfinder.com/v2/animals?type=cat&breed=${breedName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setAnimals(animalsResponse.data.animals);
    } catch (err) {
      setError("Failed to fetch breed details.");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (breedName) {
      fetchBreedDetails();
    }
  }, [breedName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log(animals);
  return (
    <div className="adoption-page">
      {!startAdoption && (
        <div className="adoption-beginning-message-overlay">
          <div className="adoption-beginning-message">
            <h1>Welcome to the Cat Adoption Page!</h1>
            <p>{fullInstruction}</p>
            <button
              className="adoption-beginning-button"
              onClick={() => setStartAdoption(true)}
            >
              Start
            </button>
          </div>
        </div>
      )}
      <div className="adoption-page-top-container">
        {" "}
        <h1 className="adoption-page-title">{breedName}</h1>
      </div>
      <div className="adoption-page-profile-main-container">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <AdoptionProfile
              key={animal.id} // Unique key for each animal
              name={animal.name}
              age={animal.age}
              gender={animal.gender}
              url={animal.url}
              size={animal.size}
              photo={animal.photos.length > 0 ? animal.photos[0].medium : null}
            />
          ))
        ) : (
          <p>No animals available for this breed right now.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
