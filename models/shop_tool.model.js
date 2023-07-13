const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Shop = require("./shop.model");
const Tool = require("./tool.model");

const ShopTool = sequelize.define("shop_tool", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

ShopTool.belongsTo(Shop, {
  foreignKey: "shop_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Shop.hasMany(ShopTool, {
  foreignKey: "shop_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

ShopTool.belongsTo(Tool, {
  foreignKey: "tool_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Tool.hasMany(ShopTool, {
  foreignKey: "tool_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = ShopTool;
