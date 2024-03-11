const sequelize = require("../config/index");
const { DataTypes } = require("sequelize");
const ProductCategorySub = require("./product-category-sub-model");
const ProductCategory = require("./product-category-model");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    p_name_la: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    p_name_en: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    p_image: {
      type: DataTypes.STRING(150),
    },

    p_order: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    p_cate_id:{
      type: DataTypes.INTEGER(10),
      references: {
        model: ProductCategory,
        key: "id",
      },
    },

    p_cate_sub_id: {
      type: DataTypes.INTEGER(10),
      references: {
        model: ProductCategorySub,
        key: "id",
      },
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

Product.belongsTo(ProductCategorySub, {
  foreignKey: "p_cate_sub_id",
  as: "ProductCategorySub",
});

Product.belongsTo(ProductCategory, {
  foreignKey: "p_cate_id",
  as: "ProductCategory",
});

module.exports = Product;
