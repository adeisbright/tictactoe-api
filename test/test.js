const app = require("../src/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);

describe("TicTacToe Game Processes", () => {
    // describe("Create a new game player", () => {
    //     it("Should  create a game player", async () => {
    //         let player = {
    //             email: "example2@gmail.com",
    //             password: "123456789abcABC#",
    //         };

    //         let res = await chai.request(app).post("/players").send(player);
    //         res.should.have.status(200);
    //     });
    // });

    describe("Create a new game", () => {
        it("Should create a new game and return the game id", async () => {
            let data = {
                players: [
                    {
                        marker: "X",
                        id: "61585bc3dce87200e4a6ef5b",
                    },
                    {
                        marker: "O",
                        id: "61585c7448b3c32d9c93d657",
                    },
                ],
            };
            res = await chai.request(app).post("/tictactoe").send(data);
            res.should.have.status(200);
        });
    });

    describe("Add a move", () => {
        it("Should add a move to the board", async () => {
            let data = {
                gameId: "6158d40abbbd5a0d381cff8b",
                playerId: "61585bc3dce87200e4a6ef5b", //"61585bc3dce87200e4a6ef5b", //"61585c7448b3c32d9c93d657"
                coordinates: [2, 1],
            };
            res = await chai.request(app).put("/tictactoe/move").send(data);
            //res.body.should.be.a("object")
            res.should.have.status(200);
        });
    });
});
