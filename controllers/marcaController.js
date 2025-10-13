const MarcaModel = require("../models/marcaModel");

class MarcaController{
    
    async marcaView(req, res){
        let marca = new MarcaModel();
        let lista = await marca.listarMarcas();
        res.render('marca/listarMarca', {lista: lista});
    }

    async cadastrar(req, resp){
        let msg = "";
        let cor = "";

        if(req.body.descricao != ""){
            let marca = new MarcaModel(0, req.body.descricao);
            let result = await marca.cadastrarMarcas();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Marca cadastrada com sucesso!"
                });
            }else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar a marca!"
                });
            }
        }else{
            resp.send({
                ok: false,
                msg: "Preencha o campo!"
            });
        }
    }
}
module.exports = MarcaController;