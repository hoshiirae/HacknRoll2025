import React, { useEffect, useState } from "react";
import axios from "axios";

const CatBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);

  const fetchBreeds = async () => {
    try {
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

      // Step 2: Fetch Breeds
      const breedsResponse = await axios.get(
        "https://api.petfinder.com/v2/types/cat/breeds",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBreeds(breedsResponse.data.breeds);
    } catch (err) {
      setError("Failed to fetch cat breeds.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Cat Breeds</h1>
      <ul>
        {breeds.map((breed) => (
          <li key={breed.name}>{breed.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CatBreeds;
