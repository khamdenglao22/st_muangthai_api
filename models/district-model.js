const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Province = require("./province-model");

const District = sequelize.define(
  "District",
  {
    dist_cd: {
      type: DataTypes.STRING(5),
      autoIncrement: true,
      primaryKey: true,
    },
    prov_cd: {
      type: DataTypes.STRING(2),
      references: {
        model: Province,
        key: "prov_cd",
      },
    },
    dist_name_la: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    dist_name_en: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  },
  {
    tableName: "district",
    timestamps: false,
  }
);

District.belongsTo(Province, {
  foreignKey: "prov_cd",
  as: "Province",
});

Province.hasMany(District, { foreignKey: "prov_cd", as: "district" });

module.exports = District;
