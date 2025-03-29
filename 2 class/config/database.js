// connnecting to database
const mongoose =require('mongoose');
// npm init -y
// npm i express
// npm i mongoose
// npm i dotenv
// npm i nodemon --save-dev
// npm i cors


//step 1: install i mongoose --> npm i mongoose
//step 2: install dotenv for accessing environment variables --> npm i dotenv

// dotenv is a package that allows us to use environment variables
//example: process.env.PORT

require('dotenv').config();

const dbconnect = () => {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error("DATABASE_URL is not defined in the .env file");
        process.exit(1);
    }

    mongoose.connect(dbUrl)
    .then(() => { console.log("Database connected")})
    .catch((error) => { 
        console.log(error.message);
        console.log("Database connection failed");
        process.exit(1);
    });
}

module.exports = dbconnect;
