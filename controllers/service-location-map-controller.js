const path = require("path");
const { LOCATION_MAP_MEDIA_URL } = require("../utils/constant");
const LocationMap = require("../models/service-location-map-model");
const status = require("../utils/http_status");
const ServiceSection = require("../models/section-model");
const Province = require("../models/province-model");
const ServiceCountry = require("../models/service-country-model");
const ServicesType = require("../models/services-type-model");

// Find Social
exports.FindAllLocationMap = async (req, res) => {
  let result = await LocationMap.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: ServiceSection,
        as: "Section",
      },
      {
        model: Province,
        as: "Province",
      },

      {
        model: ServiceCountry,
        as: "Country",
        // include: {
        //   model: ServicesType,
        //   as: "serviceCountry",
        // },
      },
    ],
  });
  result = result.map((row) => {
    if (row.image) {
      row.dataValues.image = `${LOCATION_MAP_MEDIA_URL}/${row.image}`;
    } else {
      row.dataValues.image = `${LOCATION_MAP_MEDIA_URL}/logo.jpg`;
    }
    return row;
  });
  return res.send({ data: result, count: result.length });
};

// Find By Id
exports.findLocationMapById = async (req, res) => {
  let result = await LocationMap.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: ServiceCountry,
        as: "Country",
      },
      {
        model: ServiceSection,
        as: "Section",
      },
      {
        model: Province,
        as: "Province",
      },
    ],
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (result.image) {
    result.dataValues.image = `${LOCATION_MAP_MEDIA_URL}/${result.image}`;
  } else {
    result.dataValues.image = `${LOCATION_MAP_MEDIA_URL}/logo.jpg`;
  }
  return res.send({ data: result });
};


// Find By province Id 

exports.findLocationMapByProvinceId = async (req, res) => {
    let result = await LocationMap.findOne({
      where: { province_id: req.query.province_id },
    });
  
    if (!result) {
      return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
    }
  
    if (result.image) {
      result.dataValues.image = `${LOCATION_MAP_MEDIA_URL}/${result.image}`;
    } else {
      result.dataValues.image = `${LOCATION_MAP_MEDIA_URL}/logo.jpg`;
    }
    return res.send({ data: result });
  };


//   Find By Section Id 

exports.findLocationMapBySectionId = async (req, res) => {
    let result = await LocationMap.findOne({
      where: { section_id: req.query.section_id },
    });
  
    if (!result) {
      return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
    }
  
    if (result.image) {
      result.dataValues.image = `${LOCATION_MAP_MEDIA_URL}/${result.image}`;
    } else {
      result.dataValues.image = `${LOCATION_MAP_MEDIA_URL}/logo.jpg`;
    }
    return res.send({ data: result });
  };

// Create New Banner
exports.createLocationMap = async (req, res) => {
  console.log(req.body);
  if (req.files && req.files.image) {
    const image = req.files.image;
    if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
      return res.status(statHTTP_BAD_REQUEST).send({
        msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
      });
    }
    const ext = path.extname(image.name);
    const filename = Date.now() + ext;
    image.mv(
      path.join(__dirname, `../uploads/images/location-map/${filename}`)
    );
    // result.image = filename;
    req.body.image = filename;
  }

  const newMap = await LocationMap.create(req.body);

  res.status(status.HTTP_CREATED).send(newMap);
};

// Update Banner
exports.updateLocationMap = async (req, res) => {
  const id = req.params.id;
  let result = await LocationMap.findByPk(id);
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
    image.mv(
      path.join(__dirname, `../uploads/images/location-map/${filename}`)
    );
    result.image = filename;
  }

  result.province_id = req.body.province_id;
  result.section_id = req.body.section_id;
  result.country_id = req.body.country_id;
  await result.save();

  res
    .status(status.HTTP_CREATED)
    .send({ data: result, msg: "Update Successfully...!" });
};

// Delete Banner
exports.deleteSocial = async (req, res) => {
  let result = await LocationMap.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_BAD_REQUEST).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  await LocationMap.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};
