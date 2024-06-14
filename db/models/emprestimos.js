'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Emprestimos extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Books, { as: 'livro', foreignKey: 'livroId' }); // Adicionando um alias 'livro'
    }
  }

  Emprestimos.init({
    userId: DataTypes.INTEGER,
    livroId: DataTypes.INTEGER,
    data_emprestimo: DataTypes.DATE,
    data_devolucao_prevista: DataTypes.DATE,
    data_devolucao: DataTypes.DATE // Adicione este campo para registrar a data de devolução
  }, {
    sequelize,
    modelName: 'Emprestimos',
  });

  return Emprestimos;
};
