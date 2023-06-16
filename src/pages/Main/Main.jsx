import "./Main.scss";
import React, { useState, useRef, useEffect, Fragment} from "react";
import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom";
import { message, Spin } from "antd";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { BODY, REQUEST_BODY } from "./RequestBodyConfiguration";
import { systemMessage } from "./systemMessage";
import { useSharedVariables } from "../../components/ShareableStates/ShareableState";
import CameraModal from "../../components/CameraModal/CameraModal";
import { auth } from "../utility/Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const constructRequestBody = (prompt) => {
  const body = BODY;
  // const message = { role: "user", content: prompt };
  body.messages = prompt;
  return JSON.stringify(body);
};

const promptExamples = [
  "Can AuthentiBot help me identify counterfeit products?",
  "What accessibility features does AuthentiBot offer for users with disabilities?",
  "How does AuthentiBot integrate with product verification services?",
];

const chatReactElementArray = [];
const chatLog = [systemMessage];
var currentRR = { user: "", bot: "" };

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [chats, setChats] = useState([]);
  const { chatting, setChatting, setOpen } = useSharedVariables();
  const [requestOptions, setRequestOptions] = useState(REQUEST_BODY);
  const myRef = useRef(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setTimeout(() => {
      myRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  });

  function addChatMessage(bot, message) {

    return new Promise(async function (resolve) {
      var tempChats = chats;
      const chatElement = {
        user: { message: "", timestamp: "" },
        bot: { message: "", timestamp: "" },
      };
      var chatMessageElement = null;
      var lastIndex = tempChats.length - 1;

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
        const lastInd = chatReactElementArray.length - 1;
        chatReactElementArray[lastInd] = chatMessageElement;
        const X = React.createElement("div", {}, chatReactElementArray);
        ReactDOM.render(X, document.getElementById("chatContainer"));

        tempChats[lastIndex].bot = {
          message: message,
          timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
      } else {
        chatMessageElement = React.createElement(
          "div",
          { className: "chat-item-right" },
          React.createElement("img", {
            src: `${user && user.photoURL}`,
            className: "user-chat-icon",
            alt: "User Profile",
          }),
          React.createElement(
            "div",
            { className: "chat-section-right" },
            message
          )
        );

        const tempChatMessageElement = React.createElement(
          "div",
          { className: "chat-item-left" },
          React.createElement("i", { className: "bx bx-bot" }),
          React.createElement(
            "div",
            { className: "chat-section-left", ref: myRef },
            "Typing.."
          )
        );

        chatReactElementArray.push(chatMessageElement);
        chatReactElementArray.push(tempChatMessageElement );
        const X = React.createElement("div", {}, chatReactElementArray);
        ReactDOM.render(X, document.getElementById("chatContainer"));

        tempChats.push(chatElement);
        lastIndex = tempChats.length - 1;
        tempChats[lastIndex].user = {
          message: message,
          timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
      }
      currentRR = tempChats[lastIndex];
      setChats(tempChats);
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
          chatLog.push({ role: "assistant", content: reply });
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
      chatLog.push({ role: "user", content: inputValue });
      temp.body = constructRequestBody(chatLog);
      setRequestOptions(temp);
      resolve();
    });
  }

  async function storeChats() {
    const postData = {
      user_id: user?.uid,
      chats: currentRR,
    };

    await Axios.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/chathistory`,
      postData
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatting(true);
    setInputValue("");
    configureRequestBody()
      .then(async function () {
        return await fetchPromptReply();
      })
      .then(async function () {
        //TODO: resolve: last chats(user, bot) is not getting pushed in +1 step, also delete dummy empty entry done at initial index
        await storeChats();
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
    <Fragment>
    <div className={!chatting ? "main" : ""}>
      {chatting && <div id="chatContainer" className="chat-container"></div>}
      <CameraModal />
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
          <div className="webcam-button" onClick={() => setOpen(true)}>
            Webcam
          </div>
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
          <div className="prompt-examples-title">Prompt Examples</div>
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
    </Fragment>
  );
};

export default Main;
