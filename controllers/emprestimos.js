// controllers/emprestimos.js
const express = require("express");
const router = express.Router();
const db = require('../db/models');
const { Emprestimos } = db;

const jwt = require('jsonwebtoken');

// Middleware para autenticação com JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    jwt.verify(token, 'seuSegredoJWT', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido." });
        }
        req.user = user;
        next();
    });
}

router.post("/emprestimos", authenticateToken, async (req, res) => {
    const { livroId, data_emprestimo } = req.body;
    const data_devolucao_prevista = new Date(data_emprestimo);
    data_devolucao_prevista.setDate(data_devolucao_prevista.getDate() + 15);

    try {
        const newEmprestimos = await db.Emprestimos.create({
            userId: req.user.id, // Adicionando o userId ao criar o empréstimo
            livroId,
            data_emprestimo,
            data_devolucao_prevista
        });
        return res.status(201).json(newEmprestimos);
    } catch (error) {
        console.error("Erro ao criar empréstimo:", error);
        return res.status(500).json({ message: "Erro ao criar empréstimo." });
    }
});
// controllers/emprestimos.js
router.get("/emprestimos", authenticateToken, async (req, res) => {
    try {
        const emprestimos = await db.Emprestimos.findAll({
            where: { userId: req.user.id },
            include: [{ model: db.Books, as: 'livro' }] // Inclui os dados do livro associado ao empréstimo
        });
        return res.status(200).json(emprestimos);
    } catch (error) {
        console.error("Erro ao listar empréstimos:", error);
        return res.status(500).json({ message: "Erro ao listar empréstimos." });
    }
});


router.put("/emprestimos/:id/devolucao", authenticateToken, async (req, res) => {
    const emprestimoId = req.params.id;

    try {
        const emprestimo = await db.Emprestimos.findOne({
            where: { id: emprestimoId, userId: req.user.id }
        });

        if (!emprestimo) {
            return res.status(404).json({ message: "Empréstimo não encontrado." });
        }

        if (emprestimo.data_devolucao) {
            return res.status(400).json({ message: "Este empréstimo já foi devolvido." });
        }

        // Atualiza a data de devolução do empréstimo
        await emprestimo.update({ data_devolucao: new Date() });

        return res.status(200).json({ message: "Devolução registrada com sucesso." });
    } catch (error) {
        console.error("Erro ao registrar devolução:", error);
        return res.status(500).json({ message: "Erro ao registrar devolução." });
    }
});



module.exports = router;
