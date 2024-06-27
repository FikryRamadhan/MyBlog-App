// Model
const user = require('../model/user')
const { responseError, responseSuccess } = require('../myClass/response')
const bcrypt = require('bcrypt')

// Validation
const validations = require("../myClass/validation")

const getAllUsers = async (req, res) => {
    try {
        const [ data ] = await user.getAll()

        return responseSuccess(res, "Operation success", data)
    } catch (error) {
        return responseError(res, error.message)
    }
}

const createUser = async (req, res) => {
    try {
        validations.validationCreateUser(res, req.body)
        const [data] = await user.create(req.body)
        const [dataUser] = await user.getById(data.insertId)

        return responseSuccess(res, "Operation success", {
            ...req.body,
            role: dataUser[0].role,
            created_at: dataUser[0].created_at
        })
    } catch (error) {
        console.log(error.message);
        return responseError(res, "")
    }
}

module.exports = {
    getAllUsers,
    createUser
}