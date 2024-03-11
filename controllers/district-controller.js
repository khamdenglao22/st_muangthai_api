const status = require("../utils/http_status")
const { Op } = require("sequelize");
const District = require("../models/district-model");
const ServiceCountry = require("../models/service-country-model");
const Province = require("../models/province-model");

exports.findAllDistrict = async (req, res) => {
  const prov_cd = req.query.prov_cd;
  let filter = {};
  if (prov_cd) {
    filter = {
      [Op.or]: [
        {
          prov_cd: { [Op.like]: `%${prov_cd}%` },
        },
      ],
    };
  }
  let result = await District.findAll({
    order: [["dist_cd", "DESC"]],
    where: { ...filter},
    include: {
      model: Province,
      as: "Province",
      include: {
        model: ServiceCountry,
        as: "Country",
      },
    },
  });
  return res.status(status.HTTP_SUCCESS).send({data:result, count:result.length})
};

exports.findDistrictById = async (req, res) => {
  const result = await District.findOne({
    where: { dist_cd: req.params.id },
    include: {
      model: Province,
      as: "Province",
      include: {
        model: ServiceCountry,
        as: "Country",
      },
    },
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.createDistrict = async (req, res) => {
  const result = await District.findAll();
  const data = result.map((row) => {
    return row.dist_cd;
  });
  let new_dist_cd = Math.max(...data);
  req.body.dist_cd = new_dist_cd + 1;

  const checked = await District.findOne({
    where: {
      [Op.and]: [
        {
          prov_cd: req.body.prov_cd,
        },
        {
          dist_name_la: req.body.dist_name_la,
        },
      ],
    },
  });
  if (checked) {
    return res.send({
      msg: `District: ${req.body.dist_name_la} ຂໍ້ມູນມີແລ້ວ`,
    });
  }

  const newDistrict = await District.create(req.body);
  if (newDistrict) {
    return res.status(status.HTTP_SUCCESS).send({status:200, data: newDistrict });
  }
};

exports.updateDistrict = async (req, res) => {
  const checked = await District.findByPk(req.params.id);
  if (!checked) {
    return res.status(status.HTTP_NO_CONTENT).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  const updateDistrict = await District.update(req.body, {
    where: { dist_cd: req.params.id },
  });
  if (updateDistrict > 0) {
    return res
      .status(status.HTTP_SUCCESS)
      .send({ msg: "Update Successfully...!" });
  }
};