const Joi = require('joi')

exports.sectionSchema = Joi.object({
    section_name_la: Joi.string().required(),
    section_name_en: Joi.string().required(),
})
