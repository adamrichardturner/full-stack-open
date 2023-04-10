const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET endpoint for retrieving all users
usersRouter.get('/', async (request, response) => {
  // Find all users in the database and populate their notes array with content and importance fields
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  })

  // Send the users as a JSON response
  response.json(users)
})

// POST endpoint for creating a new user
usersRouter.post('/', async (request, response) => {
  // Destructure the username, name, and password fields from the request body
  const { username, name, password } = request.body

  // Set the number of salt rounds to use for password hashing
  const saltRounds = 10

  // Generate a password hash using bcrypt with the given password and salt rounds
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Create a new user using the User model
  const user = new User({
    username, // The username of the user
    name, // The name of the user
    passwordHash, // The hashed password of the user
  })

  // Save the user to the database
  const savedUser = await user.save()

  // Send a 201 (created) status code and the saved user as a JSON response
  response.status(201).json(savedUser)
})

// Export the usersRouter
module.exports = usersRouter
