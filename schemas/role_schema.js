const Joi = require('joi')

exports.roleCreateSchema = Joi.object({
    role_name_la: Joi.string().required(),
    role_name_en: Joi.string().required(),
})