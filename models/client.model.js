const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Client = sequelize.define("client", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = Client;
