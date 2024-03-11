const path = require("path");
const { BANNER_MEDIA_URL } = require("../utils/constant");
const BannerAdvertising = require("../models/banner-advertising-model");
const status = require("../utils/http_status");

// Find Banner
exports.FindAllBannerAdvertising = async (req, res) => {
  let result = await BannerAdvertising.findAll({
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
exports.findBannerAdvertisingById = async (req, res) => {
  let result = await BannerAdvertising.findOne({
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

// Create New BannerAdvertising
exports.createNewBannerAdvertising = async (req, res) => {
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

  const newBannerAdvertising = await BannerAdvertising.create(req.body);

  res.status(status.HTTP_CREATED).send(newBannerAdvertising);
};

// Update BannerAdvertising
exports.updateBannerAdvertising = async (req, res) => {
  const id = req.params.id;
  let result = await BannerAdvertising.findByPk(id);
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

  result.banner_advertising_position = req.body.banner_advertising_position;

  await result.save();
  res.send({ data: result, count: 1 });
};

// Delete BannerAdvertising
exports.deleteBannerAdvertising = async (req, res) => {
  let result = await BannerAdvertising.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_BAD_REQUEST).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  await BannerAdvertising.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};

exports.updateBannerAdvertisingActive = async (req, res) => {
    const result = await BannerAdvertising.findByPk(req.params.id);
    if (!result) {
      return res.status(status.HTTP_NOT_FOUND).send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
    }
    result.active = req.body.active;
  
    await result.save();
    res.send({ data: result, count: 1 });
  };


//   Find All Banner Advertising Active
exports.findAllBannerAdvertisingActive = async (req, res) => {
    let result = await BannerAdvertising.findAll({
      order: [["id", "DESC"]],
      where: { active: true },
    });
  
    result = result.map((our) => {
      if (our.image) {
        our.dataValues.image = `${BANNER_MEDIA_URL}/${our.image}`;
      } else {
        our.dataValues.image = `${BANNER_MEDIA_URL}/logo.jpg`;
      }
      return our;
    });
  
    res.send({ data: result, count: result.length });
  };
