const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("message", () => {
    io.emit("sendMessage");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


server.listen(3001, () => {
  console.log("Server is listening at port 3001");
})