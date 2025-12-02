import './App.css';
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => setChat((prev) => [...prev, msg]));
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("message", message);
    setChat((prev) => [...prev, message]);

    setMessage("");
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          marginBottom: "100px",
        }}
      >
        <button id="button1">Home</button>
        <button id="button2">Profile</button>
        <button id="button3">Friends</button>
      </div>

      <div id="text">Chat with Jeffly Epstei</div>

      {/* BLUE CHAT BOX */}
      <div
        style={{
          backgroundColor: "#1a2e2eff",
          width: "40vw",
          height: "60vh",
          borderRadius: "15px",
          border: "1px solid lightblue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >

        {/* CHAT MESSAGES */}
        <div
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingLeft:  "10px",
          }}
        >
          {chat.map((msg, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#264040",
                color: "white",
                padding: "8px 12px",
                borderRadius: "10px",
                alignSelf: "flex-start",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg}
            </div>
          ))}
        </div>

        {/* INPUT + SEND BUTTON */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="type a text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "500px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid lightblue",
              backgroundColor: "#556565ff",
              color: "white",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            ➤
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;

