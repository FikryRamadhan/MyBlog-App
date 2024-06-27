const responseSuccess = (res, message, data) => {
    if (!data) {
        return responseValidate(res,"Data Tidak Di Temukan")
    }

    return res.status(200).json({
        message: message,
        data: data
    })
}

const responseError = (res, message) => {
    if(message == '') message = "Server Error";
    return res.status(500).json({
        message: message
    })
}

const responseValidate = (res, message) => {
    return res.status(400).json({
        message: message
    })
}

const responseCookie = (res, name, value) => {
    return res.cookie(name, value, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
}

module.exports = {
    responseSuccess, 
    responseError,
    responseValidate,
    responseCookie

}  