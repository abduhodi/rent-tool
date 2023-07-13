const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Client = require("./client.model");
const Admin = require("./admin.model");
const Owner = require("./owner.model");

const Session = sequelize.define("session", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_type: {
    type: DataTypes.ENUM(["user", "admin", "owner"]),
    allowNull: false,
  },
  device: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hashed_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Many-to-One association for Session-Client
Session.belongsTo(Client, {
  foreignKey: "client_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Client.hasMany(Session, {
  foreignKey: "client_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
// Many-to-One association for Session-Admin
Session.belongsTo(Admin, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Admin.hasMany(Session, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
// Many-to-One association for Session-Owner
Session.belongsTo(Owner, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Owner.hasMany(Session, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = Session;
