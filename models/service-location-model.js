const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const ServiceSection = require("./section-model");
const Village = require("./village-model");
const District = require("./district-model");
const Province = require("./province-model");
const Country = require("./service-country-model");


const ServiceLocation = sequelize.define(
  "ServiceLocation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    location_name_la: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    location_name_en: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    tel: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    village_id: {
      type: DataTypes.STRING(10),
      references: {
        model: Village,
        key: "vill_cd",
      },
    },
    district_id: {
      type: DataTypes.STRING(10),
      references: {
        model: District,
        key: "dist_cd",
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
      type: DataTypes.INTEGER(10),
      references: {
        model: ServiceSection,
        key: "id",
      },
    },

    country_id: {
      type: DataTypes.INTEGER(10),
      references: {
        model: Country,
        key: "id",
      },
    }
  },
  {
    tableName: "service_location",
    timestamps: false,
  }
);

ServiceLocation.belongsTo(ServiceSection, {
  foreignKey: "section_id",
  as: "servicesSection",
});

ServiceLocation.belongsTo(Country, {
  foreignKey: "country_id",
  as: "Country",
});

ServiceLocation.belongsTo(Village, {
  foreignKey: "village_id",
  as: "Village",
});

ServiceLocation.belongsTo(District, {
  foreignKey: "district_id",
  as: "District",
});

ServiceLocation.belongsTo(Province, {
  foreignKey: "province_id",
  as: "Province",
});

module.exports = ServiceLocation;
