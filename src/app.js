require("dotenv").config();
const { createServer } = require("http");
const path = require("path");
const express = require("express");
const mongoClient = require("../mongo-client");
const { errorParser } = require("../lib/error-handler");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const playerRouter = require("../routes/player-router.js");
const gameRouter = require("../routes/game-router.js");

const app = express();
const dirname = __dirname;
const port = process.env.Server_Port;

// Log request to a logging file
let accessLogStream = rfs.createStream("bigjara.log", {
    interval: "1d",
    path: path.join(__dirname, "log"),
});

// Custom format for morgan logging
function log(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "Content-Length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
    ].join(" ");
}

app.use(
    morgan("dev", {
        skip: function (req, res) {
            return res.statusCode < 400;
        },
    })
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", playerRouter);
app.use("/", gameRouter);
app.use(errorParser);

process.on("SIGINT", () => {
    mongoClient.close(() => {
        console.log("MongoDB has ended");
    });
    process.exit(0);
});

// Launch server and listen
createServer(app).listen(port, "localhost", () =>
    console.log("Your app is running")
);

module.exports = app;
