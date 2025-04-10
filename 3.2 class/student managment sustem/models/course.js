const mongoes=require('mongoose');

const courseSchema=new mongoes.Schema({
    name: {
        type: String,
        required: [true, "Course name is required"],
        trim: true,
        unique: true, // Ensures unique course names

      },
      branch: {
        type: String,
        required: [true, "Branch is required"],
        trim: true,
      },
      HOD: {
        type: String,
        required: [true, "HOD name is required"],
        trim: true,
      },
    
});

module.exports=mongoes.model("Course", courseSchema);
