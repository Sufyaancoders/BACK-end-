const express = require('express');
const router = express.Router();

// Define your routes
 const { localFileUpload,videoUpload,imageUpload,imageReducerUpload } = require('../controller/fileupload');
// router.post("/upload", uploadController.localFileUpload);
router.post('/upload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageReducer', imageReducerUpload);
//module export karna hai
module.exports = router;
// Make sure to export the router
// module.exports = router;