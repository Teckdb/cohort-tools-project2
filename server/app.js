const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const PORT = 5005
const cors = require("cors")

const mongoose = require("mongoose")
const Student = require("./models/Student.model")
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

  const { firstName, LastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Student
    .create({ firstName, LastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
    .then(student => res.sendStatus(201))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


app.get('/api/students', (req, res) => {
  Student
    .find()
    .populate('cohort')
    .then(student => res.json(student))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.get('/api/students/cohort/:cohortId', (req, res) => {
  const { cohortId } = req.params

})

app.get('/api/students/:studentId', (req, res) => {
  const { studentId } = req.params

  Student
    .findById(studentId)
    .populate('cohort')
    .then(student => res.json(student))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.put('/api/students/:studentId', (req, res) => {

  const { studentId } = req.params
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
  } = req.body

  Student
    .findByIdAndUpdate(studentId, {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects
    })
    .then(student => res.sendStatus(200))
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.delete('/api/students/:studentId', (req, res) => {
  const { studentId } = req.params

  Student
    .findByIdAndDelete(studentId)
    .then(student => { res.sendStatus(200) })
    .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
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

require("./error-handling")(app)

// SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})