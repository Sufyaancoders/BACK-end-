const dotenv = require('dotenv');
dotenv.config();

// In config/cloudinary.js
const cloudinary = require('cloudinary');

exports.cloudinaryconnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("Cloudinary Connection established");
  } catch (error) {
    console.log("Cloudinary Connection Issues");
    console.error(error);
  }
};

// Export the configured cloudinary instance
module.exports.cloudinary = cloudinary;