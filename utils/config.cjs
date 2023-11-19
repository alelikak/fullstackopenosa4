require('dotenv').config()

let PORT = 3003
let MONGODB_URI = 'mongodb+srv://fullstack:Koillinen200@cluster0.o1opl.mongodb.net/Phonebook?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}