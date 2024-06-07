// models/reservation.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      // Define association here
    }
  }
  Reservation.init({
    id_usuario: DataTypes.INTEGER,
    id_livro: DataTypes.INTEGER,
    data_reserva: DataTypes.DATE,
    data_expiracao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
