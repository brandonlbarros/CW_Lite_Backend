const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')

const app = express()
const MONGO_URI = 'mongodb://localhost:27017/cw-lite'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Do stuff here
app.use(express.json())

app.use(cookieSession({
  name: 'session',
  keys: ['randomkeyhere'],
}))

app.use('/account', AccountRouter)
app.use('/api', APIRouter)

app.use((err, req, res, next) => {
  res.status(500).send(`${err}`)
})

app.get('/home', (req, res) => {
  res.send(`Welcome ${req.session.username}   ` + `Questions: ${req.session.questions}`)
})

app.listen(3000, () => {
    console.log('mongoDB is connected')
    console.log('listening on 3000')
  })