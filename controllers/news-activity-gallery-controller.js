const path = require("path");
const { NEWS_GALLERY_MEDIA_URL } = require("../utils/constant");
const NewsActivity = require("../models/news-activity-model");
const NewsActivityGallery = require("../models/news-activity-gallery-model");
const status = require("../utils/http_status");
// 1 create References
exports.createNewsGallery = async (req, res) => {
  if (req.files && req.files.image) {
    // upload product image
    const image = req.files.image;
    if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
      return res.status(400).send({
        msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
      });
    }
    const ext = path.extname(image.name);
    const filename = Date.now() + ext;
    image.mv(
      path.join(__dirname, `../uploads/images/news-gallery/${filename}`)
    );
    req.body.image = filename;
    // req.body.image = image
  }

  // create new
  const newNewsActivity = await NewsActivityGallery.create(req.body);
  res.send({ status: 200, data: newNewsActivity, count: 1 });
};
// 2 get all References

exports.findByNewsActivityGalleryId = async (req, res) => {
  let result = await NewsActivityGallery.findAll({
    where: { news_id: req.params.id },
    order: [["id", "DESC"]],
  });
  result = result.map((our) => {
    if (our.image) {
      our.dataValues.image = `${NEWS_GALLERY_MEDIA_URL}/${our.image}`;
    } else {
      our.dataValues.image = `${NEWS_GALLERY_MEDIA_URL}/logo.jpg`;
    }
    return our;
  });

  res.send({ data: result, count: result.length });
};

// 5 delete our service
exports.deleteNewsActivityGallery = async (req, res) => {
  const id = req.params.id;
  const result = await NewsActivityGallery.destroy({ where: { id: id } });
  res.send({ status: 200, result, message: "Delete Successfully" });
};
