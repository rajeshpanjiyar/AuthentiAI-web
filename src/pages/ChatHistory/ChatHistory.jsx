import React, {useState, useRef, useEffect} from 'react';
import * as ReactDOM from "react-dom";
import moment from "moment";
import './ChatHistory.scss';
import Axios from "axios";

var chatReactElementArray = [];
const ChatHistory = () => {
  const [chatData, setChatData] = useState([]);
  const myRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      myRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  });

  function addChatMessage(bot, message) {
    return new Promise(async function (resolve) {
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
  
  const fetchAllChats = async() => {
    chatReactElementArray = [];
    const id = '12345';
    await Axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/get-all-chats/${id}`)
      .then(response => {
        console.log(response);
        setChatData(response.data[0].chats);
        for(let i = 0; i < chatData.length; i++){
          if(chatData[i].bot || chatData[i].user){ 
          addChatMessage(false, chatData[i].user.message);
          addChatMessage(true, chatData[i].bot.message);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const deleteAllChats = async() => {
    alert("The chat deleted successfully!")
  }

  return (
    <div className="chat-history-page">
      <button onClick={fetchAllChats}>Get All Chats</button>
      <button onClick={deleteAllChats}>Delete Chats</button>
      <div className="chat-container" id = "chatContainer">
        {/* {chatData.map((chat, index) => (
          (chat.user || chat.bot) && <div className="chat" key={index}>
            <div className="user-message">{chat.user.message}</div>
            <div className="bot-message">{chat.bot.message}</div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ChatHistory;
