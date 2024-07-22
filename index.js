// libary
const express = require('express')
const cors = require('cors')
const env = require('dotenv')
env.config()

// Router
const routeAuth = require('./route/auth')
const routeBooks = require('./route/book')
const routeUsers = require('./route/user')
const routeBorrowers = require('./route/borrower')

const PORT = process.env.PORT || 3000
const app = express()

const authMidlleware =  require('./src/middleware/auth');

// Midleware
app.use(express.json());
app.use(cors())

app.use('/auth', routeAuth)
// app.use('/books', routeBooks)
app.use('/users', routeUsers)
// app.use('/borrowers', routeBorrowers)

// For Documetation API
const swagger = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const options = require("./options")
const specs = swaggerJsdoc(options)

app.use("/", swagger.serve, swagger.setup(specs))


app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`)
})

