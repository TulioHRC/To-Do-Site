const express = express()
const controllerTodo = require('./controllers/todo.js')
const PORT = 3000

let app = express()

app.set('view engine', 'ejs') // View engine setting

app.use(express.static(__dirname + '/public')) // Static folder definition

controllerTodo(app)

app.listen(PORT) // Putting the application online
console.log(`The application is running in localhost:${PORT}\nSee you there!!!`)
