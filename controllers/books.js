// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express
const router = express.Router();
// Incluir o arquivo que possui a conexão com banco de dados
const db = require('./../db/models');

// Criar a rota listar 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users?page=3
router.get("/books", async (req, res) => {

    // Receber o número da página, quando não é enviado o número da página é atribuido página 1
    const { page = 1 } = req.query;
    //console.log(page);

    // Limite de registros em cada página
    const limit = 10;

    // Variável com o número da última página
    var lastPage = 1;

    // Contar a quantidade de registro no banco de dados
    const countBook = await db.Books.count();
    //console.log(countBook);

    // Acessa o IF quando encontrar registro no banco de dados
    if (countBook !== 0) {
        // Calcular a última página
        lastPage = Math.ceil(countBook / limit);
        //console.log(lastPage);
    } else {
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Erro: Nenhum usuário encontrado!"
        });
    }

    //console.log((page * limit) - limit); // 3 * 10 - 10 = 20
    // Recuperar todos os usuário do banco de dados
    const books = await db.Books.findAll({

        // Indicar quais colunas recuperar
        attributes: ['id', 'titulo', 'autor', 'ano_publicacao', 'genero', 'sinopse', 'imageUrl'],

        // Ordenar os registros pela coluna id na forma decrescente
        order: [['id', 'ASC']],

        // Calcular a partir de qual registro deve retornar e o limite de registros
        offset: Number((page * limit) - limit),
        limit: limit
    });

    // Acessa o IF se encontrar o registro no banco de dados
    if (books) {
        // Criar objeto com as informações para paginação
        var pagination = {
            // Caminho
            path: '/books',
            // Página atual
            page,
            // URL da página anterior
            prev_page_url: page - 1 >= 1 ? page - 1 : false,
            // URL da próxima página
            next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
            // Última página
            lastPage,
            // Quantidade de registros
            total: countBook
        }

        // Pausar o processamento e retornar os dados em formato de objeto
        return res.json({
            books,
            pagination
        });
    } else {
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Erro: Nenhum livro encontrado!"
        });
    }
});

// Criar a rota visualizar e receber o parâmentro id enviado na URL 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users/7
router.get("/books/:id", async (req, res) => {

    // Receber o parâmetro enviado na URL
    const { id } = req.params;
    //console.log(id);

    // Recuperar o registro do banco de dados
    const book = await db.Books.findOne({
        // Indicar quais colunas recuperar
        attributes: ['id', 'titulo', 'autor', 'ano_publicacao', 'genero', 'sinopse', 'createdAt', 'updatedAt', 'imageUrl'],

        // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados
        where: { id },
    });
    //console.log(user);

    // Acessa o IF se encontrar o registro no banco de dados
    if (book) {
        // Pausar o processamento e retornar os dados
        return res.json({
            book: book.dataValues
        });
    } else {
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Erro: livro não encontrado!"
        });
    }
});


router.post("/books", async (req, res) => {
    try {
      const { titulo, autor, ano_publicacao, genero, sinopse, imageUrl } = req.body; // Inclua imageUrl aqui
      const newBook = await db.Books.create({ titulo, autor, ano_publicacao, genero, sinopse, imageUrl }); // Inclua imageUrl aqui
      return res.status(201).json(newBook);
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      return res.status(500).json({ message: "Erro ao cadastrar livro." });
    }
});
  
router.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, ano_publicacao, genero, sinopse, imageUrl } = req.body; // Inclua imageUrl aqui
        await db.Books.update({ titulo, autor, ano_publicacao, genero, sinopse, imageUrl }, { where: { id } }); // Inclua imageUrl aqui
        return res.json({ mensagem: "Livro editado com sucesso!" });
    } catch (error) {
        console.error("Erro ao editar livro:", error);
        return res.status(500).json({ mensagem: "Erro ao editar livro." });
    }
});

// Criar a rota apagar e receber o parâmentro id enviado na URL 
// Endereço para acessar através da aplicação externa: http://localhost:8080/users/3
router.delete("/books/:id", async (req, res) => {

    // Receber o parâmetro enviado na URL
    const { id } = req.params;

    // Apagar livro no banco de dados utilizando a MODELS users
    await db.Books.destroy({
        // Acrescentar o WHERE na instrução SQL indicando qual registro excluir no BD
        where: {id} 
    }).then(() => {
        // Pausar o processamento e retornar a mensagem
        return res.json({
            mensagem: "livro apagado com sucesso!"
        });
    }).catch(() => {
        // Pausar o processamento e retornar a mensagem
        return res.status(400).json({
            mensagem: "Erro: livro não apagado com sucesso!"
        });
    });
});

// Exportar a instrução que está dentro da constante router 
module.exports = router;