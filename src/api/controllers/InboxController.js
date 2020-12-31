const { Inbox } = require('../models')
const { LoggerService } = require('../../services')

exports.fetch = async (req, res) => {
  const { userId } = req.query

  try {
    const inbox = await Inbox.find({ userId }).populate(
      'userId messages',
    )
    return res.status(200).json(inbox)
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}
