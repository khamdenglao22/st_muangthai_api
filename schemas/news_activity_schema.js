const Joi = require("joi");

exports.newActivitySchema = Joi.object({
  title_la: Joi.string().required(),
  title_en: Joi.string().required(),
  description_la: Joi.string().required(),
  description_en: Joi.string().required(),
  to_date: Joi.date().required(),
  end_date: Joi.date().required(),
  image: Joi.string().required(),
});
