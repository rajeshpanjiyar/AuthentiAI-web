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
  const [chatting, setChatting] = useState(false);
  const [chats, setChats] = useState([
    "Hello",
    "Hi, How can I help you today?",
    "I want to learn about an AI",
    "AI stands for Artificial Intelligence. It refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. AI systems are designed to perform tasks that typically require human intelligence, such as problem-solving, pattern recognition, decision-making, and natural language processing. There are different types of AI, ranging from narrow or weak AI to general or strong AI: Narrow or Weak AI: This type of AI is designed for specific tasks and has a limited scope." ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatting(true);
    setInputValue("");

    //TODO: Remove when our product is furnished with real data
    const arr = chats;
    arr[0] = inputValue;
    setChats(arr);
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
    setChatting(true);
    
    //TODO: Remove when our product is furnished with real data
    const arr = chats;
    arr[0] = promptExamples[index];
    setChats(arr);
  };

  return (
    <div className={!chatting ? "main" : ""}>
      {chatting && (
        <div className="chat-container">
          {chats.map((item, index) => (
            <div
              className={index % 2 === 0 ? "chat-item-right" : "chat-item-left"}
            >
              {index % 2 === 0 ? (
                <img
                  src="profile.png"
                  class="user-chat-icon"
                  alt="User Profile"
                />
              ) : (
                <i className="bx bx-bot"></i>
              )}
              <div
                className={
                  index % 2 === 0 ? "chat-section-right" : "chat-section-left"
                }
                key={index}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        {!chatting && (
          <div className="title-section">
            <div className="heading">Welcome to AuthentiAI</div>
            <div className="title">
              Your AI Powered Product Authentication Assistant
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="button-row"
          style={{ width: chatting ? "72vw" : "" }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="How can I verify my product ?"
            className="text-input"
            style={{ width: chatting ? "63vw" : "" }}
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

        <div
          className="disclaimer"
        >
          We are still under a development phase and the information represented
          are not our personal views.
        </div>
      </div>
      {!chatting && (
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
      )}
      {!chatting && (
        <div className="card-container">
          <div className="card">
            <div>
              <img src="star.svg" alt="Star Logo" />
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
              effortlessly verify product authenticity, providing peace of mind
              in just a few taps.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
