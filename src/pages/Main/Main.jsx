import "./Main.scss";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom";
import { message } from "antd";
import { BODY, REQUEST_BODY } from "./RequestBodyConfiguration";

const constructRequestBody = (prompt) => {
  const body = BODY;
  const message = { role: "user", content: prompt };
  body.messages[1] = message;
  return JSON.stringify(body);
};

const promptExamples = [
  "Can AuthentiBot help me identify counterfeit products?",
  "What accessibility features does AuthentiBot offer for users with disabilities?",
  "How does AuthentiBot integrate with product verification services?",
];

const chatReactElementArray = [];

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatting, setChatting] = useState(false);
  const [requestOptions, setRequestOptions] = useState(REQUEST_BODY);
  const myRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      myRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  });

  function addChatMessage(bot, message) {
    return new Promise(async function (resolve) {
      var tempChats = chats;
      tempChats.push({ isBot: bot, data: message }); // Add the new message to the chat array
      setChats(tempChats);

      var chatMessageElement = null;
      if (bot) {
        chatMessageElement = React.createElement(
          "div",
          { className: "chat-item-left" },
          React.createElement("i", { className: "bx bx-bot" }),
          React.createElement(
            "div",
            { className: "chat-section-left", ref: myRef },
            message
          )
        );
      } else {
        chatMessageElement = React.createElement(
          "div",
          { className: "chat-item-right" },
          React.createElement("img", {
            src: "profile.png",
            className: "user-chat-icon",
            alt: "User Profile",
          }),
          React.createElement(
            "div",
            { className: "chat-section-right" },
            message
          )
        );
      }

      chatReactElementArray.push(chatMessageElement);
      const X = React.createElement("div", {}, chatReactElementArray);
      ReactDOM.render(X, document.getElementById("chatContainer"));

      resolve();
    });
  }

  function fetchPromptReply() {
    return new Promise(async function (resolve) {
      addChatMessage(false, inputValue);
      var reply = "";
      await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          reply = data?.choices[0]?.message?.content;
        })
        .catch((err) => {
          reply = "Please try again later!";
          message.error("Ran out of tokens for today! Try tomorrow!");
        });
      addChatMessage(true, reply);
      resolve();
    });
  }

  function configureRequestBody() {
    return new Promise(function (resolve) {
      const temp = requestOptions;
      temp.body = constructRequestBody(inputValue);
      setRequestOptions(temp);
      resolve();
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatting(true);
    setInputValue("");

    configureRequestBody().then(async function () {
      return await fetchPromptReply();
    });
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
    setInputValue(promptExamples[index]);
    setChatting(true);
  };

  return (
    <div className={!chatting ? "main" : ""}>
      {chatting && <div id="chatContainer" className="chat-container"></div>}

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

        <div className="disclaimer">
          We are still under a development phase and the information represented
          are not our personal views.
        </div>
      </div>
      {!chatting && (
        <div className="prompt-section">
          <div className="prompt-examples-title"
          >Prompt Examples</div>
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
