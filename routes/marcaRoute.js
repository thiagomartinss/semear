const express = require("express");
const MarcaController = require("../controllers/marcaController");
const router = express.Router();
const marcaController = new MarcaController();

router.get("/", marcaController.marcaView);
router.post("/cadastrar", marcaController.cadastrar);
router.get("/buscar/:id", marcaController.buscar);
router.post("/alterar", marcaController.alterar);
router.post("/excluir", marcaController.excluir);

module.exports = router;