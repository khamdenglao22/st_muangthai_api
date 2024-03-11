const Joi = require('joi')

exports.workSchema = Joi.object({
    position_name_la: Joi.string().required(),
    position_name_en: Joi.string().required(),
    depart_name_la: Joi.string().required(),
    depart_name_en: Joi.string().required(),
})