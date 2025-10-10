const express = require("express");
const AboutController = require("../controllers/aboutController");
const router = express.Router();
const aboutController = new AboutController();

router.get("/", aboutController.aboutView);

module.exports = router;