// Import required module
const express = require('express');

// Import the router for notes
const notesRouter = require('./notes');

// Initialize the Express app
const app = express();

// Use the notesRouter for routes under the '/notes' endpoint
app.use('/notes', notesRouter);

// Export the configured Express app
module.exports = app;
