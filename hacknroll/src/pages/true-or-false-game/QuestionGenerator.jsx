import { useEffect } from 'react';

const QuestionGenerator = ({ setQns }) => {
  const SYSTEM_PROMPT = `You are an assistant creating true/false cat facts questions:
    - Each question is <=30 words
    - Provide answers as "True" or "False"
    - Output only a JSON array: 
    [
      "Question", "True", "Reason its True"
      "Question", "False", "Reason its False"
      ...
    ].`;

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
              content: `${SYSTEM_PROMPT}\n\nGenerate 5 true/false questions about cats- in JSON format.`,
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

      const formattedQuestions = [];
      for (let i = 0; i < QnResponse.length; i += 3) {
        formattedQuestions.push([QnResponse[i], QnResponse[i + 1], QnResponse[i + 2]]);
      }
      console.log("Transformed Questions:", formattedQuestions);

      setQns(formattedQuestions); // Pass the transformed questions to setQns
    } catch (error) {
      console.error("Error fetching cat questions:", error);
    }
  };

  useEffect(() => {
    fetchQn();
  }, []);

  return null; // Assuming this is a utility component without UI
};

export default QuestionGenerator;