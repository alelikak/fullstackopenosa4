const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config.cjs')
const logger = require('./utils/logger.cjs')



const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

//const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl =  'mongodb+srv://tonilelikakis85:Koillinen200@cluster0.36ojk2i.mongodb.net/Phonebook?retryWrites=true&w=majority'  // Source https://stackoverflow.com/questions/55695565/error-message-mongoerror-bad-auth-authentication-failed-through-uri-string

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

