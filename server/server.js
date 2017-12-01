/**
 * server.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const path = require('path');

const app = express();
const routes = require('./routes');

// Serve static files (bundle.js)
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// Route API request to routes.js
app.use('/api', routes);

// Serve the index file for all paths
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
