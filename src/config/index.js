const { NODE_ENV } = process.env
const ENV = process.env

const config = {
  port: NODE_ENV === 'production' ? ENV.PORT : 3300,
  jwtSecret: ENV.JWT_SECRET,
  twilio: {
    accountSid: ENV.TWILIO_ACCOUNTSID,
    serviceId: ENV.TWILIO_SERVICEID,
    authToken: ENV.TWILIO_AUTHTOKEN,
    activated: ENV.TWILIO_ACTIVATED && ENV.TWILIO_ACTIVATED === 'YES',
  },
}

module.exports = config
