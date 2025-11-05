const express= require("express");
const  OrdemServicoController=require("../controllers//ordemservicoController");
const router = express.Router();
const ordemservicoController=new OrdemServicoController();

router.get("/",ordemservicoController.ordemView);

module.exports=router;