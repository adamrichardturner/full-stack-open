const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (username) => {
        return username && username.length >= 3
      },
      message: 'Username should be at least 3 characters long'
    },
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User