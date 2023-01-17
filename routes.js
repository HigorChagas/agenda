const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const cadastroController = require('./src/controllers/cadastroController');

// Rotas da home
route.get('/', homeController.index);

// Rotas de Login
route.get('/login/index', cadastroController.login);
route.get('/cadastro/index', cadastroController.index);
route.post('/cadastro/register', cadastroController.register);
// route.post('/login/login', cadastroController.login);

module.exports = route;
