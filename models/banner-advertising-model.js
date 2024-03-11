const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const BannerAdvertising = sequelize.define(
  "Banner_Advertising",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING(150),
    },
    banner_advertising_position: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
  },
  {
    tableName: "banner_advertising",
    timestamps: false,
  }
);

module.exports = BannerAdvertising;
