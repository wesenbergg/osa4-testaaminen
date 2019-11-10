const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const newBlog = new Blog(request.body)

  newBlog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter