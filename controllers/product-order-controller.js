const path = require("path");
const status = require("../utils/http_status");
const { Op } = require("sequelize");
const ProductOrder = require("../models/product-order-model");
const Product = require("../models/product-model");

exports.findAllProductOrder = async (req, res) => {
  let result = await ProductOrder.findAll({
    order: [["id", "DESC"]],
    include: { model: Product, as: "Product" },
  });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.createProductOrder = async (req, res) => {
  const newProductOrder = await ProductOrder.create(req.body);
  return res.status(status.HTTP_SUCCESS).send({status:200, data: newProductOrder });
};
