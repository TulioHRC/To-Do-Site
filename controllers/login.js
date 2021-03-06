const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const url = require('url')

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

  app.get('/logout', (req, res) => { // User logout
    // Cookie changing
    res.cookie('logged', '0', {
      httpOnly: true
    })
    res.cookie('user', '', {
      httpOnly: true
    })
    res.redirect('/')
  })

  app.get('/login', (req, res) => { // User login page
    // Theme Loading
    let theme = 'false'
    if(req.cookies['theme'] != undefined){ // Theme cookie if not defined
      theme = req.cookies['theme']
    }

    if(req.query.error){ // Error loading
      res.render('login', {theme: theme, error: 1})
    } else {
      res.render('login', {theme: theme, error: 0})
    }
  })

  app.post('/login/enter', urlencodedParser, (req, res) => { // Log in
    Accounts.findOne({username: req.body['name'], password: req.body['password']}, (err, data) => {
      if(data){
        // cookie save
        res.cookie('logged', '1', {
          httpOnly: true
        })
        res.cookie('user', data['username'], {
          httpOnly: true
        })

        res.redirect('/')
      } else {
        res.redirect(url.format({
           pathname:"/login",
           query: {
              "error": `login_error`
            }
         }))
      }
    })
  })

  app.get('/register', (req, res) => {
    // Theme Loading
    let theme = 'false'
    if(req.cookies['theme'] != undefined){ // Theme cookie if not defined
      theme = req.cookies['theme']
    }

    if(req.query.error){ // Error loading
      res.render('register', {theme: theme, error: 1})
    } else {
      res.render('register', {theme: theme, error: 0})
    }
  })

  app.post('/register/signup', urlencodedParser, (req, res) => { // Account creation
      if(req.body['name'] == '') { // If username == ''
        res.redirect(url.format({
          pathname: "/register",
          query: {
            "error": "register_error"
          }
        }))
      } else {
        Accounts.find({username: req.body['name']}, (err, data) => {
          if(err) {
            res.redirect(`/error/:${err}`)
         }
          if(data.length >= 1){
            res.redirect(url.format({ // If name is already being used
               pathname:"/register",
               query: {
                  "error": "register_error"
                }
             }))
          } else {

            Globals.findOne({}, (err, data) => { // Globals variables update, user id saving
              let position
              if(!data){
                position = '1'
                let NewGlobal = new Globals({IDs: '1', lastId: '1'})

                NewGlobal.save((err, data) => {
                  if(err){
                    res.redirect(`/error/:${err}`)
                  }
                })
              } else {
                let next = String(Number(data['lastId']) + 1)
                position = next

                Globals.deleteOne({lastId: data['lastId']}, (err, data) => {
                  if(!err){
                    let NewGlobal = new Globals({IDs: next, lastId: next})

                    NewGlobal.save((err, data) => { // Global save
                      if(err){
                        res.redirect(`/error/:${err}`)
                      }
                    })
                  } else {
                    res.redirect(`/error/:Error in deleting Global ${err}`)
                  }
                })
              }
              let NewData = new Accounts({username: req.body['name'], password: req.body['password'],
                                              id: position})
              NewData.save((err, data) => { // User save
                if(err){
                  res.redirect(`/error/:Error in saving ${err}`)
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
      }
  })
}
