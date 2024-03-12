const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const ServicesType = require("./services-type-model");


const ServiceCountry = sequelize.define(
  "ServiceCountry",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country_name_la: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country_name_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    service_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ServicesType,
        key: "id",
      },
    },
  },
  {
    tableName: "service_country",
    timestamps: false,
  }
);

ServiceCountry.belongsTo(ServicesType, { foreignKey: 'service_type_id', as: 'servicesType' });


ServicesType.hasMany(ServiceCountry, {
  foreignKey: "service_type_id",
  as: "serviceCountry",
});

module.exports = ServiceCountry;
