const { MongoClient } = require("mongodb");
let environment = process.env.NODE_ENV || "dev";
const uri = environment === "dev" ? process.env.LocalDB : process.env.RemoteDB;

const options = {
    connectTimeoutMS: 15000,
    useUnifiedTopology: true,
    keepAliveInitialDelay: 5e6,
    maxPoolSize: 15,
    socketTimeoutMS: 5000,
};
const client = new MongoClient(uri, options);
(async () => await client.connect())();

module.exports = client;
