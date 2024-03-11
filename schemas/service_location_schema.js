const Joi = require('joi')

exports.serviceLocationSchema = Joi.object({
    location_name_la: Joi.string().required(),
    location_name_en: Joi.string().required(),
    section_id: Joi.number().required(),
})