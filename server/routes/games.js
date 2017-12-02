/**
 * games.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const games = express.Router();
const database = require('../database');
const logger = require('../logger');

games.get('/', (req, res) => {
    res.send('Games end point');
});

/**
 * POST request for updating game location.
 * (Use POST instead of PUT because PUT is blocked on CS3319 servers)
 */
games.post('/:id', (req, res) => {
    const location = req.body.location;

    // Ensure location specified
    if (location === undefined) {
        res.status(400).json({ error: 'location was not specified' });
        return;
    }
    // Ensure locaiton is non-empty
    if (location === '') {
        res.status(403).json({ error: 'location can not be empty' });
        return;
    }

    database.query('UPDATE Game SET city=$1 WHERE gameid=$2', [ location, req.params.id ]).then((result) => {
        res.json({ success: {} });
    }).catch((err) => {
        logger.log('error', 'Error accessing database', { error: err });
        res.status(500).json({ error: 'Internal error' });
    });
});

module.exports = games;
