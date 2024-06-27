const express = require('express')

const router = express.Router()

const usersController = require('../src/controller/usersController')

router.get('/', usersController.getAllUsers)
router.post('/', usersController.createUser)
// router.get('/:id', usersController)
// router.put('/:id', usersController)
// router.delete('/:id', usersController)

module.exports = router