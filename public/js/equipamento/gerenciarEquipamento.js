document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);
    document.getElementById("btnAlterar").addEventListener("click", alterar);
    document.getElementById("btnConfirmarExclusao").addEventListener("click", excluir);

    const botoesAlteracao = document.querySelectorAll(".btnAlteracao");

    botoesAlteracao.forEach(function(botao){
        botao.addEventListener("click", function(){
            const equipamentoId = this.getAttribute("data-id");

            fetch(`/equipamento/buscar/${equipamentoId}`)
            .then(response => response.json())
            .then(data => {
                if(data.ok && data.equipamento){
                    document.getElementById("idEquipamentoAlt").value = data.equipamento.equipamentoId;
                    document.getElementById("descricaoEquipamentoAlt").value = data.equipamento.equipamentoNome;
                    document.getElementById("marcaEquipamentoAlt").value = data.equipamento.marcaId;
                } else {
                    alert(data.msg || "Erro ao buscar os dados do equipamento.");
                }
            })
            .catch(error => {
                console.error("Erro na requisição fetch:", error);
                alert("Não foi possível carregar os dados para edição.");
            });
        });
    });

    const botoesExclusao = document.querySelectorAll(".btnExclusao");
    botoesExclusao.forEach(function(botao){
        botao.addEventListener("click", function(){
            const id = this.getAttribute("data-id");
            const nome = this.getAttribute("data-nome");

            document.getElementById("codigoExclusao").innerText = id;
            document.getElementById("nomeExclusao").innerText = nome;
            document.getElementById("idEquipamentoExcluir").value = id;
        });
    });

    function limparValidacao(){
        document.getElementById("descricaoEquipamento").style["border-color"] = "#ced4da";
        document.getElementById("marcaEquipamento").style["border-color"] = "#ced4da";
        document.getElementById("descricaoEquipamentoAlt").style["border-color"] = "#ced4da";
        document.getElementById("marcaEquipamentoAlt").style["border-color"] = "#ced4da";
    }

    function cadastrar(){
        limparValidacao();
        let descricao = document.querySelector("#descricaoEquipamento").value;
        let marcaId = document.querySelector("#marcaEquipamento").value;

        let listaErros = [];
        if(descricao === "")
            listaErros.push("descricaoEquipamento");
        if(marcaId === "")
            listaErros.push("marcaEquipamento");
        
        if(listaErros.length == 0){
            let dados = {
                descricao: descricao,
                marcaId: marcaId
            };
            fetch("/equipamento/cadastrar", {
                method: 'POST',
                body: JSON.stringify(dados),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r => r.json())
            .then(r => {
                if(r.ok) {
                    window.location.href="/equipamento";
                } else {
                    alert(r.msg);
                }
            })
        }else{
            // Validação visual
            if(listaErros.includes("descricaoEquipamento"))
                document.getElementById("descricaoEquipamento").style["border-color"] = "red";
            if(listaErros.includes("marcaEquipamento"))
                document.getElementById("marcaEquipamento").style["border-color"] = "red";
            
            alert("Preencha todos os campos!");
        }
    }

    function alterar() {
        limparValidacao();
        
        let id = document.querySelector("#idEquipamentoAlt").value;
        let descricao = document.querySelector("#descricaoEquipamentoAlt").value;
        let marcaId = document.querySelector("#marcaEquipamentoAlt").value;

        let listaErros = [];
        if(descricao === "")
            listaErros.push("descricaoEquipamentoAlt");
        if(marcaId === "")
            listaErros.push("marcaEquipamentoAlt");
        
        if(listaErros.length === 0){
            let equipamento = {
                id: id,
                descricao: descricao,
                marcaId: marcaId
            };

            fetch("/equipamento/alterar", {
                method: 'POST',
                body: JSON.stringify(equipamento),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r => r.json())
            .then(r => {
                if(r.ok) {
                    window.location.href = "/equipamento";
                } else {
                    alert(r.msg);
                }
            });
        } else {
            alert("Preencha todos os campos para alterar!");
        }
    }

    function excluir() {
        const idParaExcluir = document.getElementById("idEquipamentoExcluir").value;

        if(idParaExcluir) {
            fetch('/equipamento/excluir', {
                method: 'POST',
                body: JSON.stringify({ id: idParaExcluir }),
                headers: { "Content-Type": "application/json" }
            })
            .then(r => r.json())
            .then(r => {
                if(r.ok) {
                    window.location.reload();
                } else {
                    alert(r.msg);
                }
            });
        } else {
            alert("ID do equipamento não encontrado para exclusão.");
        }
    }
});