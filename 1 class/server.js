//step -1 create a folder
//step -2 ---> npm init -y
//step -3 ----> npm install express
//step -4 npm install nodemon  --> 
// package.json. file "scripts": {
//     "start": "node index.js",
//     "dev": "nodemon index.js"
//   },
// step -5 ----> create a file server.js)

const express = require('express');
const app = express();
//step -6 run on port 3000 (node server.js)
app.listen(3000, () => {
    console.log('server is running on port 3000'); // server is running on port 3000 declare in console
}
);
app.get('/', (req, res) => {
    res.send("Hello World");
        
    })
app.post('./api/car', (req, res) => {
    const {name, age} = req.body;
    console.log(name, age);
    res.send('data received');
})
// connect to database
//-----> npm install mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sufyaan',
//  {
// useNewUrlParser: true, useUnifiedTopology: true}
) // connsole is not show in webpage 
// promise added
.then(() => {
    console.log('connected to database');
})
.catch((err) => {
    console.log('error', err);
})