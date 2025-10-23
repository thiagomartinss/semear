document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);
    document.getElementById("btnAlterar").addEventListener("click", alterar);
    document.getElementById("btnExcluir").addEventListener("click", excluir);

    const botoesAlteracao = document.querySelectorAll(".btnAlteracao");
    let msgSservico = document.querySelector("#msg-servico");

    // Adiciona um evento de clique para cada um deles
    botoesAlteracao.forEach(function(botao){
        botao.addEventListener("click", function(){
            // Pega o ID que está no atributo 'data-id' do botão clicado
            const servicoId = this.getAttribute("data-id");

            // Usa o fetch para buscar os dados da marca no backend
            fetch(`/servico/buscar/${servicoId}`)
            .then(response => response.json())
            .then(data => {
                if(data.ok && data.servico){
                    // Preenche os campos do modal com os dados recebidos do servidor
                    document.getElementById("idServicoAlt").value = data.servico.servicoId;
                    document.getElementById("descricaoServicoAlt").value = data.servico.servicoDesc;
                    document.getElementById("valorServicoAlt").value = data.servico.servicoValor;
                } else {
                    alert(data.msg || "Erro ao buscar os dados do serviço.");
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
            document.getElementById("idServicoExcluir").value = id;
        });
    });

    function limparValidacao(){
        document.getElementById("descricaoServico").style["border-color"] = "#ced4da";
        document.getElementById("valorServico").style["border-color"] = "#ced4da";
        msgSservico.textContent = "";
    }

    function cadastrar(){
        limparValidacao();
        let servico = document.querySelector("#descricaoServico").value;
        let servicoValor = document.querySelector("#valorServico").value;

        let listaErros = [];
        if(servico == "")
            listaErros.push("descricaoServico");
        if(servicoValor == "")
            listaErros.push("valorServico");
        
        if(listaErros.length == 0){
            let desc = {
                descricao: servico,
                valor: servicoValor
            }
            fetch("/servico/cadastrar", {
                method: 'POST',
                body: JSON.stringify(desc),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok) {
                    window.location.href="/servico";
                }   
                else {
                    msgSservico.innerHTML = r.msg;
                }
            })
        }else{
            if(listaErros.includes("descricaoServico")){
                document.getElementById("descricaoServico").style["border-color"] = "red";
                msgSservico.textContent = "Informe a descrição do serviço";
            }else if(listaErros.includes("valorServico")){
                document.getElementById("valorServico").style["border-color"] = "red";
                msgSservico.textContent = "Informe o valor do serviço!";
            }
        }
    }

    function alterar() {
        limparValidacao();
        
        let id = document.querySelector("#idServicoAlt").value;
        let descricao = document.querySelector("#descricaoServicoAlt").value;
        let valor = document.querySelector("#valorServicoAlt").value;

        let listaErros = [];
        if(descricao === "") {
            listaErros.push("descricaoServicoAlt");
        }
        if(valor === ""){
            listaErros.push("alorServicoAlt");
        }
        
        if(listaErros.length === 0){
            let servico = {
                id: id,
                descricao: descricao,
                valor: valor
            };

            fetch("/servico/alterar", { 
                method: 'POST', 
                body: JSON.stringify(servico),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r => r.json())
            .then(r => {
                if(r.ok) {
                    window.location.href = "/servico";
                } else {
                    alert(r.msg);
                }
            });
        } else {
             if(listaErros.includes("descricaoServico")){
                document.getElementById("descricaoServico").style["border-color"] = "red";
                alert("Informe a descrição do serviço");
            }else if(listaErros.includes("valorServico")){
                document.getElementById("valorServico").style["border-color"] = "red";
                alert("Informe o valor do serviço");
            }
        }
    }

    function excluir() {
        const idParaExcluir = document.getElementById("idServicoExcluir").value;

        if(idParaExcluir) {
            fetch('/servico/excluir', {
                method: 'POST',
                body: JSON.stringify({ id: idParaExcluir }),
                headers: { "Content-Type": "application/json" }
            })
            .then(r => r.json())
            .then(r => {
                if(r.ok) {
                    // Recarrega a página para mostrar a lista atualizada
                    window.location.reload();
                } else {
                    alert(r.msg);
                }
            });
        } else {
            alert("ID do serviço não encontrado para exclusão.");
        }
    }
})