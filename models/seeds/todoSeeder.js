const mongoose = require ('mongoose')
const Todo = require('../todo')
const db = require('../../config/mongoose')

db.once('open', () => {
  // create new seeder
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'NewTodo-' + i })
  }
  console.log('done')
})