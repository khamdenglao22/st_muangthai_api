const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const AboutStructure = sequelize.define(
  "AboutStructure",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name_la: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    full_name_en: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    position_la: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    position_en: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    responsible_la: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    responsible_en: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(150),
    },
    structure_order: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "about_structure",
    timestamps: false,
  }
);

module.exports = AboutStructure;
