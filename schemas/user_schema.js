const Joi = require('joi')

exports.userCreateSchema = Joi.object({
    fullname_la: Joi.string().required(),
    fullname_en: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    role_id: Joi.number().required(),
})

exports.userUpdateSchema = Joi.object({
    fullname_la: Joi.string().required(),
    fullname_en: Joi.string().required(),
    username: Joi.string().required(),
    role_id: Joi.number().required(),
    active: Joi.boolean().required(),
})

exports.changePasswordSchema = Joi.object({
    password: Joi.string().required()
})