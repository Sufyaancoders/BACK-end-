const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connection established");
    })
    .catch((err) => {
        console.log("Connection Issues with Database");
        process.exit(1);
    });
};