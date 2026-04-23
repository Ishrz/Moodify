const express = require("express");

const router = express.Router();

//middlewares
const upload = require("../middlewares/upload.middleware.js");
const logger = require("../middlewares/logger.js");

//controllers
const { songUpload, getSong } = require("../controllers/songUpload.controller");

//http://localhost:4000/api/v1/song/
router.post("/", logger, upload.single("song"), songUpload);

router.get("/", logger, getSong);

module.exports = router;
