const twilio = require('twilio')
const config = require('../config')

const TwilioService = () => {
  const { authToken, accountSid, serviceId } = config.twilio
  const twilioClient = twilio(accountSid, authToken)

  const sendVerificationCode = async (to) => {
    try {
      const response = await twilioClient.verify
        .services(serviceId)
        .verifications.create({ to, channel: 'sms' })

      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const checkVerificationCode = (to, code) => {
    try {
      const response = twilioClient.verify
        .services(serviceId)
        .verificationChecks.create({ to, code })
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { sendVerificationCode, checkVerificationCode }
}

module.exports = TwilioService()
