const mysql = require('mysql2')
const env = require('dotenv')
env.config()

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_library',
})


module.exports = dbPool.promise() 