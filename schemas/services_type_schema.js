const Joi = require('joi')

exports.servicesTypeSchema = Joi.object({
    service_type_la: Joi.string().required(),
    service_type_en: Joi.string().required(),
})