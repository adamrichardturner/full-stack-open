const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

// Delete all blogs from the database and insert the initial blogs before each test
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

// Group tests related to the blogs API
describe('blogs API returns correct length and type of data', () => {
  // Test that blogs are returned in JSON format
  test('blogs are returned in JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // Test that the correct number of blogs are returned
  test('the correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

test('the unique identifier of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(obj => {
    expect(obj.id).toBeDefined()
  })
})

// Close the database connection after all tests are complete
afterAll(async () => {
  await mongoose.connection.close()
})
