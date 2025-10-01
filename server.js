const express = require('express'); //const para o express
const expressEjsLayouts = require('express-ejs-layouts'); //const para o express layouts
const server = express(); //const que representa esse servidor

server.set("view engine", 'ejs') //configurações do EJS
server.use(express.static('public')); //Expor a pasta de estilização/script para o navegador

//Configuração arquivo de Layout
server.set('layout', './layout.ejs');
server.use(expressEjsLayouts);

server.use(express.urlencoded({extended: true})); //Configuração para as requisições POST (Submissão)
server.use(express.json()); //Configurar a possibilidade de fazer parse em uma string JSON

// inicia o servidor na porta e exibe no console a mensagem
server.listen(5000, function() { 
    console.log("Aplicação iniciada!");
})