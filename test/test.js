const app = require("../src/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("TicTacToe Game Processes", () => {
    describe("Create a new game player", () => {
        it("Should  create a game player", async () => {
            let player = {
                email: "example@gmail.com",
                password: "123456789abcABC#",
            };

            let res = await chai.request(app).post("/players").send(player);
            res.should.have.status(200);
        });
    });

    describe("Create a new game", () => {
        it("Should create a new game and return the game id", async () => {
            let data = {
                players: [
                    {
                        marker: "X",
                        id: "614e14add9074d1e402ccd5b",
                    },
                    {
                        marker: "O",
                        id: "614e414f64d82006502fff24",
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
                gameId: "614e4916ae12ee33fc9d0dec",
                playerId: "614e14add9074d1e402ccd5b", //"614e14add9074d1e402ccd5b", //"614e414f64d82006502fff24"
                coordinates: [1, 1],
            };
            res = await chai.request(app).put("/tictactoe/move").send(data);
            //res.body.should.be.a("object")
            res.should.have.status(200);
        });
    });
});
