const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const routes = require('./routes')

// connect to mongo DB
require('./config/mongoose')

// setting template engine
app.engine('hbs', exphbs ({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
// setting static files
app.use(express.static('public'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// use method-override
app.use(methodOverride('_method'))
// setting body-parser
app.use(express.urlencoded({ extended: true }))

// setting routes
app.use(routes)


// listen on the Express server
app.listen(port, () => {
  console.log(`Express app is running on the http://localhost:${port}`)
})
