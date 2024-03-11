const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Province = require("../models/province-model");
const District = require("../models/district-model");

const Village = sequelize.define(
  "Village",
  {
    vill_cd: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dist_cd: {
      type: DataTypes.STRING(5),
      references: {
        model: District,
        key: "dist_cd",
      },
    },
    prov_cd: {
        type: DataTypes.STRING(2),
        references: {
          model: Province,
          key: "prov_cd",
        },
      },
    vill_name_la: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    vill_name_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    
  },
  {
    tableName: "village",
    timestamps: false,
  }
);

Village.belongsTo(District, {
  foreignKey: "dist_cd",
  as: "District",
});

Village.belongsTo(Province, {
  foreignKey: "prov_cd",
  as: "Province",
});

module.exports = Village;
