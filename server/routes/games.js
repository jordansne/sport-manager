/**
 * games.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const games = express.Router();
const database = require('../database');
const logger = require('../logger');

/**
 * GET request for retrieving a list of games.
 */
games.get('/', (req, res) => {
    database.query('SELECT * FROM Game').then((result) => {
        // Rename attributes and only send rows
        const payload = result.rows.map((row) => {
            return {
                id: row.gameid,
                date: row.gamedate,
                headoff: row.headofficial,
                city: row.city
            };
        });

        res.json({ games: payload });
    }).catch((err) => {
        logger.log('error', 'Error in query:', { error: err });
        res.status(500).json({ error: 'Internal Error' });
    });
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
