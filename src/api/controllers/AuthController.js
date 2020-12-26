const {
  TwilioService,
  LoggerService,
  WebTokenService,
} = require('../../services')
const { User } = require('../models')

exports.sendCode = async (req, res) => {
  const { phone } = req.body

  try {
    if (process.env.NODE_ENV !== 'production')
      return res.status(200).json({ message: 'Your code is 000000' })
    await TwilioService.sendVerificationCode(phone)
    return res
      .status(200)
      .json({ message: 'Verification code sent succesfully' })
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

exports.chekCode = async (req, res) => {
  const { phone, code } = req.body

  try {
    if (process.env.NODE_ENV === 'production') {
      const response = await TwilioService.checkVerificationCode(
        phone,
        code,
      )
      LoggerService.logger.info('Twilio Check response', {
        tags: 'twilio',
        response,
      })
      if (response.status !== 'approved')
        return res
          .status(400)
          .json({ message: 'Wrong code, please try again' })
    }
    if (code !== '000000')
      return res
        .status(400)
        .json({ message: 'Wrong code, please try again' })

    const user = await User.findOne({ phone })
    if (!user)
      return res.status(200).json({ message: 'You need to register' })

    const accessToken = WebTokenService.sign({ ...user }, 3600 * 24)

    return res
      .status(200)
      .json({ message: 'Welcome back', user, accessToken })
  } catch (error) {
    if (error.status === 404) {
      return res
        .status(400)
        .json({ message: 'Wrong code, please try again' })
    }
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

exports.register = async (req, res) => {
  const { phone, username, email } = req.body

  try {
    const create = new User({ phone, username, email })
    const user = await create.save()
    const accessToken = WebTokenService.sign({ ...user }, 3600 * 24)

    return res
      .status(200)
      .json({ message: 'Welcome newbie', user, accessToken })
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}