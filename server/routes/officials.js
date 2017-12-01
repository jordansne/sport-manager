/**
 * officials.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const officials = express.Router();

officials.get('/', (req, res) => {
    res.send('Officials end point');
});

module.exports = officials;
