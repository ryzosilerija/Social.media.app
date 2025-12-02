import React, { useState } from "react";
import axios from "axios";

export default function AuthPage({ setUser }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    // Validation
    if (
      !password.trim() ||
      (mode === "login" && !email.trim()) ||
      (mode === "register" && (!username.trim() || !email.trim()))
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      if (mode === "register") {
        // REGISTER
        await axios.post("http://localhost:3001/api/auth/register", {
          username: username.trim(),
          email: email.trim(),
          password: password.trim(),
        });

        alert("Registered! Now login.");
        setUsername("");
        setEmail("");
        setPassword("");
        setMode("login");
      } else {
        // LOGIN
        const res = await axios.post("http://localhost:3001/api/auth/login", {
          email: email.trim(),
          password: password.trim(),
        });

        setUser(res.data.user); // Save logged-in user
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div
      style={{
        background: "black",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        gap: "20px",
      }}
    >
      <h1>{mode === "login" ? "Login" : "Register"}</h1>

      {mode === "register" && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button onClick={handleSubmit} style={buttonStyle}>
        {mode === "login" ? "Login" : "Register"}
      </button>

      <button
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError("");
        }}
        style={{ background: "none", color: "lightblue", border: "none" }}
      >
        {mode === "login"
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  width: "250px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#222",
  color: "white",
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  background: "teal",
  color: "white",
  cursor: "pointer",
};

