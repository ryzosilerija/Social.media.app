import React, { useState } from "react";
import "./App.css";
import AuthPage from "./AuthPage";
import ChatPage from "./ChatPage";

function App() {
  const [user, setUser] = useState(null);

  // Show login/register FIRST
  if (!user) {
    return <AuthPage setUser={setUser} />;
  }

  // After login → show your chat UI
  return <ChatPage user={user} />;
}

export default App;

