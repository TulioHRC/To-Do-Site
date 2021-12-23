const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const url = require('url')

// Mongo Connection

const mongoString = 'mongodb+srv://Jocker:Xn4M4GLE1Omy2Rbq@grovecluster.kna71.mongodb.net/GroveCluster?retryWrites=true&w=majority'
mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.models = {} // Creating database collection

/* To Do database */

let mongoSchema = new mongoose.Schema({
  user: String, // Get you your own to-do list
  to_do: String,
  did: {type: Boolean, default: false}, // If you did that to-do, 1 or 0
})

let To_dos = mongoose.model('ToDoModel', mongoSchema) // Connects to the collection, remembering that in MongoDB will be all in lowercase and with a "s" in the final of the name

/* Global variables load */

let globalsDB = new mongoose.Schema({
  IDs: Number,
  lastId: String,
})

let Globals = mongoose.model('global', globalsDB)

// Body Parser

let urlencodedParser = bodyParser.urlencoded({extended:false})

// Main functions

module.exports = function(app){
  app.get('/', (req, res)=>{
    // User Checking
    if(!req.cookies['user']){ // Without account mode
      logged = 0
      user = ''
      if(req.cookies['todos'] == undefined){
        data = []
      } else {
        data = req.cookies['todos'].split(';').slice(0, -1)
        for (let i = 0; i < data.length; i++) {
          let each = data[i].split('/')
          data[i] = {
            user: '',
            to_do: each[0],
            did: each[1],
          }
        }
      }

      res.cookie('logged', '0', {
        httpOnly: true, // Can't the user change
      })
      res.cookie('user', '', {
        httpOnly: true, // Can't the user change
      })

      // Theme Loading
      let theme = 'false'
      if(req.cookies['theme'] != undefined){ // Theme cookie if not defined
        theme = req.cookies['theme']
      }

      // Popup already showed
      if(req.query.pop){
        pop = 1
      } else pop = 0

      if(req.query.error){ // Error loading
        res.render('index', {data: data, pop: pop, logged: logged, user: user, theme: theme, error: 1})
      } else {
        res.render('index', {data: data, pop: pop, logged: logged, user: user, theme: theme, error: 0})
      }

    } else { // Logged mode
      logged = 1
      user = req.cookies['user']

      // Theme Loading
      let theme = 'false'
      if(req.cookies['theme'] != undefined){ // Theme cookie if not defined
        theme = req.cookies['theme']
      }

      To_dos.find({user: req.cookies['user']}, (err, data)=>{
          if (err) res.redirect(`/error/:${err}`)
          else {
            if(req.query.error){ // Error loading
              res.render('index', {data: data, pop: 1, logged: logged, user: user, theme: theme, error: 1})
            } else {
              res.render('index', {data: data, pop: 1, logged: logged, user: user, theme: theme, error: 0})
            }
          }
      })
    }
  })

  app.post('/todoSave', urlencodedParser, (req, res)=>{ // To_Do cration
      if(req.body.to_do == ''){ // Error load
        res.redirect(url.format({
           pathname:"/",
           query: {
              "error": "Error_name"
            }
         }))
      } else {
        if(req.cookies['user']){ // Logged
          let NewData = new To_dos({user: req.cookies['user'], to_do: req.body.to_do})
          To_dos.find({user: req.cookies['user'], to_do: req.body.to_do}, (err, data)=>{
            if (err) res.redirect(`/error/:${err}`)
            if(data.length >= 1){ // If the to_do is already saved
              res.redirect('/')
            } else {
              NewData.save((err, data) => { // Real save
                if(err){
                  res.redirect(`/error/:${err}`)
                } else res.redirect('/') // Reload
              })
            }
          })
        } else { // Not logged
          let alreadyTo_do, cookieContent
          if(req.cookies['todos'] == undefined){
            cookieContent = `${req.body.to_do}/0;`
          } else {
            alreadyTo_do = req.cookies['todos']
            cookieContent = `${alreadyTo_do}${req.body.to_do}/0;`
          }

          res.cookie('todos', cookieContent, {
            httpOnly: true,
          })

          res.redirect(url.format({ // Reload without the popup
             pathname:"/",
             query: {
                "pop": "1"
              }
           }))
        }
      }
  })

  app.post('/todoDelete/:todo', (req, res)=>{ // Delete
    if(!req.cookies['user']){ // Not logged
      data = req.cookies['todos'].split(';').slice(0, -1)
      for (let i = 0; i < data.length; i++) {
        let each = data[i].split('/')
        if(each[0] == req.params.todo.replace(":", "")){
          data.splice(i, 1)
          data = data.join(';')
          if(data.length > 1) data = data.concat(';')
          res.cookie('todos', data, {
            httpOnly: true,
          })
        }
      }
      res.redirect(url.format({ // Reload without the popup
         pathname:"/",
         query: {
            "pop": "1"
          }
       }))
    } else { // Logged
      To_dos.find({user: req.cookies['user'], to_do: req.params.todo.replace(":", "")}).deleteOne((err, data)=>{
        if(err){
          res.redirect(`/error/:${err}`)
        } else {
          res.redirect('/')
        }
      })
    }
  })

  app.post('/todoUpdate/:data', (req, res)=>{ // Update
    data = req.params.data.replace(':', "").split('-')
    if(!req.cookies['user']){ // Not logged
      cookie = req.cookies['todos'].split(';').slice(0, -1)
      for (let i = 0; i < cookie.length; i++) {
        let each = cookie[i].split('/')
        if(each[0] == data[0]){
          if(data[1] == 'true') data[1] = 1 // True to 1
          else data[1] = 0 // False to 0
          each[1] = data[1]
          cookie[i] = each.join('/')
          res.cookie('todos', cookie.join(';').concat(';'), {
            httpOnly: true,
          })
        }
      }
      res.redirect(url.format({ // Reason to be lower than with an account
         pathname:"/",
         query: {
            "pop": "1"
          }
       }))
    } else { // Logged
      To_dos.findOneAndUpdate({user: req.cookies['user'], to_do: data[0]}, {user: req.cookies['user'], to_do:data[0], did:data[1]}, {upsert: true}, function(err, data) {
        if (err){
           res.redirect(`/error/:There was an error to update the data. ${err}`)
        }
      })
    }
  })

  app.post('/theme/:data', (req, res) => { // Changing theme
    data = req.params.data.replace(':', '')
    res.cookie('theme', data, {httpOnly: true})
    res.redirect('/')
  })
}
