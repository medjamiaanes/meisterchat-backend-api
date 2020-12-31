const { LoggerService } = require('../../services')

module.exports = (req, res, next) => {
  LoggerService.logger.info(
    `Request ${req.method} ${req.originalUrl}`,
    {
      tags: 'http,request',
      additionalInfo: { body: req.body, headers: req.headers },
    },
  )
  return next()
}
