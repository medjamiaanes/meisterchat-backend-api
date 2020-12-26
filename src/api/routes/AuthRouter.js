const router = require('express').Router()
const { AuthController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')

router.post('/send/code', AuthController.sendCode)
router.post('/check/code', AuthController.chekCode)
router.post(
  '/register',
  AuthMiddleware.checkIfUserExists,
  AuthController.register,
)

module.exports = router
