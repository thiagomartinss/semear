const ProdutoModel = require("../models/produtoModel");
const MarcaModel = require("../models/marcaModel");
const TipoProdutoModel = require("../models/tipoProdutoModel");

class ProdutoController{

    async produtoView(req, res){
        let produto = new ProdutoModel();
        const listaProdutos = await produto.listarProdutos();

        let marca = new MarcaModel();
        const listaMarcas = await marca.listarMarcas();

        let tipo = new TipoProdutoModel();
        const listaTipo = await tipo.listarTipos();

        res.render('produto/produtos', {
            listaProdutos: listaProdutos, 
            listaMarcas: listaMarcas,
            listaTipo: listaTipo
        });

    }
}

module.exports = ProdutoController;