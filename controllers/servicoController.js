const ServicoModel = require("../models/servicoModel");

class ServicoController{
    
    async servicoView(req, res){
        let servico = new ServicoModel();
        let lista = await servico.listarServico();
        res.render('servico/servicos', {lista: lista});
    }

    async cadastrar(req, resp){
        if(req.body.descricao.trim() == "" || req.body.valor.trim() == ""){
            resp.send({
                ok: false,
                msg: "Preencha os campos em vermelho"
            });
            return;
        }
        if(parseFloat(req.body.valor.trim()) <= 0 && req.body.valor.trim() != ""){
            resp.send({
                ok: false,
                msg: "Valor deve ser maior que zero"
            });
            return;
        }
        try{
            let servicoModel = new ServicoModel();
            const servicoExistente = await servicoModel.buscarExistente(req.body.descricao.trim());

            if(servicoExistente) {
                resp.send({
                    ok: false,
                    msg: `O serviço "${servicoExistente.servicoDesc}" já está cadastrado.`
                });
                return;
            }

            let servico = new ServicoModel(0, req.body.descricao, req.body.valor);
            let result = await servico.cadastrarServicos();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Serviço cadastrado com sucesso!"
                });
            }else{
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar serviço"
                });
            }
        } catch(error){
            console.error("Erro inesperado no banco de dados:", error);
            resp.send({
                ok: false,
                msg: "Ocorreu um erro inesperado ao salvar. Tente novamente."
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
        const { id, descricao, valor } = req.body;

        if (!id || !descricao || descricao.trim() === "" || !valor || valor.trim() === "") {
            resp.send({
                ok: false,
                msg: "Preencha todos os campos para alterar!"
            });
            return;
        }

        if(parseFloat(valor.trim()) <= 0){
            resp.send({
                ok: false,
                msg: "Valor deve ser maior que zero"
            });
            return;
        }
        try{
            let servicoModel = new ServicoModel();
            const servicoExistente = await servicoModel.buscarExistente(descricao.trim());

            if(servicoExistente && servicoExistente.servicoId != id) {
                resp.send({
                    ok: false,
                    msg: `O serviço "${servicoExistente.servicoDesc}" já está cadastrado.`
                });
                return;
            }

            let servico = new ServicoModel(id, descricao.trim(), valor.trim());
            let result = await servico.cadastrarServicos();

            if(result){
                resp.send({
                    ok: true,
                    msg: "Serviço alterado com sucesso!"
                });
            }else{
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar o serviço!"
                });
            }
        } catch(error){
            console.error("Erro inesperado no banco de dados:", error);
            resp.send({
                ok: false,
                msg: "Ocorreu um erro inesperado ao salvar. Tente novamente."
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