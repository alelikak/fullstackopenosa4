require('dotenv').config()

let PORT = 3003
// let MONGODB_URI = 'mongodb+srv://fullstack:Koillinen200@cluster0.o1opl.mongodb.net/Phonebook?retryWrites=true&w=majority'



const MONGODB_URI = process.env.NODE_ENV === 'test'   ?'mongodb+srv://fullstack:Koillinen200@cluster0.o1opl.mongodb.net/testPhonebook?retryWrites=true&w=majority'
  : 'mongodb+srv://fullstack:Koillinen200@cluster0.o1opl.mongodb.net/Phonebook?retryWrites=true&w=majority'

//const MONGODB_URI = process.env.NODE_ENV === 'test'   ? process.env.TEST_MONGODB_URI  : process.env.MONGODB_URI


module.exports = {
  MONGODB_URI,
  PORT
}