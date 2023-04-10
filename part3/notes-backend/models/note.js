const mongoose = require('mongoose')

// Define the schema for the Note model
const noteSchema = new mongoose.Schema({
  content: {
    type: String, // The type of the field is a string
    required: true, // The field is required
    minlength: 5 // The minimum length of the field is 5
  },
  important: Boolean, // A boolean field indicating whether the note is important or not
  user: { // A reference to the user who created the note
    type: mongoose.Schema.Types.ObjectId, // The type of the field is an ObjectId
    ref: 'User' // The ref option is used to link to the User model
  }
})

// Set the toJSON transform to modify the returned object
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Convert the id to a string and assign it to the id property
    returnedObject.id = returnedObject._id.toString()
    // Remove the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Create the Note model and export it
module.exports = mongoose.model('Note', noteSchema)
