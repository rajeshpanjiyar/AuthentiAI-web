import React, { useState, useRef, useEffect } from "react";
import * as ReactDOM from "react-dom";
import moment from "moment";
import "./ChatHistory.scss";
import Axios from "axios";
import {message} from 'antd';

var chatData = [];
var chatReactElementArray = [];
const ChatHistory = () => {
  const [chatsOn, setChatsOn] = useState(false);
  const myRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      myRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    window.onload = fetchAllChats;
  });

  function addChatMessage(bot, message) {
    return new Promise(async function (resolve) {
      var chatMessageElement = null;
      if (bot) {
        chatMessageElement = React.createElement(
          "div",
          { className: "chat-item-left" },
          React.createElement("i", { className: "bx bx-bot chat-bot" }),
          React.createElement(
            "div",
            { className: "chat-section-left", ref: myRef },
            message
          )
        );
      } else {
        // eslint-disable-next-line no-unused-vars
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

  const fetchAllChats = async () => {
    chatReactElementArray = [];
    const id = "12345";
    await Axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/get-all-chats/${id}`
    )
      .then((response) => {
        console.log(response);
        chatData = response.data[0].chats;
        chatReactElementArray = [];
        for (let i = 0; i < chatData.length; i++) {
          if (chatData[i].bot || chatData[i].user) {
            addChatMessage(false, chatData[i].user.message);
            addChatMessage(true, chatData[i].bot.message);
          }
        }
        setChatsOn(true);
      })
      .catch((error) => {
        if(!chatsOn){
          message.info("Chat history is empty.")
        }
        console.error(error);
      });
  };

  const deleteAllChats = async () => {
    const id = "12345";
    await Axios.delete(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/delete-all-chats/${id}`
    )
      .then((response) => {
        console.log(response);
        chatData = [];
        chatReactElementArray = [];
        const X = React.createElement("div", {}, chatReactElementArray);
        ReactDOM.render(X, document.getElementById("chatContainer"));
        setChatsOn(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="chat-history-page">
      {!chatsOn && (
        <div className = "chat-history-button-page">
          <button className = "chat-history-button" onClick={fetchAllChats}>Get All Chats</button>
        </div>
      )}
        <div className={chatsOn?"history-chat-container":""} id="chatContainer"></div>
      {chatsOn && (
          <button className = "delete-chat" onClick={deleteAllChats}>Delete All Chats</button>
      )}
    </div>
  );
};

export default ChatHistory;
