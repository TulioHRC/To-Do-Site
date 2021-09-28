const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Mongo Connection

const mongoString = 'mongodb+srv://Jocker:Xn4M4GLE1Omy2Rbq@grovecluster.kna71.mongodb.net/GroveCluster?retryWrites=true&w=majority'
mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})

//mongoose.models = {} // Creating database collection

let mongoSchema = new mongoose.Schema({
  ip: String, // Get you your own to-do list
  to_do: String,
  did: Boolean, // If you did that to-do, 1 or 0
})

let To_dos = mongoose.model('ToDoModel', mongoSchema) // Connects to the collection, remembering that in MongoDB will be all in lowercase and with a "s" in the final of the name

// Body Parser

let urlencodedParser = bodyParser.urlencoded({extended:false})

// Main functions

module.exports = function(app){
  app.get('/', (req, res)=>{
    res.render('index')
  })
  app.post('/todoSave', urlencodedParser, (req, res)=>{
    console.log(req.body)
  })
}
