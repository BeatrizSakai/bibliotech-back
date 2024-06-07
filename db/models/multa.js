// models/multa.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Multa extends Model {
    static associate(models) {
    }
  }
  Multa.init({
    id_usuario: DataTypes.INTEGER,
    valor: DataTypes.FLOAT,
    motivo: DataTypes.STRING,
    data_pagamento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Multa',
  });
  return Multa;
};
