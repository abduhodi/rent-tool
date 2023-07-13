const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  admin_phone_number: {
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

module.exports = Admin;
