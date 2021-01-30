const router = require('express').Router()
const { InboxController } = require('../controllers')

router.get('/fetch', InboxController.fetch)
router.post('/add/chat', InboxController.addChat)
router.delete('/remove/chat', InboxController.removeChat)

module.exports = router
