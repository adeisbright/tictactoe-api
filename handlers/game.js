const mongoClient = require("../mongo-client");
const {
    ApplicationError,
    BadRequestError,
    NotAuthorizeError,
    NotFoundError,
    DbError,
} = require("../lib/error-handler");
const isValidMove = require("../lib/is-valid-move");
const isCoordinatePlayed = require("../lib/unique-coordinates-checker");
const findWinner = require("../lib/check-game-winner");
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

            // Check that this game exist for this player
            let game = await gameCollection.findOne(
                {
                    _id: ObjectId(gameId),
                },
                {
                    "players.id": ObjectId(playerId),
                }
            );
            if (!game) {
                return next(new NotFoundError("Game Not found "));
            }
            if (game.isOver) {
                return next(new BadRequestError("Game Over"));
            }
            //Retrieve the players and the moves made for this game
            let { players, moves } = game;

            let currentPlayer = players.find(
                (player) => String(player.id) === String(playerId)
            );

            //Retrieve all already played cells and
            //retrieve the moves of the current player
            let cells, currentPlayerMoves;
            if (moves) {
                //Each move forms a cell
                cells = moves.map((elem) => elem.cell);
                currentPlayerMoves = moves
                    .filter((move) => move.marker === currentPlayer.marker)
                    .map((val) => val.cell);
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
            if (!isValidMove(coordinates)) {
                return next(
                    new BadRequestError("Invalid coodinate numbers provided")
                );
            }

            //Check if the coordinates are unique and not a repeat
            //of already existing coordinates
            if (moves) {
                let hasPlayedCell = isCoordinatePlayed(coordinates, cells);
                if (hasPlayedCell) {
                    return next(new BadRequestError("Moves already played"));
                }
            }

            //Check for a win or draw
            let status = findWinner(
                currentPlayerMoves,
                coordinates,
                expectedMove
            );

            let cellObj = {
                marker: expectedMove,
                cell: coordinates,
            };

            if (typeof status === "string") {
                let message = status.startsWith("d")
                    ? "Ended in a tie"
                    : `Won by ${expectedMove}`;
                let doc = await gameCollection.findOneAndUpdate(
                    {
                        _id: ObjectId(gameId),
                    },
                    {
                        $push: {
                            moves: {
                                marker: currentPlayer.marker,
                                cell: coordinates,
                            },
                        },
                        $set: {
                            isOver: true,
                            remark: message,
                        },
                    }
                );
                if (!doc.ok) {
                    return next(
                        new ApplicationError("Unable to update the records")
                    );
                }

                return res.json({
                    message: message,
                    moves: moves
                        ? doc.value.moves.concat([cellObj])
                        : moves.concat(cellObj),
                });
            }
            // Update the db since game is still ongoing
            let doc = await gameCollection.findOneAndUpdate(
                {
                    _id: ObjectId(gameId),
                },
                {
                    $push: {
                        moves: {
                            marker: currentPlayer.marker,
                            cell: coordinates,
                        },
                    },
                }
            );
            if (!doc) {
                return next(
                    new ApplicationError("Unable to update the records")
                );
            }

            res.status(200).json({
                data: {
                    status: "OK",
                    moves: moves
                        ? doc.value.moves.concat([cellObj])
                        : [cellObj],
                },
            });
        } catch (error) {
            return next(new ApplicationError(error.message));
        }
    };
}

module.exports = new Game();
