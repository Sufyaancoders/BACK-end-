const express = require('express');
const router = express.Router();

//  const {imageUpload, videoUpload, imageReducerUpload} = require("../controller/fileupload");
// console.log('Controller type:', typeof localFileUpload);
 const { localFileUpload,videoUpload,imageUpload,imageReducerUpload } = require('../controller/fileupload');
 console.log('Controller type:', typeof localFileUpload);
 //api routes for file upload
// router.post("/image/upload", imageUpload);
// router.post("/video/upload", videoUpload);
// router.post("/image/reducer", imageReducerUpload);
// router.post("/local/upload", localFileUpload);
console.log(typeof localFileUpload);  // Should print "function"

router.post('/upload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageReducer', imageReducerUpload);
//module export karna hai
module.exports = router;