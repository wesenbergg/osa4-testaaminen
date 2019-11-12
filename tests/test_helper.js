const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Ketulla on kaksi hantaa',
    author: 'Miina',
    url: 'www.kettur.org',
    likes: 1,
    id: '5dc89961ea32f7219875c691'
  },
  {
    title: 'Mein leif',
    author: 'Adolfiina Hitleriina',
    url: 'www.elamamkoulum.org',
    likes: -1,
    id: '5dc89c8c1ed8974be0d7bacf'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}