const sequelize = require("../config/index");
const { DataTypes } = require("sequelize");
const Product = require("./product-model");

const ProductOrder = sequelize.define(
  "Product_Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    full_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    p_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    tableName: "product-order",
    timestamps: false,
  }
);

ProductOrder.belongsTo(Product, { foreignKey: 'p_id', as: 'Product' });


module.exports = ProductOrder;
