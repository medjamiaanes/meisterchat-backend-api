const router = require('express').Router()
const { InboxController } = require('../controllers')

router.get('/fetch', InboxController.fetch)
router.post('/add/chat', InboxController.addChat)

module.exports = router
