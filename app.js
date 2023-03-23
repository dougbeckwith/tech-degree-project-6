const express = require('express')
const app = express()
const port = 3000
const data = require('./data.json')

//Set view engine to pug
app.set('view engine', 'pug')

//Serve static files
app.use('/static', express.static('public'))

// Send Error Message to User
function errorHandler(res, error) {
  return res.send(`<h1>${error.message}</h1>
  <p>Status Code:${error.status}</p>
  `)
}

// Create Error Object
function createError(message, status) {
  const error = new Error()
  error.message = message
  error.status = status
  return error
}

// Route for home page
app.get('/', (req, res) => {
  res.render('index', {data})
})

// Route for projects
app.get('/project/:id', (req, res) => {
  const project = data.projects.find((item) => item.id === +req.params.id)
  if (project) {
    res.render('project', {project})
  } else {
    const error = createError('No Project Found', 404)
    errorHandler(res, error)
  }
})

// Route for /about
app.get('/about', (req, res) => {
  res.render('about', {data})
})

// Runs if no routes are hit
app.use((req, res, next) => {
  const error = createError('No Route Found', 404)
  errorHandler(res, error)
})

// Runs if server error
app.use((err, req, res, next) => {
  const error = createError('Server Error Something Broke!', 500)
  errorHandler(res, error)
})

// App listens for requests on port 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
