const express = require("express");
const LoginController = require("../controllers/loginController");
const routeLogin = express.Router();
const loginCtrl = new LoginController();

routeLogin.get("/", loginCtrl.loginView);

module.exports = routeLogin;