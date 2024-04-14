const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const server = express();
const cors = require("cors");
const invalidRoute = require("./middleware/invalidRoute");

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(router);
server.use(invalidRoute);

module.exports = server;
