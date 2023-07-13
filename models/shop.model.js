const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const District = require("./district.model");
const Owner = require("./owner.model");

const Shop = sequelize.define("shop", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  shop_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shop_phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  shop_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shop_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Many-to-One relationship // Shop-Owner
Shop.belongsTo(Owner, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Owner.hasMany(Shop, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
// Many-to-One relationship // Shop-District
Shop.belongsTo(District, {
  foreignKey: "district_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
District.hasMany(Shop, {
  foreignKey: "district_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = Shop;
