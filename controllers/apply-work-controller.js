const path = require("path");
const status = require("../utils/http_status");
const { Op } = require("sequelize");
const Work = require("../models/work-model");
const ApplyWork = require("../models/apply-work-model");
const { APPLY_WORK_MEDIA_URL } = require("../utils/constant");

exports.findAllApplyWork = async (req, res) => {
  let result = await ApplyWork.findAll({
    order: [["id", "DESC"]],
    include: { model: Work, as: "Work" },
  });

  result = result.map((row) => {
    if (row.file_name) {
      row.dataValues.file_name = `${APPLY_WORK_MEDIA_URL}/${row.file_name}`;
    } else {
      row.dataValues.file_name = `${APPLY_WORK_MEDIA_URL}/logo.jpg`;
    }
    return row;
  });

  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.createApplyWork = async (req, res) => {
    console.log(req.files)
  if (req.files && req.files.file_name) {
    const image = req.files.file_name;
    // if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
    //   return res.status(statHTTP_BAD_REQUEST).send({
    //     msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
    //   });
    // }
    const ext = path.extname(image.name);
    const filename = Date.now() + ext;
    image.mv(path.join(__dirname, `../uploads/pdf/apply-work/${filename}`));
    req.body.file_name = filename;
  }

  const newApplyWork = await ApplyWork.create(req.body);
  return res.status(status.HTTP_SUCCESS).send({ data: newApplyWork });
};
