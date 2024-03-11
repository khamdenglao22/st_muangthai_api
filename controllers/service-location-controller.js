const ServiceLocation = require("../models/service-location-model");
const ServiceSection = require("../models/section-model");
const ServiceCountry = require("../models/service-country-model");
const ServicesType = require("../models/services-type-model");
const Village = require("../models/village-model");
const District = require("../models/district-model");
const Province = require("../models/province-model");

const status = require("../utils/http_status");
const { serviceLocationSchema } = require("../schemas/service_location_schema");
const { Op } = require("sequelize");

exports.findAllLocation = async (req, res) => {
  const result = await ServiceLocation.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: ServiceSection,
        as: "servicesSection",
      },
      {
        model: ServiceCountry,
        as: "Country",
      },
      {
        model: Village,
        as: "Village",
      },
      {
        model: District,
        as: "District",
      },
      {
        model: Province,
        as: "Province",
      },
    ],
  });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.findLocationById = async (req, res) => {
  const checked = await ServiceLocation.findByPk(req.params.id);
  if (!checked) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  const result = await ServiceLocation.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: ServiceSection,
        as: "servicesSection",
      },

      {
        model: ServiceCountry,
        as: "Country",
      },

      {
        model: Village,
        as: "Village",
      },
      {
        model: District,
        as: "District",
      },
      {
        model: Province,
        as: "Province",
      },
    ],
  });
  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.findByProvAndCountry = async (req, res) => {
  const country_id = req.query.country_id;
  const result = await ServiceLocation.findAll({
    where: {
      [Op.and]: [
        {
          country_id: country_id,
        },
        {
          province_id: req.query.province_id,
        },
      ],
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: ServiceSection,
        as: "servicesSection",
      },
      {
        model: ServiceCountry,
        as: "Country",
      },
      {
        model: Village,
        as: "Village",
      },
      {
        model: District,
        as: "District",
      },
      {
        model: Province,
        as: "Province",
      },
    ],
  });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.findByProvAndSectionId = async (req, res) => {
  const country_id = req.query.country_id;
  const result = await ServiceLocation.findAll({
    where: {
      [Op.and]: [
        {
          country_id: country_id,
        },
        {
          section_id: req.query.section_id,
        },
      ],
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: ServiceSection,
        as: "servicesSection",
      },
      {
        model: ServiceCountry,
        as: "Country",
      },
    ],
  });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.createLocation = async (req, res) => {
  const validate = serviceLocationSchema.validate(req.body);
  if (!validate) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }

  const newLocation = await ServiceLocation.create(req.body);
  return res.status(status.HTTP_SUCCESS).send({ data: "newLocation" });
};

exports.updateLocation = async (req, res) => {
  // console.log("=======", req.body);

  const result = await ServiceLocation.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  const validate = serviceLocationSchema.validate(req.body);
  if (!validate) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }

  await ServiceLocation.update(req.body, { where: { id: req.params.id } });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Update Successfully...!" });
};

exports.deleteLocation = async (req, res) => {
  const result = await ServiceLocation.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  await ServiceLocation.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};
