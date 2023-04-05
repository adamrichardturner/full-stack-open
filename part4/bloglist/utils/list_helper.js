const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => {
      return blog.likes > max.likes
        ? { title: blog.title, author: blog.author, likes: blog.likes }
        : max
    },
    { title: '', author: '', likes: 0 }
  )
}

const mostBlogs = (blogs) => {
  const freq = _.countBy(blogs, 'author')
  const author = _.maxBy(_.keys(freq), (author) => freq[author])
  return { author, blogs: freq[author] }
}

const mostLikes = (blogs) => {
  const result = _.chain(blogs)
    .groupBy('author')
    .map((blogList, author) => ({
      author,
      likes: _.sumBy(blogList, 'likes')
    }))
    .maxBy('likes')
    .value()
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
