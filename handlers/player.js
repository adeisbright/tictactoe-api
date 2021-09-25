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
const validatePassword = require("../lib/password-validator");
const bcryptjs = require("bcryptjs");
const validateEmail = require("../lib/validate-email");

class Player {
    createPlayer = async (req, res, next) => {
        try {
            let { email, password } = req.body;
            if (!validateEmail(email) || !validatePassword(password)) {
                return next(new BadRequestError("Fill form correctly"));
            }
            let db = await mongoClient.db(process.env.dbName);
            let playerCollection = db.collection("players");
            let isMember = await playerCollection.findOne({
                email: email.toLowerCase(),
            });

            if (isMember) {
                return next(new BadRequestError("A user already exist"));
            }

            //Create an index on the player collection
            let [index, hashPassword] = await Promise.all([
                playerCollection.createIndex({ email: 1 }),
                bcryptjs.hash(password, 10),
            ]);
            //add the user
            let player = await playerCollection.insertOne({
                email: email.toLowerCase(),
                password: hashPassword,
            });

            if (!player.insertedCount) {
                return next(new DbError("Unable to save the player"));
            }
            res.status(200).json({
                data: {
                    email: email,
                    status: "OK",
                    id: 1,
                },
            });
        } catch (error) {
            return next(new ApplicationError(error.message));
        }
    };
}

module.exports = new Player();
