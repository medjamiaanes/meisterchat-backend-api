const { Schema, model } = require('mongoose')

const InboxSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  messages: [
    {
      senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      verficationId: {
        type: Schema.Types.String,
      },
      type: {
        type: Schema.Types.String,
        enum: ['image', 'video', 'file', 'text'],
        default: 'text',
      },
      value: {
        type: Schema.Types.String,
      },
      read: {
        type: Schema.Types.Boolean,
        default: false,
      },
      timestamp: {
        type: Schema.Types.Date,
      },
    },
  ],
})

module.exports = model('Inbox', InboxSchema)
