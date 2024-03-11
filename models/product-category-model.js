const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_la: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "product-category",
    timestamps: false,
  }
);

module.exports = ProductCategory;
