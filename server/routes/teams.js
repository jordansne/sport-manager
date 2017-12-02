/**
 * teams.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const teams = express.Router();
const database = require('../database');
const logger = require('../logger');

/**
 * GET request for retrieving a list of teams.
 */
teams.get('/', (req, res) => {
    let sortType, sortDir;

    // If sorting preference was not provided, default to team ascending sort type
    if (req.query.sort === undefined) {
        sortType = 'name';
        sortDir = 'asc';
    } else {
        if (req.query.sort.type === undefined) {
            sortType = 'name';
        } else {
            sortType = req.query.sort.type;
        }

        if (req.query.sort.dir === undefined) {
            sortDir = 'asc';
        } else {
            sortDir = req.query.sort.dir;
        }
    }

    // Verify that the correct sorting query was specified
    if ((sortType !== 'name' && sortType !== 'city') || (sortDir !== 'asc' && sortDir !== 'dsc')) {
        res.status(400).json({
            error: 'invalid sort params: sort[type] must be \'name\' or \'city\' & sort[dir] must be \'asc\' or \'dsc\''
        });
        return;
    }

    // Build the SQL query string
    let query = 'SELECT * FROM Team';

    if (sortType === 'name') {
        query += ' ORDER BY teamname';
    } else {
        query += ' ORDER BY city';
    }

    if (sortDir === 'dsc') {
        query += ' DESC';
    }

    database.query(query).then((result) => {
        // Rename attributes and only send rows
        const payload = result.rows.map((row) => {
            return {
                id: row.teamid,
                name: row.teamname,
                city: row.city
            };
        });

        res.json({ teams: payload });
    }).catch((err) => {
        logger.log('error', 'Error accessing database', { error: err });
        res.status(500).json({ error: 'Internal error' });
    });
});

module.exports = teams;
