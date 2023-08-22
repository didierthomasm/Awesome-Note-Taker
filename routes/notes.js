const notes = require('express').Router();
const uuid = require('../helper/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helper/fsUtils')

notes.get('/', (req, res) =>
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ error: err.message }))
);

notes.post('/', (req, res) => {
  const { title, text: note } = req.body;

  if ( title && note ) {
    const newNote = {
      title,
      note,
      noteId: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response ={
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
  }
);

notes.delete('/:id', (req, res) =>  {

})

module.exports = notes;