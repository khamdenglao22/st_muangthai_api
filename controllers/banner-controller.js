const path = require("path");
const { BANNER_MEDIA_URL } = require("../utils/constant");
const Banner = require("../models/banner-model");
const { bannerSchema } = require("../schemas/banner_schema");
const status = require("../utils/http_status");

// Find Banner
exports.FindAllBanner = async (req, res) => {
  let result = await Banner.findAll({
    order: [["id", "DESC"]],
  });

  result = result.map((row) => {
    if (row.image) {
      row.dataValues.image = `${BANNER_MEDIA_URL}/${row.image}`;
    } else {
      row.dataValues.image = `${BANNER_MEDIA_URL}/logo.jpg`;
    }
    return row;
  });
  return res.send({ data: result, count: result.length });
};

// Find By Id
exports.findBannerById = async (req, res) => {
  let result = await Banner.findOne({
    where: { id: req.params.id },
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (result.image) {
    result.dataValues.image = `${BANNER_MEDIA_URL}/${result.image}`;
  } else {
    result.dataValues.image = `${BANNER_MEDIA_URL}/logo.jpg`;
  }
  return res.send({ data: result });
};

// Create New Banner
exports.createNewBanner = async (req, res) => {
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
    image.mv(path.join(__dirname, `../uploads/images/banners/${filename}`));
    // result.image = filename;
    req.body.image = filename;
  }

  const newBanner = await Banner.create(req.body);

  res.status(status.HTTP_CREATED).send(newBanner);
};

// Update Banner
exports.updateBanner = async (req, res) => {
  const id = req.params.id;
  let result = await Banner.findByPk(id);
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
    image.mv(path.join(__dirname, `../uploads/images/banners/${filename}`));
    result.image = filename;
  }

  result.banner_position = req.body.banner_position;

  await result.save();
  res.send({ data: result, count: 1 });
};

// Delete Banner
exports.deleteBanner = async (req, res) => {
  let result = await Banner.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_BAD_REQUEST).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  await Banner.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};
