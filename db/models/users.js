'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        this.setDataValue('password', bcrypt.hashSync(value, salt));
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
