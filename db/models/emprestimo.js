// models/emprestimo.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emprestimo extends Model {
    static associate(models) {
      // Define association here
    }
  }
  Emprestimo.init({
    id_usuario: DataTypes.INTEGER,
    id_livro: DataTypes.INTEGER,
    data_emprestimo: DataTypes.DATE,
    data_devolucao_prevista: DataTypes.DATE,
    data_devolucao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Emprestimo',
  });
  return Emprestimo;
};
