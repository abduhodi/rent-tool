const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
