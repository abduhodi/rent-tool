const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = require("./category.model");

const Tool = sequelize.define("tool", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tool_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tool_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tool.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Category.hasMany(Tool, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = Tool;
