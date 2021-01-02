const { Schema, model } = require('mongoose')

const InboxSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  chats: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      messages: [
        {
          type: {
            type: Schema.Types.String,
            enum: ['image', 'video', 'file', 'text'],
            default: 'text',
          },
          textMessage: {
            type: Schema.Types.String,
          },
          read: {
            type: Schema.Types.Boolean,
            default: false,
          },
          isSender: {
            type: Schema.Types.Boolean,
            default: false,
          },
          timestamp: {
            type: Schema.Types.Date,
          },
        },
      ],
    },
  ],
})

module.exports = model('Inbox', InboxSchema)
