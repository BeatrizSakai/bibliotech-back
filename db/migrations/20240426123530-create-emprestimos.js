// migrations/20240426123530-create-emprestimos.js
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emprestimos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER
      },
      id_livro: {
        type: Sequelize.INTEGER
      },
      data_emprestimo: {
        type: Sequelize.DATE
      },
      data_devolucao_prevista: {
        type: Sequelize.DATE
      },
      data_devolucao: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Emprestimos');
  }
};
