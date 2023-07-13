const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Client = require("./client.model");
const ShopTool = require("./shop_tool.model");
const RentType = require("./rent_type.model");

const Rent = sequelize.define("rent", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shop_tool_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rent_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rent_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rent_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  rent_period: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  finished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
// Many to One relationship Rent-Client
Rent.belongsTo(Client, {
  foreignKey: "client_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Client.hasMany(Rent, {
  foreignKey: "client_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
// Many to One relationship Rent-ShopTool
Rent.belongsTo(ShopTool, {
  foreignKey: "shop_tool_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ShopTool.hasMany(Rent, {
  foreignKey: "shop_tool_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
// Many to One relationship Rent-RentType
Rent.belongsTo(RentType, {
  foreignKey: "rent_type_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
RentType.hasMany(Rent, {
  foreignKey: "rent_type_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = Rent;
