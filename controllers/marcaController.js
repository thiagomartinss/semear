const MarcaModel = require("../models/marcaModel");

class MarcaController{
    
    async marcaView(req, res){
        let marca = new MarcaModel();
        let lista = await marca.listarMarcas();
        res.render('marca/listarMarca', {lista: lista});
    }
}
module.exports = MarcaController;