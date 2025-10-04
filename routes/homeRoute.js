const express = require("express");
const HomeController = require("../controllers/homeController");
const router = express.Router();
const homeController = new HomeController();

router.get("/", homeController.homeView);

module.exports = router;