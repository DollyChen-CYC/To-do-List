const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, passwordCheck } = req.body
  // check if user already exists in DB
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exist.')
      // TODO: toast alert 
      res.render('register', { name, email })
    } else {
      User.create({ name, email, password })
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log('error', err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router