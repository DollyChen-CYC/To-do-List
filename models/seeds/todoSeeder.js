const bcrypt = require('bcryptjs')
const Todo = require('../todo')
const User = require('../user')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const SEED_USER_BASE = {
  name: 'user',
  emailDomain: '@example.com',
  password: '12345678'
}

db.once('open', () => {
  const seedUsers = Array.from({ length: 5 }, (_, index) => {
    return {
      name: `${SEED_USER_BASE.name}${index + 1}`,
      email: `${SEED_USER_BASE.name}${index + 1}${SEED_USER_BASE.emailDomain}`,
      password: SEED_USER_BASE.password
    }
  })

  Promise.all(
    seedUsers.map(seedUser => {
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          const userName = user.name
          return Promise.all(Array.from({ length: 5 }, (_, index) => {
            return Todo.create({ name: `${userName}'s Todo-${index + 1}`, userId })
          }))
        })
    })
  )
    .then(() => {
      console.log('done')
      process.exit()
    })
})
