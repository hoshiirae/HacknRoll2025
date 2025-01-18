import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../style/keyboard.css";

const CatImage = (props) => {
  const [catImages, setCatImages] = useState([]);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);
  const fetchRandomImageWithValidBreed = async () => {
    try {
      let validImage = null;
      while (!validImage) {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search",
          {
            headers: {
              "x-api-key":
                "live_1dGn39Za0kTpk8JY6T5TfJVzCFUYDEQ74Kpb62UdTD1WWlreJMV64qtsZCX2KOem",
            },
            params: {
              limit: 1,
              has_breeds: 1,
            },
          }
        );

        const image = response.data[0];
        if (image && image.breeds && image.breeds.length > 0) {
          const breed = image.breeds[0];
          if (breed.name.length > 0 && breed.name.length < 8) {
            validImage = image;
            console.log("Valid Breed Name:", breed.name.toLowerCase());
          } else {
            console.log("Invalid breed name. Retrying...");
          }
        } else {
          console.log("No valid breed information found. Retrying...");
        }
      }

      setCatImages([validImage]);
      props.setWord(validImage.breeds[0].name.toLowerCase());
      props.setLoading(false);
    } catch (err) {
      console.error("Error fetching cat image:", err.message);
      setError("Failed to fetch valid cat image. Please try again.");
      props.setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      // Only fetch if it hasn't been fetched yet
      fetchRandomImageWithValidBreed();
      hasFetched.current = true;
    }
  }, []);

  if (props.loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return catImages.length > 0 ? (
    <img
      className="guess-the-breed-home-body-left-content-image"
      src={catImages[0].url}
      alt={catImages[0].breeds[0]?.name || "Guess the breed"} // Accessibility improvement
    />
  ) : (
    <p>No image available</p>
  );
};

export default CatImage;
