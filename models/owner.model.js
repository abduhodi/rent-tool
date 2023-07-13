const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Owner = sequelize.define("owner", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  owner_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  owner_phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  hashed_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Owner;
