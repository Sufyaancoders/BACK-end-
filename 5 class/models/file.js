const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    });
    module.exports = mongoose.model("File", fileSchema);