const EquipamentoModel=require("../models/equipamentoModel");

class OrdemServicoController{
    async ordemView(req,res){
        let equipamento=new EquipamentoModel();
        const listaEquipamentos= await equipamento.listarEquipamentosParaOrdem();

        res.render('ordemServico/ordemServico',{listaEquipamentos:listaEquipamentos});
    }
}
module.exports=OrdemServicoController;