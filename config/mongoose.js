const mongoose = require('mongoose')

// connect to mongo DB
mongoose.connect('mongodb://localhost/todo-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

module.exports = db