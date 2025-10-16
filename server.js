const express = require('express'); 
const expressEjsLayouts = require('express-ejs-layouts'); 
const server = express(); 

const routerHome = require("./routes/homeRoute");
const routeLogin = require('./routes/routeLogin');
const routeContact = require("./routes/contactRoute");
const routeAbout = require("./routes/aboutRoute");
const routeRegister = require("./routes/registerRoute");
const routeAdmin = require("./routes/adminRoute");
const routeMarca = require("./routes/marcaRoute");
const routeServico = require("./routes/servicoRoute");
const routeEquipamento = require("./routes/equipamentoRoute");

server.set("view engine", 'ejs') 
server.use(express.static('public')); //Expor a pasta de estilização/script para o navegador

//Configuração arquivo de Layout
server.set('layout', './layout.ejs');
server.use(expressEjsLayouts);

server.use(express.urlencoded({extended: true})); //Configuração para as requisições POST (Submissão)
server.use(express.json()); //Configurar a possibilidade de fazer parse em uma string JSON

server.use("/", routerHome);
server.use("/login", routeLogin);
server.use("/contact", routeContact);
server.use("/about", routeAbout);
server.use("/register", routeRegister);
server.use("/admin", routeAdmin);
server.use("/marca", routeMarca);
server.use("/servico", routeServico);
server.use("/equipamento", routeEquipamento);

server.listen(5000, function() { 
    console.log("Aplicação iniciada!");
})