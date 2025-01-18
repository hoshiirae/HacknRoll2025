import { useEffect } from 'react';

const QuizGenerator = ({ setQns }) => {
  const SYSTEM_PROMPT = `You are an assistant creating MCQ questions based on cat care:
    - Each question and answer is <=30 words.
    - Output only a JSON array: 
    [
      "Question", "Ans 1", "Ans 2", "Ans 3", "correct option"
      ...
    ].`;

  const fetchQuizQn = async () => {
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
              content: `${SYSTEM_PROMPT}\n\nGenerate 5 mcq questions about cat care in JSON format.`,
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

      setQns(QnResponse); // Pass the transformed questions to setQns
    } catch (error) {
      console.error("Error fetching cat questions:", error);
    }
  };

  useEffect(() => {
    fetchQuizQn();
  }, []);

  return null; // Assuming this is a utility component without UI
};

export default QuizGenerator;