// Import required modules and middleware
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog'); // Custom middleware for logging requests
const api = require('./routes/index'); // Imported API routes

// Set the port number to either the environment variable or 3001
const PORT = process.env.PORT || 3001;

// Initialize the Express app
const app = express();

// Use the custom clog middleware to log requests
app.use(clog);

// Parse incoming JSON data
app.use(express.json());

// Use the imported API routes under the /api endpoint
app.use('/api', api);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define route to send the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Define route to send the notes HTML page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
