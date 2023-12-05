

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
//const password = process.argv[2]

//const url = process.env.MONGODB_URI

const url =  'mongodb+srv://tonilelikakis85:Koillinen200@cluster0.36ojk2i.mongodb.net/testPhonebook?retryWrites=true&w=majority'  // Source https://stackoverflow.com/questions/55695565/error-message-mongoerror-bad-auth-authentication-failed-through-uri-string

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)



if (process.argv.length===3){
  console.log('Bloglist:')
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog.author,blog.url)
    })
    mongoose.connection.close()
  })
}





if (process.argv.length>3){
  const btitle = process.argv[3]
  const bauthor = process.argv[4]
  const burl = process.argv[5]


  const blog = new Blog({
    title: btitle,
    author: bauthor,
    url: burl
    //id: Math.floor(Math.random() * 100) + 1, //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  })

  blog.save().then(result => {
    console.log('added ',bauthor,' ', burl,' to bloglist')
    console.log('result ',result)
    mongoose.connection.close()
  })}