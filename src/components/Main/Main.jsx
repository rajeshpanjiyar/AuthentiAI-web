import "./Main.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const promptExamples = [
  "Can AuthentiBot help me identify counterfeit products?",
  "What accessibility features does AuthentiBot offer for users with disabilities?",
  "How does AuthentiBot integrate with product verification services?",
];

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted with value:" + inputValue);
    setInputValue("");
  };

  const handleVoiceInput = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        setInputValue(voiceInput);
        console.log("Voice input triggered with value:", voiceInput);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
      setIsListening(false);
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePromptExampleClick = (index) => {
    alert(`Prompt: ${promptExamples[index]}`);
  };

  return (
    <div className="main">
      <div className="main-upper">
        <div className="heading">Welcome to AuthentiAI</div>
        <div className="title">
          An AI Powered Product Authentication Assistant
        </div>
        <form onSubmit={handleSubmit} className="button-row">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="How can I verify my product ?"
            className="text-input"
          />
          <div className="voice-button-right">
            <div className="voice-button-container">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`voice-button ${isListening ? "listening" : ""}`}
              >
                {isListening ? (
                  <span style={{ color: "green" }}>
                    {isListening ? "..." : ""}
                    <i className="bx bx-microphone"></i>
                  </span>
                ) : (
                  <i className="bx bx-microphone"></i>
                )}
              </button>
            </div>
            <button type="submit" className="bx bx-send submit-button"></button>
          </div>
        </form>
        <div style={{ fontSize: "8px", color: "rgba(15, 15, 15, 0.41)" }}>
          We are still under a development phase and the information represented
          are not our personal views.
        </div>
      </div>
      <div className="prompt-section">
        <div>Prompt Examples</div>
        {promptExamples.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            onClick={() => handlePromptExampleClick(index)}
          >
            <div className="prompt-example">{item}</div>
          </Link>
        ))}
      </div>
      <div className="card-container">
        <div className="card">
          <div>
            <img src="star.svg" alt="Star Logo"/>
          </div>
          <div className="card-title">Authenticate, Assure, Acquire</div>
          <div className="card-content">
            AuthentiAI empowers users to confidently authenticate their
            products, assuring their quality and value before acquisition..
          </div>
        </div>
        <div className="card">
          <div>
            <img src="location.svg" alt="Location Logo" />
          </div>
          <div className="card-title">Genuine Products, Guaranteed</div>
          <div className="card-content">
            AuthentiAI's advanced AI technology guarantees accurate product
            verification, ensuring users only invest in genuine items.
          </div>
        </div>
        <div className="card">
          <div>
            <img src="trending.svg" alt="Trending Logo" />
          </div>
          <div className="card-title">Authenticity at Your Fingertips</div>
          <div className="card-content">
            AuthentiAI's convenient chatbot interface allows users to
            effortlessly verify product authenticity, providing peace of mind in
            just a few taps.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
