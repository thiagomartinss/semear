const MarcaModel = require("../models/marcaModel");

class MarcaController{
    
    async marcaView(req, res){
        let marca = new MarcaModel();
        let lista = await marca.listarMarcas();
        res.render('marca/marcas', {lista: lista});
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

    async buscar(req, res){
        if(req.params.id != undefined){
            let marca = new MarcaModel();
            marca = await marca.buscar(req.params.id);
            
            if(marca != null){
                res.send({
                    ok: true,
                    marca: {
                        marcaId: marca.marcaId,
                        marcaNome: marca.marcaNome
                    }
                })
            }
            else{
                res.send({
                    ok: false,
                    msg: "Marca não encontrada!"
                })
            }
        }
        else{
            res.send({
                ok: false,
                msg: "O ID da marca é inválido!"
            })
        }
    }

    async alterar(req, resp) {
        if(req.body.id != "" && req.body.descricao != ""){
            
            let marca = new MarcaModel(req.body.id, req.body.descricao);
            
            
            let result = await marca.cadastrarMarcas();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Marca alterada com sucesso!"
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar a marca!"
                });
            }
        } else {
            resp.send({
                ok: false,
                msg: "Dados inválidos para alteração!"
            });
        }
    }

    async excluir(req, resp) {
        if(req.body.id != null){
            let marca = new MarcaModel();
            // Chama o novo método no modelo
            let result = await marca.excluir(req.body.id);

            if(result){
                resp.send({
                    ok: true,
                    msg: "Marca excluída com sucesso!"
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao excluir a marca!"
                });
            }
        } else {
            resp.send({
                ok: false,
                msg: "O ID da marca não foi informado!"
            });
        }
    }
}
module.exports = MarcaController;