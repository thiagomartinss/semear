const express = require("express");
const MarcaController = require("../controllers/marcaController");
const router = express.Router();
const marcaController = new MarcaController();

router.get("/", marcaController.marcaView);

module.exports = router;