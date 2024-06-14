// app.js (ou server.js)
const express = require("express");
const cors = require('cors');
const db = require("./db/models");
const { generateUploadURL } = require('./s3');

const app = express();

// Middleware para permitir o CORS
app.use(cors());

// Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());

app.get('/s3Url', async (req, res) => {
    try {
        const url = await generateUploadURL();
        res.json({ url });
    } catch (error) {
        console.error('Error generating S3 signed URL:', error);
        res.status(500).json({ error: 'Failed to generate S3 signed URL' });
    }
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
const books = require("./controllers/books");
const emprestimos = require("./controllers/emprestimos");

// Criar as rotas
app.use('/', users);
app.use('/', books);
app.use('/', emprestimos);
