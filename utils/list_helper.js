const dummy = blogs => {
  blogs = 1
  return blogs
}

const totalLikes = blogs => {
  let sum = 0
  blogs.map(b => Number(b.likes)).forEach(e => sum += e )
  return sum
}

const favoriteBlog = blogs => {
  let blog = blogs.length <= 0 ? {}: blogs[0]
  blogs.filter(b => blog = blog.likes > b.likes ? blog: b)
  return blog
}

const mostBlogs = blogs => {
  if(blogs.length === 0) return {}
  let aBlogs = blogs.map(b => b.author)
  
  return maxFreq(aBlogs)
}

const mostLikes = blogs => {
  if(blogs.length === 0) return {}
  let lBlogs = blogs.map(b => ({author: b.author, likes: b.likes}))
    
  return maxLikes(lBlogs)
}

const maxLikes = (arr) => {
  let mf = 0, m = 0, item = arr[0].author
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i].author === arr[j].author) m+=arr[j].likes
      if (mf < m) {
        mf = m
        item = arr[i].author
      }
    }
  
    m = 0
  }
  return ({author: item, likes: mf})
}

const maxFreq = (arr) => {
  let mf = 1, m = 0, item = arr[0]

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] === arr[j]) m++
      if (mf < m) {
        mf = m
        item = arr[i]
      }
    }

    m = 0
  }
  return ({author: item, blogs: mf})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}