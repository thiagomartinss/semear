document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);
    document.getElementById("btnAlterar").addEventListener("click", alterar);
    document.getElementById("btnExcluir").addEventListener("click", excluir);

    const botoesAlteracao = document.querySelectorAll(".btnAlteracao");

    // Adiciona um evento de clique para cada um deles
    botoesAlteracao.forEach(function(botao){
        botao.addEventListener("click", function(){
            // Pega o ID que está no atributo 'data-id' do botão clicado
            const marcaId = this.getAttribute("data-id");

            // Usa o fetch para buscar os dados da marca no backend
            fetch(`/marca/buscar/${marcaId}`)
            .then(response => response.json())
            .then(data => {
                if(data.ok && data.marca){
                    // Preenche os campos do modal com os dados recebidos do servidor
                    document.getElementById("idMarcaAlt").value = data.marca.marcaId;
                    document.getElementById("descricaoMarcaAlt").value = data.marca.marcaNome;
                } else {
                    alert(data.msg || "Erro ao buscar os dados da marca.");
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
            document.getElementById("idMarcaExcluir").value = id;
        });
    });

    function limparValidacao(){
        document.getElementById("descricaoMarca").style["border-color"] = "#ced4da";
    }

    function cadastrar(){
        limparValidacao();
        let descricao = document.querySelector("#descricaoMarca").value;

        let listaErros = [];
        if(descricao == "")
            listaErros.push("descricaoMarca");
        
        if(listaErros.length == 0){
            let desc = {
                descricao: descricao,
            }
            fetch("/marca/cadastrar", {
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
                    window.location.href="/marca";
                }   
                else {
                    alert(r.msg);
                }
            })
        }else{
            document.getElementById("descricaoMarca").style["border-color"] = "red";
            alert("Informe a descrição da marca");
        }
    }

    function alterar() {
        limparValidacao();
        
        let id = document.querySelector("#idMarcaAlt").value;
        let descricao = document.querySelector("#descricaoMarcaAlt").value;

        let listaErros = [];
        if(descricao === "") {
            listaErros.push("descricaoMarcaAlt");
        }
        
        if(listaErros.length === 0){
            let marca = {
                id: id,
                descricao: descricao,
            };

            fetch("/marca/alterar", { // Nova rota para alteração
                method: 'POST', // Pode ser POST ou PUT
                body: JSON.stringify(marca),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r => r.json())
            .then(r => {
                if(r.ok) {
                    window.location.href = "/marca";
                } else {
                    alert(r.msg);
                }
            });
        } else {
            document.getElementById("descricaoMarcaAlt").style["border-color"] = "red";
            alert("Informe a descrição da marca");
        }
    }

    function excluir() {
        const idParaExcluir = document.getElementById("idMarcaExcluir").value;

        if(idParaExcluir) {
            fetch('/marca/excluir', {
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
            alert("ID da marca não encontrado para exclusão.");
        }
    }
})