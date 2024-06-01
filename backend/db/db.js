const mongoose = require("mongoose");

const uri =
  "mongodb+srv://becaglar3434:0I2Zg8vE5ZsB5jbF@e-commerce.7femxwv.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce";

const connection = () => {
  mongoose
    .connect(uri)
    .then(() => console.log("mongodb is conntected"))
    .catch((err) => console.log(`mongodb connection error: ${err}`));
};

module.exports = connection;
