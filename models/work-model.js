const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Province = require("./province-model");

const Work = sequelize.define(
  "Work",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    position_name_la: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    position_name_en: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    depart_name_la: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    depart_name_en: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(100),
    },

    prov_cd: {
      type: DataTypes.STRING(2),
      references: {
        model: Province,
        key: "prov_cd",
      },
    },
  },
  {
    tableName: "work",
    timestamps: false,
  }
);

Work.belongsTo(Province, {
  foreignKey: "prov_cd",
  as: "Province",
});

module.exports = Work;
