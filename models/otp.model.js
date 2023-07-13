const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OTP = sequelize.define("otp", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiration_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = OTP;
