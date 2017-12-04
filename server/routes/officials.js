/**
 * officials.js - Module for handling all the /api/officials APIs.
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const officials = express.Router();
const database = require('../database');
const logger = require('../logger');

/**
 * GET request for retrieving a list of officials ordered by last name.
 */
officials.get('/', (req, res) => {
    database.query('SELECT * FROM Official ORDER BY lname').then((result) => {
        // Rename attributes and only send rows
        const payload = result.rows.map((row) => {
            return {
                id: row.officialid,
                firstName: row.fname,
                lastName: row.lname,
                home: row.homecity
            };
        });

        // Send the official data
        res.json({ officials: payload });
    }).catch((err) => {
        logger.log('error', 'Error accessing database', { error: err });
        res.status(500).json({ error: 'Internal Error' });
    });
});

module.exports = officials;
