import React, { useState, useRef, useEffect } from "react";
import * as ReactDOM from "react-dom";
import moment from "moment";
import "./ChatHistory.scss";
import Axios from "axios";
import { Button, Modal, Spin, message } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/Firebase/firebase";

var chatData = [];
var chatReactElementArray = [];
const ChatHistory = () => {
  const [chatsOn, setChatsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const myRef = useRef(null);
  const [user] = useAuthState(auth);

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
      }

      chatReactElementArray.push(chatMessageElement);
      const X = React.createElement("div", {}, chatReactElementArray);
      ReactDOM.render(X, document.getElementById("historyChatContainer"));
      resolve();
    });
  }

  const fetchAllChats = async () => {
    setLoading(true);
    chatReactElementArray = [];
    const id = user?.uid;
    await Axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/get-all-chats/${id}`
    )
      .then((response) => {
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
        if (!chatsOn) {
          message.info("Chat history is empty.");
        }
        console.error(error);
      });
    setLoading(false);
  };

  const deleteAllChats = async () => {
    const id = user?.uid;
    await Axios.delete(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/delete-all-chats/${id}`
    )
      .then((response) => {
        chatData = [];
        chatReactElementArray = [];
        const X = React.createElement("div", {}, chatReactElementArray);
        ReactDOM.render(X, document.getElementById("historyChatContainer"));
        setChatsOn(false);
        message.success("Chats deleted!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="chat-history-page">
      {!chatsOn && (
        <div
          className="chat-history-button-page"
          style={{ minHeight: chatsOn ? "85vh" : "89vh" }}
        >
          <button className="chat-history-button" onClick={fetchAllChats}>
            {loading ? <Spin /> : "Get your all chats"}
          </button>
        </div>
      )}
      <div
        className={chatsOn ? "history-chat-container" : ""}
        id="historyChatContainer"
      ></div>
      {chatsOn && (
        <button className="delete-chat" onClick={() => setModalOpen(true)}>
          Delete your all chats
        </button>
      )}
      <Modal
        title="Confirmation"
        centered
        open={modalOpen}
        width={400}
        cancelText="Cancel"
        okText="Delete"
        onOk={() => {
          setModalOpen(false);
          deleteAllChats();
        }}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key="back"
            className="delete-chat-cancel"
            onClick={() => setModalOpen(false)}
          >
            cancel
          </Button>,
          <Button
            key="submit"
            className="delete-chat-confirm"
            onClick={() => {
              setModalOpen(false);
              deleteAllChats();
            }}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Delete the chat?</p>
      </Modal>
    </div>
  );
};

export default ChatHistory;
