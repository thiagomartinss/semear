document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

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
            fetch("/listarMarca/cadastrar", {
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
                    window.location.href="/listarMarca";
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
})