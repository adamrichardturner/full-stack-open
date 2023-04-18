const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Define route to handle GET requests to /api/blogs, which retrieves all blog data from the MongoDB database
blogsRouter.get('/', async (request, response) => {
  console.log('getting blogs')
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

// Define route to handle POST requests to /api/blogs, which adds a new blog to the MongoDB database
blogsRouter.post('/', async (request, response) => {
  // Extract blog data from request body
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
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


blogsRouter.delete('/:id', async (request, response) => {
  console.log('Deleting blog')
  const blog = await Blog.findById(request.params.id)
  console.log(`Blog is ${blog}`)
  // Check that the user ID associated with the token matches the ID of the user who created the blog
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(`Decoded token is ${decodedToken}`)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete this blog' })
  }

  // Delete the blog post from the database
  await Blog.findByIdAndRemove(request.params.id)

  // Remove the deleted blog's ID from the user object's blogs array in the database
  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id.toString())
  await user.save()

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