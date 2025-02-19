const express= require('express');
const router= express.Router();
//import common function
const {createTodo}= require('../controllers/createdTodo');
//define API routes and controllers ko  map karna ka liya
router.post('/createTodo', createTodo);
module.exports= router;