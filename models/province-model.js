const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const ServiceCountry = require("./service-country-model");

const Province = sequelize.define(
  "Province",
  {
    prov_cd: {
      type: DataTypes.STRING(2),
      // autoIncrement: true,
      primaryKey: true,
    },
    prov_name_la: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    prov_name_en: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    country_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ServiceCountry,
        key: "id",
      },
    },

  },
  {
    tableName: "province",
    timestamps: false,
  }
);

Province.belongsTo(ServiceCountry, {
  foreignKey: "country_id",
  as: "Country",
});

module.exports = Province;
