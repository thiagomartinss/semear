const express=require("express");
const PessoaController=require("../controllers/pessoaController");
const router=express.Router();
const pessoaController= new PessoaController();

router.get("/",pessoaController.pessoaView);


module.exports = router;