const { LoggerService, WebTokenService } = require('../../services')
const { User } = require('../models')

exports.verifyToken = (req, res, next) => {
  const { authorization: token } = req.headers

  if (!token) return res.status(403).send('Forbidden')

  try {
    const verify = WebTokenService.verify(token)
    if (!verify) return res.status(403).send('Forbidden')
    return next()
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(403).send('Forbidden')
  }
}

exports.checkIfUserExists = async (req, res, next) => {
  const { phone, email, username } = req.body

  if (!phone || !email || !username)
    return res
      .status(400)
      .json({ message: 'Missing required fields' })

  try {
    const userWithPhone = await User.findOne({ phone })
    if (userWithPhone)
      return res.status(400).json({
        message: 'User with the same phone number already exists',
      })

    const userWithUsername = await User.findOne({ username })
    if (userWithUsername)
      return res.status(400).json({
        message: 'User with the same username already exists',
      })
    const userWithEmail = await User.findOne({ email })
    if (userWithEmail)
      return res.status(400).json({
        message: 'User with the same email address already exists',
      })

    return next()
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).send({ message: 'Server Error' })
  }
}
