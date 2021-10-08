const mongoose = require('mongoose')

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

  app.post('/register', (req, res) => {
    res.render('register')
  })
}
