const Note = require('../models/blog')


const initialBlogs = [  {   author: 'Opadoi toy Panathinaikoy',   title: 'Panathinaikos', url: 'www.paopantou.gr',   likes: 2  },
  { author: 'NBA',   title: 'NBA season', url: 'www.nbaseason.com',   likes: 3      },]



const nonExistingId = async () => {
  const blog = new blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Note.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}