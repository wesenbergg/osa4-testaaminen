const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({})
    response.json(blogs.map(b => b.toJSON()))
  }catch(exception){
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  let body = request.body

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  
  try{
    const savedBlog = await newBlog.save()
    response.json(savedBlog.toJSON())
  }catch(exception){
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter