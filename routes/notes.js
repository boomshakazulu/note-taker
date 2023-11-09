const notes = require('express').Router()
const {readAndAppend, readFromFile, writeToFile} = require('../helper/fsUtils')
const uuid = require('../helper/uuid');
//reads existing notes and parses the data
notes.get('/', (req,res)=>{
    readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
})
//reads and appends the note to the page
notes.post('/', (req,res) => {
   const {title, text} = req.body

   if(req.body) {
    const newNote = {
        title,
        text,
        id: uuid()
    }

    readAndAppend(newNote, './db/db.json')
    res.json(`note added succesfully`)
    
   }else{
    res.errored('error in adding note')
   }
})
//deletes notes after parsing and using the id number for removal
notes.delete('/:id', (req, res)=>{    
    readFromFile('./db/db.json').then((data)=> JSON.parse(data))
    .then(data=>{
        const newNotes = data.filter((note)=>{
            return note.id !== req.params.id
        })
        console.log(newNotes)
        writeToFile('./db/db.json', newNotes)
        res.json('note deleted')
    })
})
//export for route
module.exports = notes

