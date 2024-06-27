const Joi = require('joi')
const validator = require('express-joi-validation')

const createUserValidator = Joi.object({
    name: Joi.string().required();
    
})



module.exports = {
    createUserValidator,
}