const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const process = require('process')

// Read database URL from environment variables
const mongoUrl = process.env.MONGODB_URI

// Define schema for the blog data
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Set a toJSON method to the blog schema to transform the object to plain JavaScript object
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    },
  })

// Create a model for the blog data using the schema
const Blog = mongoose.model('Blog', blogSchema)

// Connect to the MongoDB database using the database URL
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Parse incoming requests with JSON payloads
app.use(express.json())

// Define a new morgan token to log the request body
morgan.token('req-body', (req) => JSON.stringify(req.body))

// Use morgan middleware to log incoming requests
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

// Define route to handle GET requests to /api/blogs, which retrieves all blog data from the MongoDB database
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// Define route to handle POST requests to /api/blogs, which adds a new blog to the MongoDB database
app.post('/api/blogs', (request, response) => {
  // Extract blog data from request body
  const body = request.body

  // Check that all required fields are present
  if (body.title === undefined) {
    return response.status(400).json({ error: 'missing title' })
  } else if (body.author === undefined) {
    return response.status(400).json({ error: 'missing author' })
  } else if (body.url === undefined) {
    return response.status(400).json({ error: 'missing url' })
  } else if (body.likes === undefined) {
    return response.status(400).json({ error: 'missing likes' })
  }

  // Create a new blog using the extracted data
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  // Save the new blog to the MongoDB database
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.log(error))
})

// Handle unknown endpoints
app.use(unknownEndpoint)

// Set the server to listen on the specified port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
