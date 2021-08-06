const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const User = require('./models/user')

const mongo = process.env.MONGODB || 'mongodb://localhost/noticias'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

const createInitialUSer = async() => {
  const total = await User.countDocuments({ username: 'adminsis' })
  if (total === 0) {
    const user = new User({
      username: 'adminsis',
      password: '123'
    })
    await user.save()
    console.log('user admin created')
  } else {
    console.log('user admin created skipped')
  }
}

app.get('/', (req, res) => res.render('index'))

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createInitialUSer()
    app.listen(port, () => console.log('listening...'))
  })
  .catch(e => console.log(e))

