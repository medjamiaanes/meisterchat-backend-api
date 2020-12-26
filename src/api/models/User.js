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
})

module.exports = model('User', UserSchema)
