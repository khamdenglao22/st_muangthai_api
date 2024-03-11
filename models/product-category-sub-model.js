const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const ProductCategory = require("./product-category-model");

const ProductCategorySub = sequelize.define(
  "ProductCategorySub",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_la: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    p_cate_sub_position: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    p_cate_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductCategory,
        key: "id",
      },
    },
  },
  {
    tableName: "product-category-sub",
    timestamps: false,
  }
);

ProductCategorySub.belongsTo(ProductCategory, {
  foreignKey: "p_cate_id",
  as: "ProductCategory",
});

// ProductCategory.hasMany(ProductCategorySub, { foreignKey: 'p_cate_id', as: 'CategorySub' });

module.exports = ProductCategorySub;
