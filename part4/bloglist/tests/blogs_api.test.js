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

// Test that the unique identifier for blog posts is named id
test('the unique identifier of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((obj) => {
    expect(obj.id).toBeDefined()
  })
})

// Test that on adding a blog, count is increased and blogs are stored correctly in the database
test('blog posts added increases blog count and content is stored correctly in database', async () => {
  // Define a test blog post object
  const testBlog = {
    title: 'Test Blog',
    author: 'Adam Turner',
    url: 'https://google.com/',
    likes: 7,
  }

  // Add the test blog post to the database using the supertest API
  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201) // Expect a successful POST request with a 201 status code
    .expect('Content-Type', /application\/json/) // Expect a response with JSON content type

  // Get the blogs from the database using the helper function
  const blogsAtEnd = await helper.blogsInDb()

  // Expect the length of the blogs array to increase by 1 after adding the test blog post
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  // Create an array of blog titles from the blogs in the database
  const titles = blogsAtEnd.map(blog => blog.title)

  // Expect the array of blog titles to contain the title of the test blog post
  expect(titles).toContain(testBlog.title)

  // Find the added blog post in the array of blogs in the database
  const addedBlog = blogsAtEnd.find(blog => blog.title === testBlog.title)

  // Expect the added blog post to match the properties of the test blog post object
  expect(addedBlog).toMatchObject(testBlog)
})

test('likes property defaults to 0 if not included when adding a blog', async () => {
  const testBlog = {
    title: 'Test Blog Likes Default',
    author: 'Arron Turner',
    url: 'https://googles.com/'
  }
  // Add the test blog post to the database using the supertest API
  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201) // Expect a successful POST request with a 201 status code
    .expect('Content-Type', /application\/json/) // Expect a response with JSON content type

  // Check if the test blog added has a likes property with value 0
  const addedBlog = await Blog.findOne({ title: 'Test Blog Likes Default' })
  expect(addedBlog.likes).toEqual(0)
})

// Close the database connection after all tests are complete
afterAll(async () => {
  await mongoose.connection.close()
})
