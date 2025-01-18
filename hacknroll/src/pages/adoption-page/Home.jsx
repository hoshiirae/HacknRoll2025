import React, { useState, useEffect } from "react";
import axios from "axios";
import AdoptionProfile from "./components/AdoptionProfile";
import "./home.css";

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const breedName = "Abyssinian";

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
