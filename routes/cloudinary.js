const express = require("express");
const router = express.Router();


// controllers
const { upload, remove } = require("../controller/cloudinary");

router.post("/uploadimages", upload);
router.post("/removeimage", remove);

module.exports = router;
