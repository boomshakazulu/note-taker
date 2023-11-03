const notes = require('express').Router()
const {readAndAppend, readFromFile, writeToFile} = require('../helper/fsUtils')
const uuid = require('../helper/uuid');

notes.get('/', (req,res)=>{
    readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
})

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
//
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
module.exports = notes

