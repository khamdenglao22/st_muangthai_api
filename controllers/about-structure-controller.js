const path = require("path");
const { ABOUT_STRUCTURE_MEDIA_URL } = require("../utils/constant");
const AboutStructure = require("../models/about-structure-model");
const status = require("../utils/http_status");

// Find AboutStructure
exports.FindAllAboutStructure = async (req, res) => {
  let result = await AboutStructure.findAll({
    order: [["id", "DESC"]],
  });

  result = result.map((row) => {
    if (row.image) {
      row.dataValues.image = `${ABOUT_STRUCTURE_MEDIA_URL}/${row.image}`;
    } else {
      row.dataValues.image = `${ABOUT_STRUCTURE_MEDIA_URL}/logo.jpg`;
    }
    return row;
  });
  return res.send({ data: result, count: result.length });
};

// Home page
exports.FindAllPageAboutStructure = async (req, res) => {
  let result = await AboutStructure.findAll({
    order: [["structure_order", "ASC"]],
  });

  result = result.map((row) => {
    if (row.image) {
      row.dataValues.image = `${ABOUT_STRUCTURE_MEDIA_URL}/${row.image}`;
    } else {
      row.dataValues.image = `${ABOUT_STRUCTURE_MEDIA_URL}/logo.jpg`;
    }
    return row;
  });
  return res.send({ data: result, count: result.length });
};

// Find By Id
exports.findAboutStructureById = async (req, res) => {
  let result = await AboutStructure.findOne({
    where: { id: req.params.id },
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (result.image) {
    result.dataValues.image = `${ABOUT_STRUCTURE_MEDIA_URL}/${result.image}`;
  } else {
    result.dataValues.image = `${ABOUT_STRUCTURE_MEDIA_URL}/logo.jpg`;
  }
  return res.send({ data: result });
};

// Create New AboutStructure
exports.createNewAboutStructure = async (req, res) => {
  if (!req.files.image) {
    return res.status(status.HTTP_BAD_REQUEST).send({
      msg: "ກະລຸນາອັບໂຫຼດຮູບພາບ",
    });
  }
  if (req.files && req.files.image) {
    const image = req.files.image;
    if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
      return res.status(statHTTP_BAD_REQUEST).send({
        msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
      });
    }
    const ext = path.extname(image.name);
    const filename = Date.now() + ext;
    image.mv(path.join(__dirname, `../uploads/images/about/${filename}`));
    req.body.image = filename;
  }

  const newAboutStructure = await AboutStructure.create(req.body);

  res.status(status.HTTP_CREATED).send(newAboutStructure);
};

// Update AboutStructure
exports.updateAboutStructure = async (req, res) => {
  // console.log(req.body)
  const id = req.params.id;
  let result = await AboutStructure.findByPk(id);
  if (!result) {
    return res.send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (req.files && req.files.image) {
    const image = req.files.image;
    if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
      return res.status(statHTTP_BAD_REQUEST).send({
        msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
      });
    }
    const ext = path.extname(image.name);
    const filename = Date.now() + ext;
    image.mv(path.join(__dirname, `../uploads/images/about/${filename}`));
    result.image = filename;
  }
  result.full_name_la = req.body.full_name_la;
  result.full_name_en = req.body.full_name_en;
  result.position_la = req.body.position_la;
  result.position_en = req.body.position_en;
  result.responsible_la = req.body.responsible_la;
  result.responsible_en = req.body.responsible_en;
  result.structure_order = req.body.structure_order;

  await result.save();
  res.send({ data: result, count: 1 });
};

exports.deleteStructureById = async (req, res) => {
  let result = await AboutStructure.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_BAD_REQUEST).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  await AboutStructure.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};
