const status = require("../utils/http_status");
const ProductCategorySub = require("../models/product-category-sub-model");
const ProductCategory = require("../models/product-category-model");

exports.findAllProductCategorySub = async (req, res) => {
  let result = await ProductCategorySub.findAll({
    order: [["id", "DESC"]],
    include:{
        model:ProductCategory,
        as:"ProductCategory"
    }
  });
  return res.send({ data: result, count: result.length });
};

exports.findProductCategorySubById = async (req, res) => {
  let result = await ProductCategorySub.findOne({
    where: { id: req.params.id },
    include:{
        model:ProductCategory,
        as:"ProductCategory"
    }
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.createProductCategorySub = async (req, res) => {
  const checked = await ProductCategorySub.findOne({
    where: { name_la: req.body.name_la },
  });
  if (checked) {
    return res.send({
      msg: `Product Category Sub ${req.body.name_la} ຂໍ້ມູນມີແລ້ວ`,
    });
  }

  const newProductCategorySub = await ProductCategorySub.create(req.body);
  return res.status(status.HTTP_SUCCESS).send({ data: newProductCategorySub });
};

exports.updateProductCategorySub = async (req, res) => {
  const result = await ProductCategorySub.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (
    result.name_la != req.body.name_la ||
    result.name_en != req.body.name_en
  ) {
    const checked = await ProductCategorySub.findOne({
      where: { name_la: req.body.name_la },
    });
    if (checked) {
      return res.send({
        msg: `Product Category Sub ${req.body.name_la} ຂໍ້ມູນມີແລ້ວ`,
      });
    }
  }
  await ProductCategorySub.update(req.body, { where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Update Successfully...!" });
};

exports.deleteProductCategorySub = async (req, res) => {
  const result = await ProductCategorySub.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  await ProductCategorySub.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};



exports.findAllOnChangeCategorySub = async (req, res) => {
  let result = await ProductCategorySub.findAll({
    where: {p_cate_id : req.params.id},
    order: [["p_cate_sub_position", "ASC"]],
  });
  return res.send({ data: result, count: result.length });
};
