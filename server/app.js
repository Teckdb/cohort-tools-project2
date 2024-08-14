const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const PORT = 5005
const cors = require("cors")

const mongoose = require("mongoose")

const databaseName = 'cohort-tools-api'

const MONGO_URI = `mongodb://127.0.0.1:27017/${databaseName}`

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name
    console.log(`Connected to Mongo! Database name: "${dbName}"`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err)
  })

const app = express()

app.use(
  cors()
)

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())



// STUDENT ROUTES
app.post('/api/students', (req, res) => {
  res.send('prueba de post')
})

app.get('/api/students', (req, res) => {
  res.send('prueba de get')
})

app.get('/api/students/cohort/:cohortId', (req, res) => {
  const { cohortId } = req.params
  res.send(`prueba de get con endpoint en ${cohortId}`)
})

app.get('/api/students/:studentId', (req, res) => {
  const { studentId } = req.params
  res.send(`prueba de get con endpoint en ${studentId}`)
})

app.put('/api/students/:studentId', (req, res) => {
  const { studentId } = req.params
  res.send(`prueba de get con endpoint en PUT de ${studentId}`)
})

app.delete('/api/students/:studentId', (req, res) => {
  const { studentId } = req.params
  res.send(`prueba de get con endpoint en DELETE ${studentId}`)
})




// COHORT ROUTES
app.get('/api/cohorts', (req, res) => {
  res.send('test get all cohorts!')
})

app.get('/api/cohorts/:cohortId', (req, res) => {
  const { cohortId } = req.params
  res.send(cohortId)
})

app.post('/api/cohorts', (req, res) => {
  res.send('Creates a new cohort')
})

app.put('/api/cohorts/:cohortId', (req, res) => {
  res.send('Updates the specified cohort by id')
})

app.delete('/api/cohorts/:cohortsId', (req, res) => {
  res.send('Deletes the specified cohort by id ')
})



// SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})