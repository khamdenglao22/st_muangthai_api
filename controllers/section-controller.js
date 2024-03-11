const ServiceSection = require("../models/section-model");
const { sectionSchema } = require("../schemas/section_schema");
const ServiceCountry = require("../models/service-country-model");
const status = require("../utils/http_status");
const { Op } = require("sequelize");

exports.findAllSection = async (req, res) => {
  const result = await ServiceSection.findAll({
    order: [["id", "DESC"]],
  });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.findSectionById = async (req, res) => {
  const result = await ServiceSection.findOne({
    where: { id: req.params.id },
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.createSection = async (req, res) => {
  const checked = await ServiceSection.findOne({
    where: {
      section_name_la: req.body.section_name_la,
    },
  });
  if (checked) {
    return res.status(status.HTTP_NO_CONTENT).send({
      msg: `Section: ${req.body.section_name_la} ຂໍ້ມູນມີແລ້ວ`,
    });
  }

  const newSection = await ServiceSection.create(req.body);
  if (newSection) {
    return res.status(status.HTTP_SUCCESS).send({ data: newSection });
  }
};

exports.updateSection = async (req, res) => {
  const checked = await ServiceSection.findByPk(req.params.id);
  if (!checked) {
    return res.status(status.HTTP_NO_CONTENT).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  const updateSection = await ServiceSection.update(req.body, {
    where: { id: req.params.id },
  });
  if (updateSection > 0) {
    return res
      .status(status.HTTP_SUCCESS)
      .send({ msg: "Update Successfully...!" });
  }
};

exports.deleteSection = async (req, res) => {
  const checked = await ServiceSection.findByPk(req.params.id);
  if (!checked) {
    return res.status(status.HTTP_NO_CONTENT).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  const deleteSection = await ServiceSection.destroy({
    where: { id: req.params.id },
  });
  console.log(deleteSection);
  if (deleteSection > 0) {
    return res
      .status(status.HTTP_SUCCESS)
      .send({ msg: "Delete Successfully...!" });
  }
};

exports.findAllSectionFrontend = async (req, res) => {
  const result = await ServiceSection.findAll({
    order: [["section_position", "DESC"]],
  });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};
