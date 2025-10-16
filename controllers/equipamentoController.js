const EquipamentoModel = require("../models/equipamentoModel");
const MarcaModel = require("../models/marcaModel");

class EquipamentoController{
    
    async equipamentoView(req, res){
        let equipamento = new EquipamentoModel();
        const listaEquipamentos = await equipamento.listarEquipamentos();
        
        let marca = new MarcaModel();
        const listaMarcas = await marca.listarMarcas();

        res.render('equipamento/equipamentos', { listaEquipamentos: listaEquipamentos, listaMarcas: listaMarcas });
    }

    async cadastrar(req, resp){
        if(req.body.descricao != "" && req.body.marcaId != "") {
            let equipamento = new EquipamentoModel(0, req.body.descricao, req.body.marcaId);
            let result = await equipamento.cadastrarEquipamento();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Equipamento cadastrado com sucesso!"
                });
            }else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar o equipamento!"
                });
            }
        }else{
            resp.send({
                ok: false,
                msg: "Preencha todos os campos!"
            });
        }
    }

    async buscar(req, res){
        if(req.params.id != undefined){
            let equipamento = new EquipamentoModel();
            equipamento = await equipamento.buscar(req.params.id);
            
            if(equipamento != null){
                res.send({
                    ok: true,
                    equipamento: {
                        equipamentoId: equipamento.equipamentoId,
                        equipamentoNome: equipamento.equipamentoNome,
                        marcaId: equipamento.marcaId
                    }
                })
            }
            else{
                res.send({
                    ok: false,
                    msg: "Equipamento não encontrado!"
                })
            }
        }
        else{
            res.send({
                ok: false,
                msg: "O ID do equipamento é inválido!"
            })
        }
    }

    async alterar(req, resp) {
        if(req.body.id != "" && req.body.descricao != "" && req.body.marcaId != ""){
            
            let equipamento = new EquipamentoModel(req.body.id, req.body.descricao, req.body.marcaId);
            let result = await equipamento.cadastrarEquipamento();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Equipamento alterado com sucesso!"
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar o equipamento!"
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
            let equipamento = new EquipamentoModel();
            let result = await equipamento.excluir(req.body.id);

            if(result){
                resp.send({
                    ok: true,
                    msg: "Equipamento excluído com sucesso!"
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao excluir o equipamento!"
                });
            }
        } else {
            resp.send({
                ok: false,
                msg: "O ID do equipamento não foi informado!"
            });
        }
    }
}
module.exports = EquipamentoController;