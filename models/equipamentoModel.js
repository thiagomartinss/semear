const Database = require('../db/database');

const conexao = new Database();

class EquipamentoModel {

    #equipamentoId;
    #equipamentoNome;
    #marcaId; 
    #marcaNome;

    get equipamentoId() { return this.#equipamentoId; } set equipamentoId(equipamentoId) { this.#equipamentoId = equipamentoId; }
    get equipamentoNome() { return this.#equipamentoNome; } set equipamentoNome(equipamentoNome) { this.#equipamentoNome = equipamentoNome; }
    get marcaId() { return this.#marcaId; } set marcaId(marcaId) { this.#marcaId = marcaId; }
    get marcaNome() { return this.#marcaNome; } set marcaNome(marcaNome) { this.#marcaNome = marcaNome; }
    
    constructor(equipamentoId, equipamentoNome, marcaId, marcaNome = "") {
        this.#equipamentoId = equipamentoId;
        this.#equipamentoNome = equipamentoNome;
        this.#marcaId = marcaId;
        this.#marcaNome = marcaNome;
    }
    
    async listarEquipamentos() {
        let sql = `SELECT e.*, m.DESC_MARCA FROM EQUIPAMENTO e INNER JOIN MARCA m ON e.ID_MARCA = m.ID_MARCA ORDER BY e.ID_EQUIPAMENTO ASC`;
        
        var rows = await conexao.ExecutaComando(sql);
        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new EquipamentoModel
                    (row['ID_EQUIPAMENTO'], row['DESC_EQUIPAMENTO'], row['ID_MARCA'], row['DESC_MARCA']));
            }
        }
        return listaRetorno;
    }

    async cadastrarEquipamento(){
        if(this.#equipamentoId == 0){
            let sql = "INSERT INTO EQUIPAMENTO (DESC_EQUIPAMENTO, ID_MARCA) VALUES (?, ?)";
            let valores = [this.#equipamentoNome, this.#marcaId];

            return await conexao.ExecutaComandoNonQuery(sql, valores);
        } else {
            let sql = "UPDATE EQUIPAMENTO SET DESC_EQUIPAMENTO = ?, ID_MARCA = ? WHERE ID_EQUIPAMENTO = ?";
            let valores = [this.#equipamentoNome, this.#marcaId, this.#equipamentoId];

            return await conexao.ExecutaComandoNonQuery(sql, valores) > 0;
        }
    }

    async buscar(id){
        let sql = "SELECT * FROM EQUIPAMENTO WHERE ID_EQUIPAMENTO = ?";
        let valores = [id];
        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0){
            let row = rows[0];
            return new EquipamentoModel(row["ID_EQUIPAMENTO"], row["DESC_EQUIPAMENTO"], row["ID_MARCA"]);
        }
        return null;
    }

    async excluir(id) {
        let sql = "DELETE FROM EQUIPAMENTO WHERE ID_EQUIPAMENTO = ?";
        let valores = [id];
        let result = await conexao.ExecutaComandoNonQuery(sql, valores);
        return result;
    }
}

module.exports = EquipamentoModel;