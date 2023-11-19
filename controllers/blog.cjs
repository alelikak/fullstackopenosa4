const blogRouter = require('express').Router()
//const Blog = require('../models/blog')
const blog = require('../models/blog.cjs')

/*
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

*/

blogRouter.get('/', (request, response) => {
  blog.find({}).then(blogs => {
    response.json(blogs)
  })
})




blogRouter.get('/:id', (request, response, next) => {
  blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

/*
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})*/

blogRouter.post('/', (request, response,next) => {
  const body = request.body

  const blog2 = new blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog2.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
  blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = new blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter