const user = require('../model/user.js')
const validations = require('../myClass/validation.js')
const { responseError, responseSuccess, responseValidate, responseCookie } = require('../myClass/response')
const auth = require('../model/auth.js')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const login = async (req, res) => {
    try {
        validations.validationAuth(res, req.body);
        const [checkUser] = await auth.checkAuth(req.body.email);

        if (!checkUser[0]) {return responseValidate(res, "Login Failed")};

        console.log(checkUser[0]);

        const checkPassword = bcrypt.compareSync(req.body.password, checkUser[0].password)

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

        if (checkPassword == true) {
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
        } else {
            return responseValidate(res, "Login Gagal")
        }
    } catch (error) {
        console.log(error);
        return responseError(res, "Server Error")
    }

}


module.exports = {
    login,
}