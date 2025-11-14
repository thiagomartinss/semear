document.addEventListener("DOMContentLoaded", function(){
    let checkPj = document.querySelector("#checkedPJ");
    let checkPf = document.querySelector("#checkedPF");
    let lbPF = document.querySelector("#lb-checkedPF");
    let lbPJ = document.querySelector("#lb-checkedPJ");
    let msgPessoa = document.querySelector("#msg-pessoa");
    const btnCadastrar = document.querySelector("#btnCadastrar");

    const modal = document.getElementById('modalPessoa')
        modal.addEventListener('show.bs.modal', event => {
        limparValidacao();
    });

    btnCadastrar.addEventListener("click", cadastrar);

    function cadastrar(){
        if(validaCheckBox()){
            console.log("ok");
        }
    }

    function validaCheckBox(){
        if(checkPf.checked === false && checkPj.checked === false){
            msgPessoa.innerText = "Selecione Pessoa Física ou Júridica";

            if(checkPf.checked === false){
                lbPF.style.color = 'red';
            }
            if(checkPj.checked === false){
                lbPJ.style.color = 'red';
            }
            return false;
        }
        return true;
    }

    function limparCheckbox() {
        if (checkPf.checked || checkPj.checked ) {
            lbPF.style.color = "";
            lbPJ.style.color = "";  
            msgPessoa.innerText = "";
        }
    }
    
    checkPf.addEventListener("change", limparCheckbox);
    checkPj.addEventListener("change", limparCheckbox);

    function limparValidacao(){
        lbPF.style.color = 'black'
        lbPJ.style.color = 'black'
        msgPessoa.innerText = ""
    }
})