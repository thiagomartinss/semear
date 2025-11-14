const Database = require('../db/database');

const conexao = new Database();

class PessoaModel{
    // Tabela PESSOA
    #pessoaId;
    #email;
    #telefone;
    #ehCliente;
    #ehFornecedor;

    // Tabelas ENDERECO, CIDADE, UF
    #cep;
    #logradouro;
    #numero;
    #bairro;
    #cidade;
    #uf;

    // Tabela Pessoa Física
    #nome;
    #cpf;
    #dataNascimento;

    // Tabela Pessoa Jurídica
    #cnpj;
    #razaoSocial;
    #nomeFantasia;

    get pessoaId() { return this.#pessoaId; } set pessoaId(pessoaId) { this.#pessoaId = pessoaId; }
    get email() { return this.#email; } set email(email) { this.#email = email; }
    get telefone() { return this.#telefone; } set telefone(telefone) { this.#telefone = telefone; }
    get ehCliente() { return this.#ehCliente; } set ehCliente(ehCliente) { this.#ehCliente = ehCliente; }
    get ehFornecedor() { return this.#ehFornecedor; } set ehFornecedor(ehFornecedor) { this.#ehFornecedor = ehFornecedor; }

    get cep() { return this.#cep; } set cep(cep) { this.#cep = cep; }
    get logradouro() { return this.#logradouro; } set logradouro(logradouro) { this.#logradouro = logradouro; }
    get numero() { return this.#numero; } set numero(numero) { this.#numero = numero; }
    get bairro() { return this.#bairro; } set bairro(bairro) { this.#bairro = bairro; }
    get cidade() { return this.#cidade; } set cidade(cidade) { this.#cidade = cidade; }
    get uf() { return this.#uf; } set uf(uf) { this.#uf = uf; }

    get nome() { return this.#nome; } set nome(nome) { this.#nome = nome; }
    get cpf() { return this.#cpf; } set cpf(cpf) { this.#cpf = cpf; }
    get dataNascimento() { return this.#dataNascimento; } set dataNascimento(dataNascimento) { this.#dataNascimento = dataNascimento; }

    get cnpj() { return this.#cnpj; } set cnpj(cnpj) { this.#cnpj = cnpj; }
    get razaoSocial() { return this.#razaoSocial; } set razaoSocial(razaoSocial) { this.#razaoSocial = razaoSocial; }
    get nomeFantasia() { return this.#nomeFantasia; } set nomeFantasia(nomeFantasia) { this.#nomeFantasia = nomeFantasia; }

    constructor(pessoaId, email, telefone, ehCliente, ehFornecedor, cep, logradouro, numero, bairro, cidade, uf, nome = "", cpf = "", dataNascimento = "", cnpj = "", razaoSocial = "", nomeFantasia = "") {
        this.#pessoaId = pessoaId;
        this.#email = email;
        this.#telefone = telefone;
        this.#ehCliente = ehCliente;
        this.#ehFornecedor = ehFornecedor;
        
        this.#cep = cep;
        this.#logradouro = logradouro;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;

        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;

        this.#cnpj = cnpj;
        this.#razaoSocial = razaoSocial;
        this.#nomeFantasia = nomeFantasia;
    }

    async cadastrarPessoa() {

    // coletar uf
    // cadastrar cidade ou coletar se ja existente
    // cadastrar na tabela pessoa
    // recuperar o id da pessoa
    // cadastrar na tabela fisica ou juridica

    }

}

module.exports = PessoaModel;