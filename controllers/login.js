const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Body Parser

let urlencodedParser = bodyParser.urlencoded({extended:false})

// Mongo Connection

const mongoString = 'mongodb+srv://Jocker:Xn4M4GLE1Omy2Rbq@grovecluster.kna71.mongodb.net/GroveCluster?retryWrites=true&w=majority'
mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.models = {} // Creating database collection

let mongoSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
})

let Accounts = mongoose.model('ToDoAccount', mongoSchema) // Connects to the collection, remembering that in MongoDB will be all in lowercase and with a "s" in the final of the name


module.exports = function(app){
  app.post('/login', (req, res) => {
    res.render('login')
  })

  app.post('/login/enter', urlencodedParser, (req, res) => {
    if(req.body['name'].split('@').length > 0){ // Put in register to not accept usernames with @
      Accounts.findOne({email: req.body['name'], password: req.body['password']}, (err, data) => {
        if(data){
          res.cookie('logged', '1', {
            httpOnly: true
          })
          res.cookie('user', data['username'], {
            httpOnly: true
          })
          res.redirect('/')
        } else {
          console.log('Error in login.')
        }
      })
    } else {
      Accounts.findOne({username: req.body['name'], password: req.body['password']}, (err, data) => {
        if(data){
          res.cookie('logged', '1', {
            httpOnly: true
          })
          res.cookie('user', data['username'], {
            httpOnly: true
          })
          res.redirect('/')
        } else {
          console.log('Error in login.')
        }
      })
    }
  })

  app.post('/register', (req, res) => {
    res.render('register')
  })

  app.post('/register/signup', urlencodedParser, (req, res) => {
    Accounts.find({email: req.body['email']}, (err, data) => {
      if(data.length >= 1){
        console.log('This email is already being used.') // Put a pop up
        res.redirect('/register')
      } else {
        Accounts.find({username: req.body['user']}, (err, data) => {
          if(data.length >= 1){
            console.log('This username is already being used.')
            res.redirect('/register')
          } else {
            let NewData = new Accounts({username: req.body['user'],
                                          email: req.body['email'], password: req.body['password']})
            NewData.save((err, data) => {
              if(err){
                console.log(`There's an error, please try again ${err}.`)
                res.redirect('/register')
              } else {
                res.redirect('/')
                // Log in automactly
              }
            })
          }
        })
      }
    })
  })


}
