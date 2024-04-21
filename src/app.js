const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");

const { createServer } = require("http");
const { Server } = require("socket.io");

const server = express();
const cors = require("cors");
const invalidRoute = require("./middleware/invalidRoute");

//! socket.io --------------------------------------------------
const serverSocket = createServer(server);
const io = new Server(serverSocket, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    socket.on("newConnected", (data) => {
        socket.broadcast.emit("newConnected", data);
    });

    socket.on("send_message", (data) => {
        io.emit("send_message", data);
    });
});
//! ------------------------------------------------------------

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(router);
server.use(invalidRoute);

module.exports = serverSocket; // Exportar el servidor creado con createServer
