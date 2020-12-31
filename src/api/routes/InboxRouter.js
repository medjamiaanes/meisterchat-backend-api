const router = require('express').Router()
const { InboxController } = require('../controllers')

router.get('/fetch', InboxController.fetch)

module.exports = router
