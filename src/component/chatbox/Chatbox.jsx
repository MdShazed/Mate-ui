import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import "./sass/chatbox.css";

// const ENDPOINT = "http://localhost:3000";
const ENDPOINT = "https://mate-server.onrender.com";
const socket = io(ENDPOINT);

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [mainMessage, setmainMessage] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [notification, setnotification] = useState();
  // console.log(mainMessage);
  const UserName = sessionStorage.getItem("name");

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", UserName, message);
    message.value == "";
  };

  useEffect(() => {
    socket.emit("join", UserName);

    socket.on("welcome", (message) => {
      setnotification(message);
    });

    socket.on("userJoined", (message) => {
      setnotification(message);
    });

    socket.on("userList", (users) => {
      console.log(users);
      setConnectedUsers(users);
    });

    const userLeftHandler = (message) => {
      setnotification(message);
    };

    socket.on("userLeft", userLeftHandler);

    return () => {
      socket.off("userLeft", userLeftHandler);
    };
  }, []);

  useEffect(() => {
    const sendMessageHandler = (UserName, messages, fullMessage) => {
      setmainMessage((prevMessages) => [...prevMessages, fullMessage]);
    };

    socket.on("sendMessage", sendMessageHandler);

    return () => {
      socket.off("sendMessage", sendMessageHandler);
    };
  }, []);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const chatInput = document.getElementById("chatInput");

    if (chatInput.value === "") {
      console.log("Enter your message");
    } else {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="main">
      {/* online users list */}
      <div className="online">
        <h1>Online</h1>
        <div className="users">
          <ul>
            {connectedUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* chatbox */}
      <ScrollToBottom className="chatbox">
        <h1>MATE</h1>
        <ScrollToBottom className="messages">
          {mainMessage.map((message, index) => (
            <div id="message" key={index}>
              {message}
            </div>
          ))}
          <span>{notification}</span>
        </ScrollToBottom>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            id="chatInput"
            onChange={handleInputChange}
            // onKeyPress={handleTyping}
            placeholder="Type your message..."
          />
          <button id="submit" onClick={send} type="submit">
            Send
          </button>
        </form>
      </ScrollToBottom>
    </div>
  );
};

export default ChatBox;
