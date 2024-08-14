const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const PORT = 5005
const cors = require("cors")

const mongoose = require("mongoose")
const Cohort = require("./models/Cohort.model")

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

app.post('/api/cohorts', (req, res) => {

  const { cohortSlug, cohortName, program,
    format, campus, startDate,
    endDate, inProgress, programManager,
    leadTeacher, totalHours } = req.body

  Cohort
    .create({
      cohortSlug, cohortName, program,
      format, campus, startDate,
      endDate, inProgress, programManager,
      leadTeacher, totalHours
    })
    .then(cohort => res.sendStatus(201))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.get('/api/cohorts', (req, res) => {

  Cohort
    .find()
    .then(cohort => res.json(cohort))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))

})

app.get('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params
  Cohort
    .findById(cohortId)
    .then(cohort => res.json(cohort))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))

})


app.put('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params
  const { cohortSlug, cohortName, program,
    format, campus, startDate,
    endDate, inProgress, programManager,
    leadTeacher, totalHours } = req.body

  Cohort
    .findByIdAndUpdate(cohortId, {
      cohortSlug, cohortName, program,
      format, campus, startDate,
      endDate, inProgress, programManager,
      leadTeacher, totalHours
    })
    .then(cohort => res.sendStatus(200))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.delete('/api/cohorts/:cohortsId', (req, res) => {

  const { cohortId } = req.params

  Cohort
    .findByIdAndDelete(cohortId)
    .then(cohort => res.sendStatus(200))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))

  res.send('Deletes the specified cohort by id ')
})



// SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})