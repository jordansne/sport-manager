/**
 * teams.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const teams = express.Router();

teams.get('/', (req, res) => {
    res.send('Teams end point');
});

module.exports = teams;
