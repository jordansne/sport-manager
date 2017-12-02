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
 * GET request for retrieving individual game info.
 */
games.get('/:id', (req, res) => {
    const queryString = (
        'SELECT Game.gameid, Game.city, Game.gamedate, Game.headofficial, GameInfo.teamid, GameInfo.teamscore ' +
        'FROM Game JOIN GameInfo ON Game.gameid=GameInfo.gameid ' +
        'WHERE Game.gameid=$1'
    );
    let payload;

    database.query(queryString, [ req.params.id ]).then((result) => {
        // Send 404 + empty object when not found
        if (result.rows.length === 0) {
            throw { status: 404 };
        }

        payload = {
            id: result.rows[0].gameid,
            date: result.rows[0].gamedate,
            headOff: result.rows[0].headofficial,
            location: result.rows[0].city,
            team1: {
                id: result.rows[0].teamid,
                score: result.rows[0].teamscore
            },
            team2: {
                id: result.rows[1].teamid,
                score: result.rows[1].teamscore
            }
        };

        // Retrieve team 1's name & home city
        return database.query('SELECT * FROM Team WHERE teamid=$1', [ payload.team1.id ]);
    }).then((result) => {
        payload.team1.name = result.rows[0].teamname;
        payload.team1.city = result.rows[0].city;

        // Retrieve team 2's name & home city
        return database.query('SELECT * FROM Team WHERE teamid=$1', [ payload.team2.id ]);
    }).then((result) => {
        payload.team2.name = result.rows[0].teamname;
        payload.team2.city = result.rows[0].city;

        // Retrieve the officials for the game
        return database.query('SELECT * FROM Officiation WHERE gameid=$1', [ payload.id ]);
    }).then((result) => {
        payload.officials = result.rows.map((row) => {
            return row.officialid;
        });

        // Send the entire payload object
        res.send(payload);
    }).catch((err) => {
        if (err.status === 404) {
            res.status(404).json({});
        } else {
            logger.log('error', 'Error accessing database', { error: err });
            res.status(500).json({ error: 'Internal error' });
        }
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
