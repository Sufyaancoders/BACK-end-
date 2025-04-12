const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const multer = require('multer');
const express = require('express');
require("dotenv").config();

const app = express();
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

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
    email: {
        type: String,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

// pre post middleware for logging
fileSchema.post("save", function (doc) {
    try {
        console.log("File saved:", doc.fileName);
        let transport = nodemailer.createTransport({
            host: process.env.HOST, // Specifies the SMTP server hostname
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        // Check if email exists before sending
        if (!doc.email) {
            console.log("No email available for notification");
            return; // Exit the function if no email
        }

        // Send email notification
        let mailOptions = {
            from: process.env.EMAIL || 'notification@example.com', // Use your configured email
            to: doc.email,
            subject: "File Upload Notification",
            text: `A new file has been uploaded: ${doc.fileName}`,
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
    } catch (error) {
        console.error("Error saving file:", error);
    }
});

app.post('/your-endpoint', upload.single('imageFile'), async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Image file:', req.file);

        // Extract email from the request body
        const { email, name, tags } = req.body;

        if (!email) {
            console.log('No email available for notification');
            return res.status(400).json({ error: 'Email is required for sending notifications' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'images'
        });
        console.log('Cloudinary upload result:', result);

        // Save file locally if needed
        console.log('File saved:', req.file.originalname);

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your image has been uploaded',
            html: `
                <h1>Hello ${name}!</h1>
                <p>Your image has been successfully uploaded.</p>
                <p>You can view it here: <a href="${result.secure_url}">${result.secure_url}</a></p>
                <p>Tags: ${tags}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({
            message: 'File uploaded and email sent successfully',
            imageUrl: result.secure_url
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = mongoose.model("File", fileSchema);