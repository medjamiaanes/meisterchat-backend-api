const router = require('express').Router()
const { UserController } = require('../controllers')

router.get('/search', UserController.search)

module.exports = router
