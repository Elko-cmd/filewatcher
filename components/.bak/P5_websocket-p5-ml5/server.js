// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Endpoint to receive console logs
app.post('/log', (req, res) => {
  const logMessage = req.body.message;
  console.log(`Received log: ${logMessage}`);
  res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
