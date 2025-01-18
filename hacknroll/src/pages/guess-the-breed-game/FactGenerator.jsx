import { useEffect } from 'react';
import { useCatContext } from './CatContext';

const FactGenerator = ({ setFacts }) => {

  const breed = useCatContext()

  const SYSTEM_PROMPT = `You are an assistant that receives a cat's breed based on user input 
    and provides 10 short facts about that cat breed. Ensure the following:
    - Each fact must not exceed 20 words.
    - Do not mention the breed name or describe the breed's appearance.
    - The response must be a valid JSON array of strings, formatted like this:
    [
      "Fact 1.",
      "Fact 2.",
      ...
    ]
    No additional text outside the JSON structure is allowed.`;

  const fetchFact = async () => {
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
              content: `${SYSTEM_PROMPT}\n\nGenerate 10 facts about a ${breed} without mentioning the breed name.`,
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

      setFacts(QnResponse); // Pass the transformed questions to setQns

    } catch (error) {
      console.error("Error fetching cat questions:", error);
    }
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return null; // Assuming this is a utility component without UI
};

export default FactGenerator;