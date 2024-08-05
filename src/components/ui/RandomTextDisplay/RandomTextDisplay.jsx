import React, { useEffect, useState } from "react";

export default function RandomTextDisplay({ texts, interval = 5000 }) {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const getRandomText = () => {
      const randomIndex = Math.floor(Math.random() * texts.length);
      return texts[randomIndex];
    };

    setCurrentText(getRandomText());

    const intervalId = setInterval(() => {
      setCurrentText(getRandomText());
    }, interval);

    return () => clearInterval(intervalId);
  }, [texts, interval]);
  return (
    <div className="mb-4 flex items-center justify-center">
      <p className=" font-medium text-default-400">{currentText}</p>
    </div>
  );
}
