const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const ServicesType = sequelize.define(
  "ServicesType",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_type_la: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    service_type_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "service_type",
    timestamps: false,
  }
);

module.exports = ServicesType;
