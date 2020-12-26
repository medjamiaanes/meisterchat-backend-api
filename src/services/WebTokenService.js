const jwt = require('jsonwebtoken')
const config = require('../config')

const WebTokenService = () => {
  const secret = config.jwtSecret

  const sign = (payload, expiration) =>
    jwt.sign(payload, secret, { expiresIn: expiration || Infinity })

  const verify = (token) => jwt.verify(token, secret)

  return { sign, verify }
}

module.exports = WebTokenService()
