const express = require("express");
const MarcaController = require("../controllers/marcaController");
const router = express.Router();
const marcaController = new MarcaController();

router.get("/", marcaController.marcaView);
router.post("/cadastrar", marcaController.cadastrar);
//router.get("/alterar/:id", marcaController.alterar);

module.exports = router;