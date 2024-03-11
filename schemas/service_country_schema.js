const Joi = require('joi')

exports.serviceCountrySchema = Joi.object({
    country_name_la: Joi.string().required(),
    country_name_en: Joi.string().required(),
    service_type_id: Joi.number().required(),
})
