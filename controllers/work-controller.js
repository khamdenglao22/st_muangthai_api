const Work = require("../models/work-model");
const status = require("../utils/http_status");
const { workSchema } = require("../schemas/work_schema");
const { Op } = require("sequelize");
const Province = require("../models/province-model");
const { WORK_MEDIA_URL } = require("../utils/constant");
const path = require("path");

exports.findAllWork = async (req, res) => {
  let result = await Work.findAll({
    order: [["id", "DESC"]],
    include: {
      model: Province,
      as: "Province",
    },
  });

  result = result.map((row) => {
    if (row.image) {
      row.dataValues.image = `${WORK_MEDIA_URL}/${row.image}`;
    } else {
      row.dataValues.image = `${WORK_MEDIA_URL}/logo.jpg`;
    }
    return row;
  });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.findWorkById = async (req, res) => {
  const checked = await Work.findByPk(req.params.id);
  if (!checked) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  let result = await Work.findOne({
    where: { id: req.params.id },
    include: {
      model: Province,
      as: "Province",
    },
  });

  if (result.image) {
    result.dataValues.image = `${WORK_MEDIA_URL}/${result.image}`;
  } else {
    result.dataValues.image = `${WORK_MEDIA_URL}/logo.jpg`;
  }

  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.createWork = async (req, res) => {
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
    image.mv(path.join(__dirname, `../uploads/images/work/${filename}`));
    // result.image = filename;
    req.body.image = filename;
  }

  const newWork = await Work.create(req.body);
  return res.status(status.HTTP_SUCCESS).send({ data: newWork });
};

exports.updateWork = async (req, res) => {
  const id = req.params.id;
  let result = await Work.findByPk(id);
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
    image.mv(path.join(__dirname, `../uploads/images/work/${filename}`));
    result.image = filename;
    // req.body.image = filename;
  }

  result.position_name_la = req.body.position_name_la;
  result.position_name_en = req.body.position_name_en;
  result.depart_name_la = req.body.depart_name_la;
  result.depart_name_en = req.body.depart_name_en;
  result.amount = req.body.amount;
  result.prov_cd = req.body.prov_cd;
  await result.save();

  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Update Successfully...!" });
};

exports.deleteWork = async (req, res) => {
  const result = await Work.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  await Work.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};
