//1 --->//  app create karna hai 
const express = require('express');
const app = express();


// 2 -->port set karna hai
const PORT = process.env.PORT || 3000;
// dotenv ko use karna hai
require("dotenv").config();


//3--->middleware use karna hai
app.use(express.json());
const fileUpload = require("express-fileupload");
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
// express json middleware ko use karna hai


//db se connect karna hai
const db = require("./config/database");
db.connect();
// cloudinary se connect karna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryconnect();



// routes import karna hai
// const upload = require("./routes/fileUpload");
const upload = require("./routers/prepost");
// api routes ko mount karna hai
app.use("/api/v1", upload);


//activate karna hai
app.listen(PORT, () => {
    console.log("Server Run at ", PORT);
}   )
// home route create karna hai  
app.get("/", (req, res) => {
    res.send("<h1>Auth App</h1>")
})
