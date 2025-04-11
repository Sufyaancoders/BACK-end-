const File = require("../models/file");
//const cloudinary = require("../config/cloudinary");
// This line in your controller
const {cloudinary }= require("../config/cloudinary");
const cloudinaryConfig = require("../config/cloudinary");
exports.localFileUpload = async (req, res) => { 
    try {
        // Get the file from the request
        const uploadedFile = req.files.file;
        console.log("Uploaded file:", uploadedFile);
        
        // Check if a file was uploaded
        if (!uploadedFile) {
            return res.status(400).json({
                success: false,
                message: "Please upload a file",
            });
        }

        // Create file path and move file
        const filePath = `uploads/${Date.now()}-${uploadedFile.name}`;
        const absolutePath = require('path').join(__dirname, '..', filePath);
        await uploadedFile.mv(absolutePath);
        
        // Create a new file entry in the database
        const newFile = await File.create({
            fileName: uploadedFile.name,
            filePath: filePath,
            fileType: uploadedFile.mimetype,
            fileSize: uploadedFile.size
        });
        return res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: newFile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error uploading file",
        });
    }
}

 async function uploadToCloudinary(file, folder) {
 return await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: folder,
        resource_type: "auto",//  // Automatically detect if it's an image, video, etc.
    }, (error, result) => {
        if (error) {
            console.error("Cloudinary upload error:", error);
            throw error;
        }
        return result;
    }); 
}
// check in postment input the data in body on form-data  
exports.imageUpload = async (req, res) => {
    try {
        // Data fetch
        const {name, email, tags} = req.body;
        console.log("Request body:", req.body);

        // Get image file
        const image = req.files.imageFile;
        console.log("Image file:", image);
        
        // Check if an image was uploaded
        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }
        
        // Validate file format
        const supportedFormats = ['jpeg', 'png', 'jpg'];
        const fileExtension = image.name.split('.').pop().toLowerCase();
        
        if (!supportedFormats.includes(fileExtension)) {
            return res.status(400).json({
                success: false,
                message: "Unsupported image format",
            });
        }
        
        // If format is valid, upload to cloudinary
        // The second parameter "images" tells Cloudinary to store this file in a 
        // folder named "images" in your Cloudinary media library.
        const result = await uploadToCloudinary(image, "images");
        console.log("Cloudinary upload result:", result);
        
        // Create a new file entry in the database
        const newFile = await File.create({
            fileName: image.name,
            filePath: result.secure_url,
            fileType: image.mimetype,
            fileSize: image.size,
            public_id: result.public_id,
            secure_url: result.secure_url
        });
        
        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: newFile,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error uploading image",
            error: error.message
        });
    }
}

// This function uploads a video to Cloudinary and returns the result.


 const uploadVideoToCloudinary = async (file, folder) => {
    return await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: folder,
        resource_type: "video", // Specify that this is a video
    }, (error, result) => {
        if (error) {
            console.error("Cloudinary upload error:", error);
            throw error;
        }
        return result;
    }); 
}
exports.videoUpload = async (req, res) => {
    try {
        // Data fetch
        const {name, email, tags} = req.body;
        console.log("Request body:", req.body);

        // Get video file
        const video = req.files.videoFile;
        console.log("Video file:", video);
        
        // Check if a video was uploaded
        if (!video) {
            return res.status(400).json({
                success: false,
                message: "Please upload a video",
            });
        }
        

         // Check file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (video.size > maxSize) {
            return res.status(400).json({
                success: false,
                message: "Video size exceeds 5MB limit",
            });
        }

        // Validate file format
        const supportedFormats = ['mp4', 'avi', 'mov'];
        const fileExtension = video.name.split('.').pop().toLowerCase();
        
        if (!supportedFormats.includes(fileExtension)) {
            return res.status(400).json({
                success: false,
                message: "Unsupported video format",
            });
        }
        
        // If format is valid, upload to cloudinary
        const result = await uploadVideoToCloudinary(video, "videos");
        console.log("Cloudinary upload result:", result);
        
        // Create a new file entry in the database
        const newFile = await File.create({
            fileName: video.name,
            filePath: result.secure_url,
            fileType: video.mimetype,
            fileSize: video.size,
            public_id: result.public_id,
            secure_url: result.secure_url
        });
        
        return res.status(200).json({
            success: true,
            message: "Video uploaded successfully",
            data: newFile,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error uploading video",
            error: error.message
        });
    }
}

const uploadImageReducerToCloudinary = async (file, folder) => {
    return await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: folder,
        resource_type: "image", // Specify that this is an image
        transformation: [
            { width: 800, height: 600, crop: "limit" }, // Resize to max 800x600
            { quality: "auto" } // Auto quality
        ]
    }, (error, result) => {
        if (error) {
            console.error("Cloudinary upload error:", error);
            throw error;
        }
        return result;
    }); 
}
exports.imageReducerUpload = async (req, res) => {
    try {
        // Data fetch
        const {name, email, tags} = req.body;
        console.log("Request body:", req.body);

        // Get image file
        const image = req.files.imageFile;
        console.log("Image file:", image);
        
        // Check if an image was uploaded
        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }
        
        // Validate file format
        const supportedFormats = ['jpeg', 'png', 'jpg'];
        const fileExtension = image.name.split('.').pop().toLowerCase();
        
        if (!supportedFormats.includes(fileExtension)) {
            return res.status(400).json({
                success: false,
                message: "Unsupported image format",
            });
        }
        
        // If format is valid, upload to cloudinary with transformation
        const result = await uploadImageReducerToCloudinary(image, "images");
        console.log("Cloudinary upload result:", result);
        
        // Create a new file entry in the database
        const newFile = await File.create({
            fileName: image.name,
            filePath: result.secure_url,
            fileType: image.mimetype,
            fileSize: image.size,
            public_id: result.public_id,
            secure_url: result.secure_url
        });
        
        return res.status(200).json({
            success: true,
            message: "Image uploaded and resized successfully",
            data: newFile,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error uploading and resizing image",
            error: error.message
        });
    }
}