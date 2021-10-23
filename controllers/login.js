const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Body Parser

let urlencodedParser = bodyParser.urlencoded({extended:false})

// Mongo Connection

const mongoString = 'mongodb+srv://Jocker:Xn4M4GLE1Omy2Rbq@grovecluster.kna71.mongodb.net/GroveCluster?retryWrites=true&w=majority'
mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.models = {} // Creating database collection

/* Accounts */

let mongoSchema = new mongoose.Schema({
  username: String,
  password: String,
  id: String,
})

let Accounts = mongoose.model('ToDoAccount', mongoSchema) // Connects to the collection, remembering that in MongoDB will be all in lowercase and with a "s" in the final of the name

/* Global variables load */

let globalsDB = new mongoose.Schema({
  IDs: String,
  lastId: String,
})

let Globals = mongoose.model('global', globalsDB)



module.exports = function(app){
  app.post('/logout', (req, res) => {
    res.cookie('logged', '0', {
      httpOnly: true
    })
    res.cookie('user', '', {
      httpOnly: true
    })
    res.redirect('/')
  })

  app.post('/login', (req, res) => {
    // Theme Loading

    let theme = 'false'
    if(req.cookies['theme'] != undefined){ // Theme cookie if not defined
      theme = req.cookies['theme']
    }

    res.render('login', {theme: theme})
  })

  app.post('/login/enter', urlencodedParser, (req, res) => {
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
        res.redirect(`/error/:Error in login ${err}`)
      }
    })
  })

  app.post('/register', (req, res) => {
    // Theme Loading

    let theme = 'false'
    if(req.cookies['theme'] != undefined){ // Theme cookie if not defined
      theme = req.cookies['theme']
    }

    res.render('register', {theme: theme})
  })

  app.post('/register/signup', urlencodedParser, (req, res) => {
      Accounts.find({username: req.body['user']}, (err, data) => {
        if(err) res.redirect(`/error/:${err}`)
        if(data.length >= 1){
          console.log('This username is already being used.')
          res.redirect('/register')
        } else {

          Globals.findOne({}, (err, data) => { // Globals variables update
            let position
            if(!data){
              position = '1'
              let NewGlobal = new Globals({IDs: '1', lastId: '1'})

              NewGlobal.save((err, data) => {
                if(err){
                  console.log(`There's an error, please try again ${err}.`)
                  res.redirect('/register')
                }
              })
            } else {
              let next = String(Number(data['lastId']) + 1)
              position = next

              Globals.deleteOne({lastId: data['lastId']}, (err, data) => {
                if(!err){
                  let NewGlobal = new Globals({IDs: next, lastId: next})

                  NewGlobal.save((err, data) => {
                    if(err){
                      console.log(`There's an error, please try again ${err}.`)
                      res.redirect('/register')
                    }
                  })
                } else {
                  res.redirect(`/error/:Error in deleting ${err}`)
                }
              })
            }
            let NewData = new Accounts({username: req.body['user'], password: req.body['password'],
                                            id: position})
            NewData.save((err, data) => {
              if(err){
                console.log(`There's an error, please try again ${err}.`)
                res.redirect('/register')
              } else {
                // automatic login
                res.cookie('logged', '1', {
                  httpOnly: true
                })
                res.cookie('user', data['username'], {
                  httpOnly: true
                })
                res.redirect('/')
              }
            })
          })
        }
    })
  })
}
