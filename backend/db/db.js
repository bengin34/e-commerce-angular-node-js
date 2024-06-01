const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()

const uri = process.env.MONGODB_URI

const connection = () => {
  mongoose
    .connect(uri)
    .then(() => console.log("mongodb is conntected"))
    .catch((err) => console.log(`mongodb connection error: ${err}`));
};

module.exports = connection;
