const Province = require("../models/province-model");
const { sectionSchema } = require("../schemas/section_schema");
const status = require("../utils/http_status");
const { Op, Sequelize } = require("sequelize");
const District = require("../models/district-model");

exports.findAllProvince = async (req, res) => {
  const country_id = req.query.country_id;
  let filter = {};
  if (country_id) {
    filter = {
      [Op.or]: [
        {
          country_id: { [Op.like]: `%${country_id}%` },
        },
      ],
    };
  }
  const result = await Province.findAll({
    order: [["prov_cd", "ASC"]],
    where: { ...filter },
  });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.findProvinceById = async (req, res) => {
  const result = await Province.findOne({
    where: { prov_cd: req.params.id },
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.createProvince = async (req, res) => {
  const result = await Province.findAll();
  const data = result.map((row) => {
    return row.prov_cd;
  });
  let new_prov_cd = Math.max(...data);
  req.body.prov_cd = new_prov_cd + 1;

  const checked = await Province.findOne({
    where: {
      prov_name_la: req.body.prov_name_la,
    },
  });
  if (checked) {
    return res.send({
      msg: `Province: ${req.body.prov_name_la} ຂໍ້ມູນມີແລ້ວ`,
    });
  }

  const newProvince = await Province.create(req.body);
  if (newProvince) {
    return res
      .status(status.HTTP_SUCCESS)
      .send({ status: 200, data: newProvince });
  }
};

exports.updateProvince = async (req, res) => {
  const checked = await Province.findByPk(req.params.id);
  if (!checked) {
    return res.status(status.HTTP_NO_CONTENT).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  const updateProvince = await Province.update(req.body, {
    where: { prov_cd: req.params.id },
  });
  if (updateProvince > 0) {
    return res
      .status(status.HTTP_SUCCESS)
      .send({ msg: "Update Successfully...!" });
  }
};
