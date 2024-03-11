const status = require("../utils/http_status");
const ProductCategory = require("../models/product-category-model");

exports.findAllProductCategory = async (req, res) => {
  let result = await ProductCategory.findAll({
    // order: [["id", "DESC"]],
  });
  return res.send({ data: result, count: result.length });
};

exports.findProductCategoryById = async (req, res) => {
  let result = await ProductCategory.findOne({
    where: { id: req.params.id },
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.createProductCategory = async (req, res) => {
  const checked = await ProductCategory.findOne({
    where: { name_la: req.body.name_la },
  });
  if (checked) {
    return res.send({
      msg: `Product Category ${req.body.name_la} ຂໍ້ມູນມີແລ້ວ`,
    });
  }

  const newProductCategory = await ProductCategory.create(req.body);
  return res.status(status.HTTP_SUCCESS).send({ data: newProductCategory });
};

exports.updateProductCategory = async (req, res) => {
  const result = await ProductCategory.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (
    result.name_la != req.body.name_la ||
    result.name_en != req.body.name_en
  ) {
    const checked = await ProductCategory.findOne({
      where: { name_la: req.body.name_la },
    });
    if (checked) {
      return res.send({
        msg: `Product Category ${req.body.name_la} ຂໍ້ມູນມີແລ້ວ`,
      });
    }
  }
  await ProductCategory.update(req.body, { where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Update Successfully...!" });
};

exports.deleteProductCategory = async (req, res) => {
  const result = await ProductCategory.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  await ProductCategory.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};
