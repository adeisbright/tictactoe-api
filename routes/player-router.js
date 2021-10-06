const express = require("express");
const { createPlayer } = require("../handlers/player");
const playerRouter = express.Router();

playerRouter.post("/players", createPlayer);
module.exports = playerRouter;
