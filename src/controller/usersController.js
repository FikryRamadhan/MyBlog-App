// Model
const user = require('../model/user')
const { responseError, responseSuccess, responseValidate } = require('../myClass/response')
const bcrypt = require('bcrypt')

// Validation
const { createUserValidator } = require("../myClass/validation")

const getAllUsers = async (req, res) => {
    try {
        const [ data ] = await user.getAll()

        return responseSuccess(res, "Operation success", data)
    } catch (error) {
        if (error.isJoi === true) responseValidate(res, error.message) 
        return responseError(res, error.message)
    }
}

const createUser = async (req, res) => {
    try {
        const result = await createUserValidator.validateAsync(req.body)
        const [data] = await user.create(result)
        const [dataUser] = await user.getById(data.insertId)

        return responseSuccess(res, "Operation success", {
            ...result,
            role: dataUser[0].role,
            created_at: dataUser[0].created_at
        })
    } catch (error) {
        return responseError(res, error.message)
    }
}

module.exports = {
    getAllUsers,
    createUser
}