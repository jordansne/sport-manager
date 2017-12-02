/**
 * server.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const app = express();
const path = require('path');

const routes = require('./routes');
const URL_PREFIX = process.env.URL_PREFIX || '';

// Serve static files (bundle.js)
app.use(URL_PREFIX, express.static(path.resolve(__dirname, '..', 'dist')));

// Route API request to routes.js
app.use(URL_PREFIX + '/api', routes);

// Serve the index file for all paths
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
