const notes = require('express').Router();
const uuid = require('../helper/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helper/fsUtils')

notes.get('/', (req, res) =>
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ error: err.message }))
);

notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if ( title && text ) {
    const newNote = {
      title,
      text,
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

notes.delete('/:id', (req, res) => {
  const noteIdToDelete = req.params.id;

  readFromFile('./db/db.json')
    .then((data) => {
      const notesData = JSON.parse(data);
      const updatedNotes = notesData.filter((note) => note.noteId !== noteIdToDelete);
      writeToFile('./db/db.json', updatedNotes);

      res.json({ status: 'success', message: 'Note deleted successfully' });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = notes;