const express = require('express')

const notesRouter = require('./notes')

const app = express()
//route for /api/notes
app.use('/notes', notesRouter)

module.exports=app
