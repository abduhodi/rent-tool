const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const ShopTool = require("./shop_tool.model");
const RentType = require("./rent_type.model");

const Price = sequelize.define("price", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
ShopTool.hasMany(Price, { foreignKey: "shop_tool_id" });
Price.belongsTo(ShopTool, { foreignKey: "shop_tool_id" });

RentType.hasMany(Price, { foreignKey: "rent_type_id" });
Price.belongsTo(RentType, { foreignKey: "rent_type_id" });

module.exports = Price;
