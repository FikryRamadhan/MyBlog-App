const dbPoll = require('../../database/database.js')
const bcrypt = require('bcrypt')

const getAll = () => {
    const query = `SELECT * FROM users WHERE role='Member'`

    return dbPoll.execute(query)
}

const create = async (body) => {
    const hash = await bcrypt.hashSync(body.password, 15);

    const query = `INSERT INTO users (name, email, password) VALUES ('${body.name}', '${body.email}', '${hash}')`

    return dbPoll.execute(query)
}

const getById = (id) => {
    const query = `SELECT * FROM users WHERE id='${id}'`
    return dbPoll.execute(query)
}

module.exports = {
    getAll,
    create,
    getById,
}