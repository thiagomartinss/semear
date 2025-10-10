const express = require("express");
const ContactController = require("../controllers/contactController");
const router = express.Router();
const contactController = new ContactController();

router.get("/", contactController.contactView);

module.exports = router;