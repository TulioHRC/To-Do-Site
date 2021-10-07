const bodyParser = require('body-parser')
const requestIp = require('request-ip')
const mongoose = require('mongoose')

// Mongo Connection

const mongoString = 'mongodb+srv://Jocker:Xn4M4GLE1Omy2Rbq@grovecluster.kna71.mongodb.net/GroveCluster?retryWrites=true&w=majority'
mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})

//mongoose.models = {} // Creating database collection

let mongoSchema = new mongoose.Schema({
  ip: String, // Get you your own to-do list
  to_do: String,
  did: {type: Boolean, default: false}, // If you did that to-do, 1 or 0
})

let To_dos = mongoose.model('ToDoModel', mongoSchema) // Connects to the collection, remembering that in MongoDB will be all in lowercase and with a "s" in the final of the name

// Body Parser

let urlencodedParser = bodyParser.urlencoded({extended:false})

// Main functions

module.exports = function(app){
  app.get('/', (req, res)=>{
    console.log(req.connection.id)
    To_dos.find({ip: requestIp.getClientIp(req)}, (err, data)=>{ // {} is to define as a Json File
        if (err) console.log(err)
        else res.render('index', {data: data})
    })
  })

  app.post('/todoSave', urlencodedParser, (req, res)=>{
    let NewData = new To_dos({ip: requestIp.getClientIp(req), to_do: req.body.to_do})
    To_dos.find({ip: requestIp.getClientIp(req), to_do: req.body.to_do}, (err, data)=>{
      if(data.length >= 1){
        console.log('This to_do item is already used in your ip!')
        res.redirect('/')
      } else {
        NewData.save((err, data) => {
          if(err){
            console.log(`An error has happened ${err}.`)
            res.redirect('/')
          } else {
            //console.log(`Saved, ${data}`)
            res.redirect('/') // Reload
          }
        })
      }
    })
  })

  app.post('/todoDelete/:todo', (req, res)=>{
    To_dos.find({ip: requestIp.getClientIp(req), to_do: req.params.todo.replace(":", "")}).deleteOne((err, data)=>{
      if(err){
        console.log(err)
        res.redirect('/')
      } else {
        //console.log(data)
        res.redirect('/')
      }
    })
  })

  app.post('/todoUpdate/:data', (req, res)=>{
    data = req.params.data.replace(':', "").split('-')
    To_dos.findOneAndUpdate({ip: requestIp.getClientIp(req), to_do: data[0]}, {ip: requestIp.getClientIp(req), to_do:data[0], did:data[1]}, {upsert: true}, function(err, data) {
      if (err) console.log(err)
      // else console.log(data)
      })
    })
}
