const path = require("path");
const status = require("../utils/http_status");
const Product = require("../models/product-model");
const ProductCategorySub = require("../models/product-category-sub-model");
const ProductCategory = require("../models/product-category-model");
const { PRODUCT_MEDIA_URL } = require("../utils/constant");
const ProductSection = require("../models/product-section-model");
const { Op } = require("sequelize");

exports.findAllProduct = async (req, res) => {
  const p_cate_sub_id = req.query.p_cate_sub_id;
  let filter = {};
  if (p_cate_sub_id) {
    filter = {
      [Op.or]: [
        {
          p_cate_sub_id: p_cate_sub_id
        },
      ],
    };
  }

  let result = await Product.findAll({
    order: [["id", "DESC"]],
    where: { ...filter },
    include: {
      model: ProductCategorySub,
      as: "ProductCategorySub",
      include: {
        model: ProductCategory,
        as: "ProductCategory",
      },
    },
  });

  result = result.map((img) => {
    if (img.p_image) {
      img.dataValues.p_image = `${PRODUCT_MEDIA_URL}/${img.p_image}`;
    } else {
      img.dataValues.p_image = `${PRODUCT_MEDIA_URL}/logo.jpg`;
    }
    return img;
  });

  return res.send({ data: result, count: result.length });
};

exports.findProductById = async (req, res) => {
  let result = await Product.findOne({
    where: { id: req.params.id },
    // include: {},
    include: [
      {
        model: ProductSection,
        as: "Sections",
      },
      {
        model: ProductCategorySub,
        as: "ProductCategorySub",
        include: {
          model: ProductCategory,
          as: "ProductCategory",
        },
      },
    ],
  });

  if (result.p_image) {
    result.dataValues.p_image = `${PRODUCT_MEDIA_URL}/${result.p_image}`;
  } else {
    result.dataValues.p_image = `${PRODUCT_MEDIA_URL}/logo.jpg`;
  }

  for (const section of result.Sections) {
    if (section.p_section_image) {
      section.dataValues.p_section_image = `${PRODUCT_MEDIA_URL}/${section.p_section_image}`;
    }
  }

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.createProduct = async (req, res) => {
  if (req.files && req.files.p_image) {
    const image = req.files.p_image;
    if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
      return res.status(400).send({
        msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
      });
    }
    const ext = path.extname(image.name);
    const filename = Date.now() + ext;
    image.mv(path.join(__dirname, `../uploads/images/products/${filename}`));
    req.body.p_image = filename;
  }

  const newProduct = await Product.create(req.body);
  const sections = [...JSON.parse(req.body.sectionList)];

  if (sections.length != 0) {
    for (let i = 0; i < sections.length; i++) {
      console.log(sections[i]);
      sections[i].p_id = newProduct.id;

      if (req.files && req.files["p_section_image_" + i]) {
        const image = req.files["p_section_image_" + i];
        if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
          return res.status(400).send({
            msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
          });
        }
        const ext = path.extname(image.name);
        const filename = Date.now() + ext;
        image.mv(
          path.join(__dirname, `../uploads/images/products/${filename}`)
        );
        sections[i].p_section_image = filename;
      }

      if (sections[i].p_section_outline == null) {
        sections[i].p_section_outline = 0;
      }

      const newProductSection = await ProductSection.create(sections[i]);
    }
  }

  return res
    .status(status.HTTP_SUCCESS)
    .send({ status: 200, data: newProduct });
};

exports.updateProduct = async (req, res) => {
  let p_id = req.params.id;

  const deleteSectionId = [...JSON.parse(req.body.deleteSectionId)];
  const sections = [...JSON.parse(req.body.sectionList)];

  // Delete Product Section By Id
  for (let deleteSectionById of deleteSectionId) {
    await ProductSection.destroy({ where: { id: deleteSectionById } });
  }

  const result = await Product.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  //   Upload Product Image
  if (req.files && req.files.p_image) {
    const image = req.files.p_image;
    if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
      return res.status(400).send({
        msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
      });
    }
    const ext = path.extname(image.name);
    const filename = Date.now() + ext;
    image.mv(path.join(__dirname, `../uploads/images/products/${filename}`));
    result.p_image = filename;
  }

  result.p_name_la = req.body.p_name_la;
  result.p_name_en = req.body.p_name_en;
  result.p_cate_id = req.body.p_cate_id;
  result.p_cate_sub_id = req.body.p_cate_sub_id;
  result.p_order = req.body.p_order;
  const updateProduct = await result.save();

  if (updateProduct) {
    // console.log("update product = ", updateProduct);
    for (let i = 0; i < sections.length; i++) {
      const updateSection = await ProductSection.findByPk(
        sections[i].p_section_id
      );
      if (!updateSection) {
        sections[i].p_id = p_id;

        if (req.files && req.files["p_section_image_" + i]) {
          const image = req.files["p_section_image_" + i];
          if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
            return res.status(400).send({
              msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
            });
          }
          const ext = path.extname(image.name);
          const filename = Date.now() + ext;
          image.mv(
            path.join(__dirname, `../uploads/images/products/${filename}`)
          );
          sections[i].p_section_image = filename;
        }

        if (sections[i].p_section_outline == null) {
          sections[i].p_section_outline = 0;
        }

        await ProductSection.create(sections[i]);
      } else {
        //   Upload Section Image
        if (req.files && req.files["p_section_image_" + i]) {
          const image = req.files["p_section_image_" + i];
          if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
            return res.status(400).send({
              msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
            });
          }
          const ext = path.extname(image.name);
          const filename = Date.now() + ext;
          image.mv(
            path.join(__dirname, `../uploads/images/products/${filename}`)
          );
          updateSection.p_section_image = filename;
        }
        updateSection.p_section_name_la = sections[i].p_section_name_la;
        updateSection.p_section_name_en = sections[i].p_section_name_en;
        updateSection.p_section_title_la = sections[i].p_section_title_la;
        updateSection.p_section_title_en = sections[i].p_section_title_en;
        updateSection.p_section_order = sections[i].p_section_order;
        updateSection.p_section_outline = sections[i].p_section_outline;
        updateSection.p_section_des = sections[i].p_section_des;

        await updateSection.save();
      }
    }
  }

  return res
    .status(status.HTTP_SUCCESS)
    .send({ status: 200, msg: "Update Successfully...!" });
};

exports.deleteProduct = async (req, res) => {
  const result = await Product.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  await Product.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};
