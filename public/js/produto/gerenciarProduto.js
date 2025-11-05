document.addEventListener("DOMContentLoaded", function(){
    let msgProduto = document.querySelector("#msg-produto");

    const modal = document.querySelector("#modalProduto");
    modal.addEventListener('show.bs.modal', event =>{
        limparValidacao();
    });

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao(){
        document.getElementById("tipoProduto").style["border-color"] = "#ced4da";
        document.getElementById("nomeProduto").style["border-color"] = "#ced4da";
        document.getElementById("marcaProduto").style["border-color"] = "#ced4da";
        document.getElementById("vlCompraProduto").style["border-color"] = "#ced4da";
        document.getElementById("vlVendaProduto").style["border-color"] = "#ced4da";
        document.getElementById("qtdProduto").style["border-color"] = "#ced4da";
        msgProduto.textContent = "";
    }

    function cadastrar(){
        limparValidacao();
        let tipoId = document.getElementById("tipoProduto").value;
        let nome = document.getElementById("nomeProduto").value;
        let vlCompra = document.getElementById("vlCompraProduto").value;
        let vlVenda = document.getElementById("vlVendaProduto").value;
        let marcaId = document.getElementById("marcaProduto").value;
        let qtdEstoque = document.getElementById("qtdProduto").value;

        let listaErros = [];
        if (tipoId.trim() === "")
            listaErros.push("tipoProduto");
        if (nome.trim() === "")
            listaErros.push("nomeProduto");
        if (vlCompra.trim() === "")
            listaErros.push("vlCompraProduto");
        if (vlVenda.trim() === "")
            listaErros.push("vlVendaProduto");
        if (marcaId.trim() === "")
            listaErros.push("marcaProduto");
        if (qtdEstoque.trim() === "")
            listaErros.push("qtdProduto");

        if(listaErros.length == 0){
            let dados ={
                tipoId: tipoId.trim(),
                nome: nome.trim(),
                vlCompra: vlCompra.trim(),
                vlVenda: vlVenda.trim(),
                marcaId: marcaId.trim(),
                qtdEstoque: qtdEstoque.trim()
            };
            fetch("/produto/cadastrar", {
                method: 'POST',
                body: JSON.stringify(dados),
                headers:{
                    "Content-Type": "application/json",
                }
            })
            .then(r =>{
                return r.json();
            })
            .then(r => {
                if(r.ok){
                    window.location.href="/produto";
                }else{
                    msgProduto.innerHTML = r.msg;
                }
            })
        }else{
            if (listaErros.includes("tipoProduto"))
                document.getElementById("tipoProduto").style["border-color"] = "red";
            if (listaErros.includes("nomeProduto"))
                document.getElementById("nomeProduto").style["border-color"] = "red";
            if (listaErros.includes("vlCompraProduto"))
                document.getElementById("vlCompraProduto").style["border-color"] = "red";
            if (listaErros.includes("vlVendaProduto"))
                document.getElementById("vlVendaProduto").style["border-color"] = "red";
            if (listaErros.includes("marcaProduto"))
                document.getElementById("marcaProduto").style["border-color"] = "red";
            if (listaErros.includes("qtdProduto"))
                document.getElementById("qtdProduto").style["border-color"] = "red";

            msgProduto.textContent = "Preencha os campos em vermelho";
        }
    }
})