const user = require('../model/user.js')
const {authValidator, createUserValidator} = require('../myClass/validation.js')
const { responseError, responseSuccess, responseValidate, responseCookie } = require('../myClass/response')
const auth = require('../model/auth.js')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const login = async (req, res) => {
    try {
        const user = await authValidator.validateAsync(req.body);
        const [checkUser] = await auth.checkAuth(user.email);
        if(!checkUser[0]) return responseValidate(res, "User not found");

        const access_token = jwt.sign({
            id: checkUser[0].id,
            name: checkUser[0].name,
            email: checkUser[0].email
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '2m'
        })

        const refresh_token = jwt.sign({
            id: checkUser[0].id,
            name: checkUser[0].name,
            email: checkUser[0].email
        }, process.env.REFRESH_ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        const checkPassword = bcrypt.compareSync(user.password, checkUser[0].password);
       

        if (checkPassword === true) {
            const date = new Date()
            date.setDate(date.getDate () + 1)
            const oneDay = date.toISOString().slice(0, 10);
            await auth.saveToken(refresh_token, checkUser[0].id, oneDay, "Auth")

            responseCookie(res, "Refresh-Token", refresh_token)

            const data = {
                name: checkUser[0].name,
                email: checkUser[0].email,
                token: access_token
            }
            return responseSuccess(res, "Login Berhasil", data)
        } else{
            return responseValidate(res,"Error in email/password")
        }
    } catch (error) {
        if(error.isJoi === true) return responseValidate(res, error.message)
        return responseError(res, error.message)
    }

}

const register = async (req, res) => {
    try {
        const result = await createUserValidator.validateAsync(req.body)
        const checkEmail = await user.getEmailByEmail(result.email)
        if (checkEmail) return responseValidate(res, "Email Sudah Terdaftar") 
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
    login,
    register
}