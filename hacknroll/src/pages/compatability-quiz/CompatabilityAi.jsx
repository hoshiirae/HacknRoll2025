import { useEffect } from 'react';
import CatBreeds from './components/CatBreeds';
import { useQuiz } from "./QuizContext";

const CompatabilityAi = ({ getBreed }) => {

    const { quizState } = useQuiz();
    const catBreed = CatBreeds()

    console.log(catBreed)

    const SYSTEM_PROMPT = `You are an assistant that matches quiz answers to a list of cat breeds to find the perfect match based on personality and preferences:
        1. Use the provided "quizState" (answers to personality and preference questions) to determine the best match.
        2. Use the provided "catBreed" (list of available cat breeds) for the matching process.
        3. Match the breed by analyzing the traits and preferences described in "quizState".
        4. Return ONLY the name of the breed in JSON format as a one-word response. Do not include any explanation or additional text.
        5. Example response:
        {
            "breed" : "Ragdoll"
        }
        6. If no perfect match is found, select the closest match from the catBreed array.
        7. You MUST NOT return breeds that are outside of the provided catBreed array.

        Data for Matching:
        - quizState: ${JSON.stringify(quizState, null, 2)}
        - catBreed: ${JSON.stringify(catBreed)}
            
        Find the best match.`;

  const fetchQn = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/anthropic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          messages: [
            {
              role: "user",
              content: `${SYSTEM_PROMPT}\n\n Find me my perfect cat breed.`,
            },
          ],
          max_tokens: 300,
          temperature: 0.0,
        }),
      });

      if (!response.ok) {
        throw new Error(`Proxy server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API response:", data);

      // Extract the text from the response
      const content = data?.content?.[0]?.text; // Navigate the response structure safely
      if (!content) {
        throw new Error("No content found in the API response.");
      }

      const QnResponse = JSON.parse(content); // Parse the text as JSON
      console.log("Received Questions (raw):", QnResponse);

      const breedName = QnResponse.breed; // Access the breed property
      console.log("Extracted Breed:", breedName);

      getBreed(breedName);
      sessionStorage.setItem("breed", breedName)

    } catch (error) {
      console.error("Error fetching cat questions:", error);
    }
  };

  useEffect(() => {
    fetchQn();
  }, []);

};

export default CompatabilityAi;