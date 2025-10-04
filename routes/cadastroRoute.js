const express = require("express");
const CadastroController = require("../controllers/cadastroController");
//const HomeController = require("../controllers/homeController");
const router = express.Router();

let ctrl = new CadastroController();
//let homeController = new HomeController();

router.get("/", ctrl.cadastroView);
//router.get("/", homeController.homeView);

module.exports = router;