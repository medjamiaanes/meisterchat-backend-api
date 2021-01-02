const { User } = require('../models')
const { LoggerService } = require('../../services')

exports.search = async (req, res) => {
  const { query } = req.query

  try {
    if (!query.trim()) return res.status(204).json([])
    const users = await User.find({
      $or: [
        { username: { $regex: `.*${query}.*` } },
        { phone: { $regex: `.*${query}.*` } },
      ],
      _id: { $ne: req.user._id },
    })
    return res.status(200).json(users)
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}
