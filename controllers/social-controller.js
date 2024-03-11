const path = require("path");
const { SOCIAL_MEDIA_URL } = require("../utils/constant");
const Social = require("../models/social-model");
const status = require("../utils/http_status");

// Find Social
exports.FindAllSocial = async (req, res) => {
  let result = await Social.findAll({
    order: [["id", "DESC"]],
  });

  result = result.map((row) => {
    if (row.image) {
      row.dataValues.image = `${SOCIAL_MEDIA_URL}/${row.image}`;
    } else {
      row.dataValues.image = `${SOCIAL_MEDIA_URL}/logo.jpg`;
    }
    return row;
  });
  return res.send({ data: result, count: result.length });
};

// Find By Id
exports.findSocialById = async (req, res) => {
  let result = await Social.findOne({
    where: { id: req.params.id },
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (result.image) {
    result.dataValues.image = `${SOCIAL_MEDIA_URL}/${result.image}`;
  } else {
    result.dataValues.image = `${SOCIAL_MEDIA_URL}/logo.jpg`;
  }
  return res.send({ data: result });
};

// Create New Banner
exports.createNewSocial = async (req, res) => {
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
    image.mv(path.join(__dirname, `../uploads/images/socials/${filename}`));
    // result.image = filename;
    req.body.image = filename;
  }

  const newSocial = await Social.create(req.body);

  res.status(status.HTTP_CREATED).send(newSocial);
};

// Update Banner
exports.updateSocial = async (req, res) => {
  const id = req.params.id;
  let result = await Social.findByPk(id);
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
    image.mv(path.join(__dirname, `../uploads/images/socials/${filename}`));
    result.image = filename;
    // req.body.image = filename;
  }

  result.social_link = req.body.social_link;
  result.social_position = req.body.social_position;
  await result.save();

  res
    .status(status.HTTP_CREATED)
    .send({ data: result, msg: "Update Successfully...!" });
};

// Delete Banner
exports.deleteSocial = async (req, res) => {
  let result = await Social.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_BAD_REQUEST).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  await Social.destroy({ where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Delete Successfully...!" });
};
