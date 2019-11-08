require('dotenv').config()

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const helmet = require('helmet')
const db = require('./lib/db')
const helpers = require('./lib/helpers')

function logRequest(req, res, next){
  console.log('REQ \n  PATH: ', req.path)
  next()
}

function enforceHTTPS(req, res, next) {
  if(!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
}

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logRequest)
app.use(helmet())

app.use(enforceHTTPS)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().array())

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.post('/message', (req, res) => {
  console.log("MESSAGE: POST")
  // get the email from the req body
  var email = helpers.validation.email(req.body.email) ? req.body.email : false
  var name = helpers.validation.name(req.body.name) ? req.body.name : false
  var message = helpers.validation.message(req.body.message) ? req.body.message : false

  if(email && name && message) {
    // Check the database for existing email
    var Message = db.models.get('Message')
    var message = new Message({
      email: email,
      name: name,
      message: message,
      timestamp: new Date()
    })
    message.save(function(err) {
      if(err) {
        console.log(err)
        res.sendStatus(500)
      } else {
        console.log("All good...")
        res.sendStatus(200)
      }
    })
  } else {
    res.sendStatus(400)
  }
})

db.init()
.then(() => { 
  app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
})
.catch((e) => {
  console.log(`Failed to start the app...\n Reason: ${e}`)
})
