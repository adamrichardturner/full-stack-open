const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Define route to handle GET requests to /api/blogs, which retrieves all blog data from the MongoDB database
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

// Define route to handle POST requests to /api/blogs, which adds a new blog to the MongoDB database
blogsRouter.post('/', async (request, response) => {
  // Extract blog data from request body
  const body = await request.body

  // Check that all required fields are present
  if (body.title === undefined) {
    return response.status(400).json({ error: 'missing title' })
  } else if (body.author === undefined) {
    return response.status(400).json({ error: 'missing author' })
  } else if (body.url === undefined) {
    return response.status(400).json({ error: 'missing url' })
  }
  // Create a new blog using the extracted data
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })

  // Save the new blog to the MongoDB database
  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => console.log(error))
})

module.exports = blogsRouter