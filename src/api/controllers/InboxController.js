const { Inbox } = require('../models')
const { LoggerService } = require('../../services')

exports.fetch = async (req, res) => {
  try {
    const inbox = await Inbox.findOne({
      user: req.user._id,
    }).populate('chats.user')
    if (!inbox) return res.status(200).json([])
    return res.status(200).json(inbox.chats)
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

exports.addChat = async (req, res) => {
  const { userId } = req.body
  let inbox
  try {
    inbox = await Inbox.findOne({ user: req.user._id })
    if (inbox) {
      await Inbox.updateOne(
        { _id: inbox._id },
        { $push: { chats: { user: userId, messages: [] } } },
      )
      inbox = await Inbox.findOne({
        user: req.user._id,
      }).populate('chats.user')
      return res.status(200).json(inbox.chats)
    }
    inbox = new Inbox({
      user: req.user._id,
      chats: [{ user: userId, messages: [] }],
    })
    await inbox.save()
    inbox = await Inbox.findOne({
      user: req.user._id,
    }).populate('chats.user')
    return res.status(201).json(inbox.chats)
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

exports.removeChat = async (req, res) => {
  const { userId } = req.query
  try {
    await Inbox.updateOne(
      { user: req.user._id },
      { $pull: { chats: { user: userId } } },
    )
    const inbox = await Inbox.findOne({
      user: req.user._id,
    }).populate('chats.user')

    return res.status(200).json(inbox.chats)
  } catch (error) {
    LoggerService.serverError(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}
