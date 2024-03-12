const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Province = require("./province-model");
const ServiceSection = require("./section-model");
const ServiceCountry = require("./service-country-model");

const ServiceLocationMap = sequelize.define(
  "ServiceLocationMap",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING(100),
    },

    country_id: {
      type: DataTypes.INTEGER(10),
      references: {
        model: ServiceCountry,
        key: "id",
      },
    },

    province_id: {
      type: DataTypes.STRING(10),
      references: {
        model: Province,
        key: "prov_cd",
      },
    },

    section_id: {
      type: DataTypes.STRING(10),
      references: {
        model: ServiceSection,
        key: "id",
      },
    },
  },
  {
    tableName: "service_location_map",
    timestamps: false,
  }
);

ServiceLocationMap.belongsTo(ServiceCountry, {
  foreignKey: "country_id",
  as: "Country",
});

ServiceLocationMap.belongsTo(Province, {
  foreignKey: "province_id",
  as: "Province",
});

ServiceLocationMap.belongsTo(ServiceSection, {
  foreignKey: "section_id",
  as: "Section",
});

module.exports = ServiceLocationMap;
