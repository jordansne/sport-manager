/**
 * games.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const games = express.Router();

games.get('/', (req, res) => {
    res.send('Games end point');
});

module.exports = games;
