const ServicoModel = require("../models/servicoModel");

class ServicoController{
    
    async servicoView(req, res){
        let servico = new ServicoModel();
        let lista = await servico.listarServico();
        res.render('servico/servicos', {lista: lista});
    }

    async cadastrar(req, resp){
        let msg = "";
        let cor = "";

        if(req.body.descricao != "" && req.body.valor != ""){
            let servico = new ServicoModel(0, req.body.descricao, req.body.valor);
            let result = await servico.cadastrarServicos();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Serviço cadastrado com sucesso!"
                });
            }else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar o serviço!"
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
            let servico = new ServicoModel();
            servico = await servico.buscar(req.params.id);
            
            if(servico != null){
                res.send({
                    ok: true,
                    servico: {
                        servicoId: servico.servicoId,
                        servicoDesc: servico.servicoDesc,
                        servicoValor: servico.servicoValor
                    }
                })
            }
            else{
                res.send({
                    ok: false,
                    msg: "Serviço não encontrado!"
                })
            }
        }
        else{
            res.send({
                ok: false,
                msg: "O ID do serviço é inválido!"
            })
        }
    }

    async alterar(req, resp) {
        if(req.body.id != "" && req.body.descricao != "" && req.body.valor != ""){
            
            let servico = new ServicoModel(req.body.id, req.body.descricao, req.body.valor);
            
            
            let result = await servico.cadastrarServicos();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Serviço alterado com sucesso!"
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar o serviço!"
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
            let servico = new ServicoModel();
            
            let result = await servico.excluir(req.body.id);

            if(result){
                resp.send({
                    ok: true,
                    msg: "Serviço excluído com sucesso!"
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao excluir o serviço!"
                });
            }
        } else {
            resp.send({
                ok: false,
                msg: "O ID do serviço não foi informado!"
            });
        }
    }
}
module.exports = ServicoController;