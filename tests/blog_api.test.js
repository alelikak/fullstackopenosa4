const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

//const initialBlogs = [  {   author: 'Opadoi toy Panathinaikoy',   title: 'Panathinaikos', url: 'www.paopantou.gr',   likes: 2  },
//  { author: 'NBA',   title: 'NBA season', url: 'www.nbaseason.com',   likes: 3      },]

beforeEach(async () => {  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})

///////// https://fullstackopen.com/osa4/backendin_testaaminen

//test('there is one blog', async () => {
//const response = await api.get('/api/blogs')

//expect(response.body).toHaveLength(1)
//})

//test('the first blog is about Panthinaikos', async () => {
//const response = await api.get('/api/blogs')

// expect(response.body[0].url).toBe('http://www.Paopantoy.com')
//})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.url)
  expect(contents).toContain(
    'www.paopantou.gr'  )
})

test('if a blog is created without likes, then 0 is set to likes', async () => {

  const newBlog = {
    author: 'Fullstack2',   title: 'oleole', url: 'www.fullstackopen.com'
  }

  //  1. create a new blog with post without the likes variable.
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)//  2.test if new blog has been added
    .expect('Content-Type', /application\/json/)


  //  3. test if the likes is equal to 0.
  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(blog => blog.likes)
  expect(likes).toContain(0)
  //expect(blogsAtEnd[-1].likes).toEqual(helper.initialBlogs[-1].likes)
})

/////////////////
test('a valid blog can be added ', async () => {
  const newBlog = {
    author: 'Fullstack',   title: 'async/await simplifies making async calls', url: 'www.fullstackopen.com',   likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)



  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(n => n.title)

  //const response = await api.get('/api/notes')
  //const contents = response.body.map(r => r.content)
  //expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('blog without title, author and url is not added', async () => {
  const newBlog = {
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  //const response = await api.get('/api/notes')
  //expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api    .get(`/api/blogs/${blogToView.id}`)    .expect(200)    .expect('Content-Type', /application\/json/)
  expect(resultBlog.body).toEqual(blogToView)
})



test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api    .delete(`/api/blogs/${blogToDelete.id}`)    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('id variable is not undefined', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  console.log(ids)
  expect(ids[0]).toBeDefined() //Source https://jestjs.io/docs/expect#tobedefined
})