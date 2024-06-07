// models/books.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate(models) {
      // Define association here
    }
  }
  Books.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    ano_publicacao: DataTypes.INTEGER,
    genero: DataTypes.STRING,
    sinopse: DataTypes.TEXT,
    imageUrl: DataTypes.STRING // Adicionando a coluna imageUrl
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};
