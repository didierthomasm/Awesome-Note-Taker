// Import required modules and utilities
const notes = require('express').Router();
const uuid = require('../helper/uuid'); // Utility for generating unique IDs
const { readFromFile, readAndAppend, writeToFile } = require('../helper/fsUtils'); // File system utilities

// Handle GET request to retrieve all notes
notes.get('/', (req, res) => {
  // Read notes from file
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Handle POST request to add a new note
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    // Create a new note with a unique ID
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // Append the new note to the file
    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

// Handle DELETE request to delete a note by ID
notes.delete('/:id', (req, res) => {
  const noteIdToDelete = req.params.id;

  // Read notes from file
  readFromFile('./db/db.json')
    .then((data) => {
      const notesData = JSON.parse(data);
      // Filter out the note to be deleted
      const updatedNotes = notesData.filter((note) => note.id !== noteIdToDelete);
      // Update the file with the updated notes
      writeToFile('./db/db.json', updatedNotes);

      res.json({ status: 'success', message: 'Note deleted successfully' });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Export the configured notes router
module.exports = notes;
