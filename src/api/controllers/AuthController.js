const {
  TwilioService,
  LoggerService,
  WebTokenService,
} = require('../../services')
const { User } = require('../models')
const config = require('../../config')

exports.sendCode = async (req, res) => {
  const { phone } = req.body
  try {
    if (!config.twilio.activated)
      return res
        .status(200)
        .json({ message: 'Your code is any 6 digits code !' })
    await TwilioService.sendVerificationCode(phone)
    return res
      .status(200)
      .json({ message: 'Verification code sent succesfully' })
  } catch (error) {
    if (error.status && error.status === 400)
      return res.status(400).json({ message: 'Invalid phone number' })
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

exports.chekCode = async (req, res) => {
  const { phone, code } = req.body

  try {
    if (config.twilio.activated) {
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

    const user = await User.findOne({ phone })
    if (!user)
      return res.status(200).json({ message: 'You need to register' })

    const accessToken = WebTokenService.sign(
      { ...user._doc },
      3600 * 24,
    )
    const { _v, _id, ...userPayload } = user._doc
    return res.status(200).json({
      message: 'Welcome back',
      user: userPayload,
      accessToken,
    })
  } catch (error) {
    if (
      (error.status && error.status === 404) ||
      error.status === 400
    ) {
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
    const accessToken = WebTokenService.sign(
      { ...user._doc },
      3600 * 24,
    )
    const { _v, _id, ...userPayload } = user._doc
    return res.status(200).json({
      message: 'Welcome newbie',
      user: userPayload,
      accessToken,
    })
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}
