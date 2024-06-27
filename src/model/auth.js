const dbPool = require('../../database/database.js')

const checkAuth = (email) => {
    const query = `SELECT id, name, email, password FROM users WHERE email='${email}'`

    return dbPool.execute(query)
}

const saveToken = (token, id_user, exp, name,) => {
    const query = `INSERT INTO personal_access_token (id_user, name_token, token, expired_at) VALUES('${id_user}', '${name}', '${token}', '${exp}')`

    return dbPool.execute(query)
}

module.exports= {
    checkAuth,
    saveToken
}