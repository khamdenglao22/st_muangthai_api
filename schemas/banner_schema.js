const Joi = require('joi')

exports.bannerSchema = Joi.object({
    image: Joi.string().required(),
})