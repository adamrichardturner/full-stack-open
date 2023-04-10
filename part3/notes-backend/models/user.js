const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Define the schema for the User model
const userSchema = mongoose.Schema({
  username: {
    type: String, // The type of the field is a string
    required: true, // The field is required
    unique: true // The field must be unique in the database
  },
  name: String, // The name of the user, stored as a string
  passwordHash: String, // The hashed password of the user, stored as a string
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId, // The type of the field is an ObjectId
      ref: 'Note' // The ref option is used to link to the Note model
    }
  ],
})

// Add the uniqueValidator plugin to the userSchema
userSchema.plugin(uniqueValidator)

// Set the toJSON transform to modify the returned object
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Convert the id to a string and assign it to the id property
    returnedObject.id = returnedObject._id.toString()
    // Remove the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
    // Remove the passwordHash property from the returned object
    delete returnedObject.passwordHash
  }
})

// Create the User model and export it
const User = mongoose.model('User', userSchema)
module.exports = User
