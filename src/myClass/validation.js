const Joi = require('joi')
const user = require('../model/user')

const createUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
    confirm_password: Joi.ref("password")
})

const logout = Joi.object({
    
}) 

const authValidator = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.required()
})



module.exports = {
    createUserValidator,
    authValidator
}