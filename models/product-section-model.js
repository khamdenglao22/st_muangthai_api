const sequelize = require("../config/index");
const { DataTypes } = require("sequelize");
const Product = require("./product-model");

const ProductSection = sequelize.define(
  "ProductSection",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    p_section_name_la: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    p_section_name_en: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    p_section_title_la: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    p_section_title_en: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    p_section_des: {
      type: DataTypes.TEXT,
    },

    p_section_order: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    p_section_image: {
      type: DataTypes.STRING(150),
    },

    p_section_outline: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    p_id: {
      type: DataTypes.INTEGER(10),
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    tableName: "product_section",
    timestamps: false,
  }
);

Product.hasMany(ProductSection, {
  foreignKey: "p_id",
  as: "Sections",
});


module.exports = ProductSection;
