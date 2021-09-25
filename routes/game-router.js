const express = require("express");
const { createGame, makeMove } = require("../handlers/game");
const gameRouter = express.Router();

gameRouter.post("/tictactoe", createGame);
gameRouter.put("/tictactoe/move", makeMove);

module.exports = gameRouter;
