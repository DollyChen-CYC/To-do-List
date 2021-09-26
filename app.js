// step 1: create app.js
// step 2: npm init -y (check main value in package.json is "app.js")
// step 3: npm i express express-handlebars
// step 4: revise package.json => add   "scripts": {  "start": "node app.js", "dev": "nodemon app.js", ...
// step 5: start writing server related code to init the project
// step 6: create new DB by Robo3T => install Mongoose by "npm i mongoose" => setting connection in app.js

// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
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
app.use(express.urlencoded({ extended: true}))

// setting routes
app.get('/', (req, res) => {
  // res.send('hello')
  res.render('index')
})


// listen on the Express server
app.listen(port, () => {
  console.log(`Express app is running on the http://locolhost:${port}`)
})
