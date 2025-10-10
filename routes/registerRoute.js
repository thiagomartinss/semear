const express = require("express");
const RegisterController = require("../controllers/registerController");
const router = express.Router();
const registerController = new RegisterController();

router.get("/", registerController.registerView);

module.exports = router;