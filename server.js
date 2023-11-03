const express = require('express')
const path = require('path')
const fs = require('fs')
const api = require('./routes.index.js')
const PORT = process.env.port ||3001

const app =express()
// middleware for parsing
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('./api', api)

app.use(express.static('public'))
//route for homepage
app.get('/', (req,res)=>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)
//route for notes
app.get('/notes',(req,res)=>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)
//rerout to html on 404 err
app.get('*',(req,res)=>
    res.status(404).sendFile(path.join(__dirname, '/public/404.html'))
)

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
)