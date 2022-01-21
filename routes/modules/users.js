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
  const errors = []
  // form validation
  if (!name || !email || !password || !passwordCheck) {
    errors.push({ message: '所有欄位皆為必填！' })
    return res.render('register', {
      errors,
      name,
      email
    })
  }
  if (!email.includes('@')) {
    errors.push({ message: '請填寫正確的 email！' })
  }
  if (password !== passwordCheck) {
    errors.push({ message: '密碼與再次確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
    })
  }

  // check if user already exists in DB
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 email 已經註冊過了！' })
      return res.render('register', {
        errors,
        name,
        email,
      })
    } else {
      User.create({ name, email, password })
        .then(() => {
          req.flash('success_msg', '你已成功註冊，請登入！')
          res.redirect('/users/login')
        })
        .catch(err => console.log('error', err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出！')
  res.redirect('/users/login')
})

module.exports = router