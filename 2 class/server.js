const express = require('express');
const app = express();
 // install ---> npm i nodemon // => its a package that will automatically restart the server when we make changes to the code
 //you do not need to restart the server manually
// ---------------------------
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
//load config from env file


  require("dotenv").config();
  const PORT = process.env.PORT || 4000;
  //middleware to parse json data
    app.use(express.json());
    
    //import routes for todo API
    const todoRoutes = require('./routes/Todos');
    //add todo api routes
    app.use("/api/v1/todos", todoRoutes);

    //start server
    //listen --> The listen method in Express.js is used to start the server
    //  and make it listen for incoming connections on a specified port.
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
// coonnection to database
const dbconnect = require('./config/database');
dbconnect();

//  defaulr route
app.get('/', (req, res) => {
    res.send("Hello World");
});

//default route
app.get('/',(req,res)=>{
    res.send('<h1>hellow express</h1>');
})