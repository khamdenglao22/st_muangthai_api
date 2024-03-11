const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Banner = sequelize.define(
  "Banner",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING(150),
    },
    banner_position: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
  },
  {
    tableName: "banner",
    timestamps: false,
  }
);

module.exports = Banner;
