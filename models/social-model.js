const sequelize = require("../config/index");
const { DataTypes } = require("sequelize");

const Social = sequelize.define(
  "Social",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    social_link: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(100),
    },
    social_position: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
  },
  {
    tableName: "social",
    timestamps: false,
  }
);

module.exports = Social;
