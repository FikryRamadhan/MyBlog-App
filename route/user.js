const express = require('express')

const router = express.Router()

const usersController = require('../src/controller/usersController')
const  authMidlleware = require('../src/middleware/auth');

router.get('/', authMidlleware ,usersController.getAllUsers)
router.post('/', usersController.createUser)

module.exports = router