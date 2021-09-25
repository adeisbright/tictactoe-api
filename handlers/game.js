const mongoClient = require("../mongo-client");
const signToken = require("../lib/sign-jwt-token");
const jwtHeader = require("../lib/jwt-header");
const {
    ApplicationError,
    BadRequestError,
    NotAuthorizeError,
    NotFoundError,
    DbError,
} = require("../lib/error-handler");
const areAllNumbers = require("../lib/all-numbers");
const isCoordinateUnique = require("../lib/unique-coordinates-checker");
let ObjectId = require("mongodb").ObjectId;

class Game {
    createGame = async (req, res, next) => {
        try {
            let { players } = req.body;
            let db = await mongoClient.db(process.env.dbName);
            let playerCollection = db.collection("players");
            let gameCollection = db.collection("games");

            let bsonifyPlayers = players.map((player) => {
                return {
                    marker: player.marker,
                    id: ObjectId(player.id),
                };
            });

            //Verify that all players are registered members
            players.map(async (player) => {
                let { id } = player;
                let isMember = await playerCollection.find({
                    _id: id,
                });

                if (!isMember) {
                    return next(new NotFoundError("User not found"));
                }
            });

            // Create a new game
            let doc = await gameCollection.insertOne({
                players: bsonifyPlayers,
            });

            if (!doc.insertedCount) {
                return next(new DbError("Unable to create new game"));
            }

            res.status(200).json({
                data: {
                    status: "OK",
                    id: doc.insertedId,
                },
            });
        } catch (error) {
            return next(new ApplicationError(error.message));
        }
    };

    makeMove = async (req, res, next) => {
        try {
            let { playerId, gameId, coordinates } = req.body;

            let db = await mongoClient.db(process.env.dbName);
            let gameCollection = db.collection("games");

            // Check that the player has access to play this game
            let isValidGame = await gameCollection.findOne(
                {
                    _id: ObjectId(gameId),
                },
                {
                    "players.id": ObjectId(playerId),
                }
            );
            if (!isValidGame) {
                return next(new NotFoundError("Not found"));
            }

            //Retrieve the players and the moves made for this game
            let { players, moves } = isValidGame;

            let currentPlayer = players.find(
                (player) => String(player.id) === String(playerId)
            );

            //Retrieve all already played cells
            // Retrieve all moves already played by the current player
            let cells, currentPlayerMoves;
            if (moves) {
                cells = moves.map((elem) => elem.move);

                currentPlayerMoves = moves
                    .filter((move) => move.marker === currentPlayer.marker)
                    .map((cell) => cell.move);
            }

            //Check if the right player made the move
            let expectedMove = moves
                ? moves.length % 2 === 0
                    ? "X"
                    : "O"
                : "X";
            if (!(currentPlayer.marker === expectedMove)) {
                return next(new BadRequestError("Invalid player move"));
            }

            //Check if the values in the cordinates are valid
            if (!areAllNumbers(coordinates)) {
                return next(
                    new BadRequestError("Invalid coodinate numbers provided")
                );
            }

            //Check if the coordinates are unique and not a repeat of already existing coordinates
            if (moves) {
                let hasPlayedCell = isCoordinateUnique(coordinates, cells);
                if (hasPlayedCell) {
                    return next(new BadRequestError("Moves already played"));
                }
            }

            //Check if game has reached end
            //Check for a win situation

            // Insert this move
            let doc = await gameCollection.findOneAndUpdate(
                {
                    _id: ObjectId(gameId),
                },
                {
                    $push: {
                        moves: {
                            marker: currentPlayer.marker,
                            move: coordinates,
                        },
                    },
                }
            );

            // Return the state of the game
            res.status(200).json({
                data: {
                    status: "OK",
                },
            });
        } catch (error) {
            return next(new ApplicationError(error.message));
        }
    };
}

module.exports = new Game();
