import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// ------------------------
// Middleware
// ------------------------
app.use(cors({
  origin: "*",   // Accept requests from any frontend port
  credentials: true
}));
app.use(express.json());

// ------------------------
// Routes
// ------------------------
app.use("/api/auth", authRoutes);

// ------------------------
// MongoDB connection
// ------------------------
mongoose.connect("mongodb://localhost:27017/socialapp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------------
// Server + Socket.IO
// ------------------------
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Allow WebSocket connections from any origin
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    // Broadcast message to all other clients
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// ------------------------
// Start server
// ------------------------
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
