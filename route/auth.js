const express = require('express')
const router = express.Router()

// Controller
const authController = require('../src/controller/authController.js')

router.post('/login', authController.login)

module.exports = router