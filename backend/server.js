require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const { Server } = require("socket.io");
const http = require("http");

require("./config/passport");

const authRoutes = require("./routes/authRoutes");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// Socket Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const Room = require("./models/Room");

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("get-rooms", () => {
    socket.emit("rooms-list", rooms);
  });

  socket.on("create-room", () => {
    const roomId = Math.random().toString(36).substring(2, 9);
    const newRoom = {
      id: roomId,
      name: `Room ${rooms.length + 1}`,
      participants: 1,
    };

    rooms.push(newRoom);
    io.emit("rooms-list", rooms);
    socket.emit("room-created", roomId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// MongoDB + Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));