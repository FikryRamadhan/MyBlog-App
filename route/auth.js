const express = require('express')
const router = express.Router()

// Controller
const authController = require('../src/controller/authController.js')

router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router