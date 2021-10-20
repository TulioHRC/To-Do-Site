const express = require('express')
const cookieParser = require('cookie-parser')
const controllerTodo = require('./controllers/todo.js')
const controllerLogin = require('./controllers/login.js')
const controllerErrors = require('./controllers/error.js')
const PORT = process.env.PORT || 3000

let app = express()

app.set('view engine', 'ejs') // View engine setting

app.use(express.static(__dirname + '/public')) // Static folder definition
app.use(cookieParser()) // Cookie parser set up

controllerTodo(app)
controllerLogin(app)
controllerErrors(app)

app.listen(PORT) // Putting the application online
console.log(`The application is running in localhost:${PORT}\nSee you there!!!`)
