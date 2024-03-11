const status = require("../utils/http_status");
const { Op } = require("sequelize");
const Village = require("../models/village-model");
const Province = require("../models/province-model");
const ServiceCountry = require("../models/service-country-model");

exports.findAllVillage = async (req, res) => {
  const dist_cd = req.query.dist_cd;
  let filter = {};
  if (dist_cd) {
    filter = {
      [Op.or]: [
        {
          dist_cd: { [Op.like]: `%${dist_cd}%` },
        },
      ],
    };
  }
  let result = await Village.findAll({
    order: [["vill_cd", "DESC"]],
    where: { ...filter },
  });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.findVillageById = async (req, res) => {
  const result = await Village.findOne({
    where: { vill_cd: req.params.id },
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

exports.createVillage = async (req, res) => {
  const result = await Village.findAll();
  const data = result.map((row) => {
    return row.vill_cd;
  });
  let new_vill_cd = Math.max(...data);
  req.body.vill_cd = new_vill_cd + 1;

  const checked = await Village.findOne({
    where: {
      [Op.and]: [
        {
          prov_cd: req.body.prov_cd,
        },
        {
          dist_cd: req.body.dist_cd,
        },
        {
          vill_name_la: req.body.vill_name_la,
        },
      ],
    },
  });
  if (checked) {
    return res.send({
      msg: `Village: ${req.body.vill_name_la} ຂໍ້ມູນມີແລ້ວ`,
    });
  }

  const newVillage = await Village.create(req.body);
  if (newVillage) {
    return res
      .status(status.HTTP_SUCCESS)
      .send({ status: 200, data: newVillage });
  }
};

exports.updateVillage = async (req, res) => {
  const checked = await Village.findByPk(req.params.id);
  if (!checked) {
    return res.status(status.HTTP_NO_CONTENT).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  const updateVillage = await Village.update(req.body, {
    where: { vill_cd: req.params.id },
  });
  if (updateVillage > 0) {
    return res
      .status(status.HTTP_SUCCESS)
      .send({ msg: "Update Successfully...!" });
  }
};
