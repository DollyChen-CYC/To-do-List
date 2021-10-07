const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const app = express()
const port = 3000

// connect to mongo DB
mongoose.connect('mongodb://localhost/todo-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})

// setting template engine
app.engine('hbs', exphbs ({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
// setting static files
app.use(express.static('public'))
// setting body-parser
app.use(express.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
  Todo.find() 
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (Req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
// // Method 1
  // const todo = new Todo({ name })

  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))

// // Method 2
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log('error'))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// listen on the Express server
app.listen(port, () => {
  console.log(`Express app is running on the http://localhost:${port}`)
})
