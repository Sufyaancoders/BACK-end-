const mongoose= require("mongoose");
//schema : it is a blueprint of the database and discription of the data is stored
const todoSchema= new mongoose.Schema(
    {
        tittle: {
            type:String,
            require:true,
            nextLength:50,
        },
        description:{
            type:String,
            require:true,
            maxLength:50,
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now(),
        },
        
            updateAt:{
                type:Date,
                require:true,
                default:Date.now(),
            }
        }
    
);
module.exports= mongoose.model("Todo", todoSchema);