const Database = require('../db/database');

const conexao = new Database();

class ProdutoModel{

    #produtoId;
    #produtoNome;       
    #valorVenda;        
    #valorCompra;       
    #qtdEstoque;        
    #marcaId;     
    #marcaNome;      
    #tipoProdutoId;     
    #tipoProdutoNome;

    get produtoId() { return this.#produtoId; } set produtoId(produtoId) { this.#produtoId = produtoId; }
    get produtoNome() { return this.#produtoNome; } set produtoNome(produtoNome) { this.#produtoNome = produtoNome; }
    get valorVenda() { return this.#valorVenda; } set valorVenda(valorVenda) { this.#valorVenda = valorVenda; }
    get valorCompra() { return this.#valorCompra; } set valorCompra(valorCompra) { this.#valorCompra = valorCompra; }
    get qtdEstoque() { return this.#qtdEstoque; } set qtdEstoque(qtdEstoque) { this.#qtdEstoque = qtdEstoque; }
    get marcaId() { return this.#marcaId; } set marcaId(marcaId) { this.#marcaId = marcaId; }
    get marcaNome() { return this.#marcaNome; } set marcaNome(marcaNome) { this.#marcaNome = marcaNome; }
    get tipoProdutoId() { return this.#tipoProdutoId; } set tipoProdutoId(tipoProdutoId) { this.#tipoProdutoId = tipoProdutoId; }
    get tipoProdutoNome() { return this.#tipoProdutoNome; } set tipoProdutoNome(tipoProdutoNome) { this.#tipoProdutoNome = tipoProdutoNome; }

    constructor(produtoId, produtoNome, valorVenda, valorCompra, qtdEstoque, marcaId, tipoProdutoId, marcaNome = "", tipoProdutoNome = "") {
        this.#produtoId = produtoId;
        this.#produtoNome = produtoNome;
        this.#valorVenda = valorVenda;
        this.#valorCompra = valorCompra;
        this.#qtdEstoque = qtdEstoque;
        this.#marcaId = marcaId;
        this.#marcaNome = marcaNome;
        this.#tipoProdutoId = tipoProdutoId;
        this.#tipoProdutoNome = tipoProdutoNome;
    }

    async listarProdutos(){
        let sql = `SELECT P.ID_PRODUTO, P.DESC_PRODUTO, M.DESC_MARCA, TP.TIPO_DESCRICAO, P.QTD_ESTOQUE, P.VALOR_VENDA
                    FROM PRODUTO P
                    INNER JOIN TIPO_PRODUTO TP ON P.TIPO_PRODUTO_ID_TIPO = TP.ID_TIPO
                    INNER JOIN MARCA M ON P.MARCA_ID_MARCA = M.ID_MARCA`
        
        var rows = await conexao.ExecutaComando(sql);
        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new ProdutoModel
                    (row['ID_PRODUTO'], row['DESC_PRODUTO'], row['DESC_MARCA'], row['TIPO_DESCRICAO'], row['QTD_ESTOQUE'], row['VALOR_VENDA']));
            }
        }
        return listaRetorno;
    }
}
module.exports = ProdutoModel;