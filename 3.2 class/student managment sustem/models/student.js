const mongoose = require('mongoose');
const studentSchema = mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Student name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      },//regex
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\d{10}$/, "Phone number must be 10 digits"],
      },
      courseName: {
        type: String,
        ref: "Course",
        required: [true, "Course is required"],
      },
    });
    // Add compound index for unique student names within a course

// Validate courseName before saving student
studentSchema.pre("save", async function(next) {
    try {
        // Check if course exists
        console.log("pointer is here");
        const course = await mongoose.model("Course").findOne({ name: this.courseName });
        if (!course) {
            throw new Error(`Invalid course name: ${this.courseName}`);
        }
        next();
    } catch (error) {
        next(error);
    }
}
// studentSchema.pre('save', async function(next) {
//   try {
//       const course = await mongoose.model('Course').findOne({ name: this.courseName });
//       if (!course) {
//           throw new Error(`Course "${this.courseName}" does not exist`);
//       }
//       next();
//   } catch (error) {
//       next(error);
//   }
// });
);

    module.exports = mongoose.model("student", studentSchema);

