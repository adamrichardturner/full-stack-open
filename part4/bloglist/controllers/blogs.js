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

// Delete a blog post with the specified id from the database
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  // Send a successful response with a 204 status code and no content
  response.status(204).end()
})

// Update a blog post with the specified id in the database
blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  // Create a blog object with the specified properties
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  // Update the blog post in the database with the specified id and properties
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      // Send a successful response with a 200 status code and the updated blog post
      response.status(200).json(updatedBlog)
    })
    .catch(error => next(error))
})


module.exports = blogsRouter