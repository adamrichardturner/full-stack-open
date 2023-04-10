const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

// GET endpoint for retrieving all notes
notesRouter.get('/', async (request, response) => {
  // Find all notes in the database and populate the user field with username and name fields
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })

  // Send the notes as a JSON response
  response.json(notes)
})

// POST endpoint for creating a new note
notesRouter.post('/', async (request, response) => {
  // Get the request body
  const body = request.body

  // Find the user who created the note based on the userId in the request body
  const user = await User.findById(body.userId)

  // Create a new note using the Note model
  const note = new Note({
    content: body.content, // The content of the note
    important: body.important === undefined ? false : body.important, // Whether the note is important or not
    user: user.id, // The user who created the note
  })

  // Save the note to the database
  const savedNote = await note.save()

  // Add the note to the user's notes array and save the user
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  // Send the saved note as a JSON response
  response.json(savedNote)
})

// GET endpoint for retrieving a single note
notesRouter.get('/:id', async (request, response) => {
  // Find a note with the given id in the database
  const note = await Note.findById(request.params.id)

  // If the note is found, send it as a JSON response
  if (note) {
    response.json(note)
  } else {
    // If the note is not found, send a 404 error response
    response.status(404).end()
  }
})

// DELETE endpoint for deleting a note
notesRouter.delete('/:id', async (request, response) => {
  // Find a note with the given id and remove it from the database
  await Note.findByIdAndRemove(request.params.id)

  // Send a 204 status code (no content) to indicate that the operation was successful
  response.status(204).end()
})

// PUT endpoint for updating a note
notesRouter.put('/:id', (request, response, next) => {
  // Get the request body
  const body = request.body

  // Create a new note object with the updated fields
  const note = {
    content: body.content, // The updated content of the note
    important: body.important, // The updated importance of the note
  }

  // Find the note with the given id and update it with the new note object
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      // Send the updated note as a JSON response
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

// Export the notesRouter
module.exports = notesRouter
