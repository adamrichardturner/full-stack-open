const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Define route to handle GET requests to /api/blogs, which retrieves all blog data from the MongoDB database
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Define route to handle POST requests to /api/blogs, which adds a new blog to the MongoDB database
blogsRouter.post('/', async (request, response) => {
  // Extract blog data from request body
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // Check that all required fields are present
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url is missing' })
  }

  // Get the user object from the database
  const user = await User.findById(decodedToken.id)

  // Create a new blog using the extracted data
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id
  })

  // Save the new blog to the MongoDB database
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  // Send a successful response with a 201 status code and the saved blog data
  response.status(201).json(savedBlog)
})

// Delete a blog post with the specified id from the database
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  // Send a successful response with a 204 status code and no content
  response.status(204).end()
})

// Update a blog post with the specified id in the database
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  // Create a blog object with the specified properties
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    // Update the blog post in the database with the specified id and properties
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    // Send a successful response with a 200 status code and the updated blog post
    response.status(200).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter