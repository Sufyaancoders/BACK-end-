const todo = require('../models/todo');

//define routes handlers for the application
exports.createTodo = async (req, res) => {
    try {
        const { tittle, description } = req.body; // yaha sa data fetch kiya.
        //create means insert into database
        const response = await todo.create({ tittle, description }); // yaha inscert kiya
      //.json({ ... }): This sends a JSON response. The object inside
      //  the parentheses is converted to a JSON string and sent to the client.
        res.status(200).json({
            success: true,
            data: response,
            message: "todo created successfully"
        });
    } catch (error) {
        console.log(error);
        console.error("error in creating todo");
        res.status(500).json({
            success: false,
            message: "error in creating todo"
        });
    }
}