const path = require("path");
const { NEWS_MEDIA_URL, NEWS_GALLERY_MEDIA_URL } = require("../utils/constant");
const NewsActivity = require("../models/news-activity-model");
const NewsActivityGallery = require("../models/news-activity-gallery-model");
const status = require("../utils/http_status");
// 1 create References
exports.createNews = async (req, res) => {
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
    image.mv(path.join(__dirname, `../uploads/images/news/${filename}`));
    req.body.image = filename;
    // req.body.image = image
  }

  if (req.files && req.files.news_video) {
    // upload product image
    const video = req.files.news_video;
    // if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
    //   return res.status(400).send({
    //     msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
    //   });
    // }
    const ext = path.extname(video.name);
    const filename = Date.now() + ext;
    video.mv(path.join(__dirname, `../uploads/images/news/${filename}`));
    req.body.news_video = filename;
  }

  // create new
  const newNewsActivity = await NewsActivity.create(req.body);
  res.send({ status: 200, data: newNewsActivity, count: 1 });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: dataAll } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, dataAll, totalPages, currentPage };
};

// 2 get all References

exports.findAllNewsActivity = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  await NewsActivity.findAndCountAll({
    // let result = await NewsActivity.findAll({
    order: [["id", "DESC"]],
    limit,
    offset,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      response.dataAll = response.dataAll.map((our) => {
        if (our.image) {
          our.dataValues.image = `${NEWS_MEDIA_URL}/${our.image}`;
        } else {
          our.dataValues.image = `${NEWS_MEDIA_URL}/logo.jpg`;
        }
        return our;
      });

      response.dataAll = response.dataAll.map((our) => {
        if (our.news_video) {
          our.dataValues.news_video = `${NEWS_MEDIA_URL}/${our.news_video}`;
        } else {
          our.dataValues.news_video = `${NEWS_MEDIA_URL}/logo.jpg`;
        }
        return our;
      });

      // res.send({ data: result, count: result.length });
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find News Active True

exports.findAllNewsActive = async (req, res) => {
  // await NewsActivity.findAll({
  let result = await NewsActivity.findAll({
    order: [["id", "DESC"]],
    where: { active: true },
  });

  result = result.map((our) => {
    if (our.image) {
      our.dataValues.image = `${NEWS_MEDIA_URL}/${our.image}`;
    } else {
      our.dataValues.image = `${NEWS_MEDIA_URL}/logo.jpg`;
    }
    return our;
  });

  result = result.map((our) => {
    if (our.news_video) {
      our.dataValues.news_video = `${NEWS_MEDIA_URL}/${our.news_video}`;
    } else {
      our.dataValues.news_video = `${NEWS_MEDIA_URL}/logo.jpg`;
    }
    return our;
  });

  res.send({ data: result, count: result.length });
};

// 3 update References

exports.updateNewsActivity = async (req, res) => {
  const result = await NewsActivity.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
  }

  if (req.files && req.files.image) {
    // upload product image
    const image = req.files.image;
    if (!["image/jpeg", "image/png"].includes(image.mimetype)) {
      return res.status(statHTTP_BAD_REQUEST).send({
        msg: "ຕ້ອງເປັນໄຟລ jpeg, png ເທົ່ານັ້ນ",
      });
    }
    const ext = path.extname(image.name);
    const filename = Date.now() + ext;
    image.mv(path.join(__dirname, `../uploads/images/news/${filename}`));
    result.image = filename;
  }

  if (req.files && req.files.news_video) {
    // upload product image
    const video = req.files.news_video;
    const ext = path.extname(video.name);
    const filename = Date.now() + ext;
    video.mv(path.join(__dirname, `../uploads/images/news/${filename}`));
    result.news_video = filename;
  }

  result.title_la = req.body.title_la;
  result.title_en = req.body.title_en;
  result.description_la = req.body.description_la;
  result.description_en = req.body.description_en;
  result.to_date = req.body.to_date;
  result.end_date = req.body.end_date;

  await result.save();
  res.send({ data: result, count: 1 });
};

// 4 References By Id

exports.findNewsActivityById = async (req, res) => {
  const result = await NewsActivity.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: NewsActivityGallery,
        as: "gallery",
      },
    ],
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (result.image) {
    result.dataValues.image = `${NEWS_MEDIA_URL}/${result.image}`;
  } else {
    result.dataValues.image = `${NEWS_MEDIA_URL}/logo.jpg`;
  }

  for (const gall of result.gallery) {
    if (gall.image) {
      gall.dataValues.image = `${NEWS_GALLERY_MEDIA_URL}/${gall.image}`;
    } else {
      gall.dataValues.image = `${NEWS_GALLERY_MEDIA_URL}/logo.jpg`;
    }
  }

  if (result.news_video) {
    result.dataValues.news_video = `${NEWS_MEDIA_URL}/${result.news_video}`;
  } else {
    result.dataValues.news_video = `${NEWS_MEDIA_URL}/logo.jpg`;
  }

  res.send({ data: result, count: 1 });
};

// 5 delete our service
exports.deleteNewsActivity = async (req, res) => {
  const id = req.params.id;
  const result = await NewsActivity.destroy({ where: { id: id } });
  res.send({ status: 200, result, message: "Delete Successfully" });
};

// update news active
exports.updateNewsActive = async (req, res) => {
  const result = await NewsActivity.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
  }
  result.active = req.body.active;

  await result.save();
  res.send({ data: result, count: 1 });
};
