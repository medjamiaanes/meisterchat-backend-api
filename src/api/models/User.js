const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  username: {
    type: Schema.Types.String,
    required: true,
  },
  phone: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
  },
  avatar: {
    type: Schema.Types.String,
  },
  status: {
    type: Schema.Types.String,
    enum: ['actif', 'busy', 'away'],
    default: 'actif',
  },
  isOnline: {
    type: Schema.Types.Boolean,
    default: false,
  },
})

module.exports = model('User', UserSchema)
