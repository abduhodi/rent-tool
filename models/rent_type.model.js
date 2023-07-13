const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RentType = sequelize.define("rent_type", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  type_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = RentType;
