const Database = require('../db/database');

const conexao = new Database();

class TipoProdutoModel {

    #tipoProdutoId;
    #tipoProdutoNome;

    get tipoProdutoId() { return this.#tipoProdutoId; } set tipoProdutoId(id) { this.#tipoProdutoId = id; }
    get tipoProdutoNome() { return this.#tipoProdutoNome; } set tipoProdutoNome(nome) { this.#tipoProdutoNome = nome; }

    constructor(id, nome) {
        this.#tipoProdutoId = id;
        this.#tipoProdutoNome = nome;
    }

    async listarTipos() {
        let sql = 'SELECT * FROM TIPO_PRODUTO';
        
        var rows = await conexao.ExecutaComando(sql);
        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new TipoProdutoModel(row['ID_TIPO'], row['TIPO_DESCRICAO']));
            }
        }
        return listaRetorno;
    }
}
module.exports = TipoProdutoModel;