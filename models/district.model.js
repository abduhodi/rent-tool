const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const District = sequelize.define("district", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  district_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = District;
