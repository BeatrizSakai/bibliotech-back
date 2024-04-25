// Incluir as bibliotecas
const express = require("express");
const cors = require('cors');
const db = require("./db/models");

// Chamar a função express
const app = express();

// Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());

// Middleware para permitir o CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Testar conexão com banco de dados
db.sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados realizada com sucesso!');
        
        // Iniciar o servidor na porta 8080
        app.listen(8080, () => {
            console.log("Servidor iniciado na porta 8080: http://localhost:8080");
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

// Incluir as CONTROLLERS
const users = require("./controllers/users");

// Criar as rotas
app.use('/', users);
