import { useState, useEffect } from "react";

function useTypingEffect(text, typingSpeed = 50, trigger = true) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!trigger) return;
    setTypedText("");

    let charIndex = -1;
    const typeInterval = setInterval(() => {
      if (charIndex < text.length - 1) {
        charIndex++; // Increment before accessing the string
        setTypedText((prev) => prev + text[charIndex]);
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed); // Typing speed in milliseconds

    return () => clearInterval(typeInterval);
  }, [text, typingSpeed, trigger]);

  return typedText;
}

export default useTypingEffect;
