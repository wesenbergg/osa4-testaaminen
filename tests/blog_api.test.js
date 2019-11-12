const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

describe('REST api get test', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test(`there are ${helper.initialBlogs.length} blogs`, async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('REST api format test', () => {
  test('id in first blog is defined', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })
})

describe('REST api POST method test', () => {
  const newBlog = {
    title: 'kalevi making async call',
    author: 'kalevi',
    url: 'www.kalevi.org',
    likes: 13
  }

  test('blogs length check after adding blog', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  })

  test('read title from added valid blog', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await helper.blogsInDb()  
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      newBlog.title
    )
  })

  test('post blog without likes', async () => {
    const blogWoLikes = {
      title: 'kalevi making async call',
      author: 'kalevi',
      url: 'www.kalevi.org',
    }

    await api
      .post('/api/blogs')
      .send(blogWoLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await helper.blogsInDb()  
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

    expect(lastBlog.likes).toBeDefined()
    expect(lastBlog.likes).toBe(0)
  })

  test('post blog with no title', async () => {
    const blogWoLikes = { author: 'kalevi', url: 'www.kalevi.org' }

    await api
      .post('/api/blogs')
      .send(blogWoLikes)
      .expect(400)
  })

  test('post blog with no url', async () => {
    const blogWoLikes = { title: 'kalevi making async call', author: 'kalevi' }

    await api
      .post('/api/blogs')
      .send(blogWoLikes)
      .expect(400)
  })
})


beforeEach(async () => {
  await Blog.remove({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
})