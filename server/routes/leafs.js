/**
 * leafs.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const leafs = express.Router();
const database = require('../database');
const logger = require('../logger');

const LEAFS_TEAM_ID = 12;

/**
 * GET request for retrieving all of the leaf games.
 */
leafs.get('/games', (req, res) => {
    database.query('SELECT gameid FROM GameInfo WHERE teamid=$1', [ LEAFS_TEAM_ID ]).then((result) => {
        const payload = [];

        logger.log('info', 'rows', { rows: result.rows });

        // Keep track of the queries in a organized manner
        const queries = [];
        for (const row of result.rows) {
            queries.push(
                // Retrieve the two teams that played that game
                database.query('SELECT teamid, teamscore FROM GameInfo WHERE gameid=$1', [ row.gameid ]).then((result) => {
                    const game = {
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
                    return database.query('SELECT * FROM Team WHERE teamid=$1', [ game.team1.id ]).then((result) => {
                        game.team1.name = result.rows[0].teamname;
                        game.team1.city = result.rows[0].city;

                        // Retrieve team 2's name & home city
                        return database.query('SELECT * FROM Team WHERE teamid=$1', [ game.team2.id ]);
                    }).then((result) => {
                        game.team2.name = result.rows[0].teamname;
                        game.team2.city = result.rows[0].city;

                        // Push the game object to the payload to be sent
                        payload.push(game);
                    });
                })
            );
        }

        // Wait until all queries for each game are finished and then send the payload
        return Promise.all(queries).then(() => {
            res.send(payload);
        });
    }).catch((err) => {
        logger.log('error', 'Error in query:', { error: err });
        res.status(500).json({ error: 'Internal Error' });
    });
});

/**
 * GET request for retrieving the official who officiated the most leafs games.
 */
leafs.get('/official/mostGames', (req, res) => {
    const queryString = (
        'SELECT * FROM Official WHERE officialid IN (' +
            'SELECT MAX(officialid) AS officialid FROM Officiation ' +
            'JOIN Game ON Officiation.gameid=Game.gameid WHERE Game.gameid IN (' +
                'SELECT gameid FROM GameInfo WHERE teamid=$1' +
            ')' +
        ')'
    );

    database.query(queryString, [ LEAFS_TEAM_ID ]).then((result) => {
        const payload = {
            id: result.rows[0].officialid,
            firstName: result.rows[0].fname,
            lastName: result.rows[0].lname,
            home: result.rows[0].homecity
        };

        res.json(payload);
    }).catch((err) => {
        logger.log('error', 'Error in query:', { error: err });
        res.status(500).json({ error: 'Internal Error' });
    });
});

/**
 * GET request for retrieving the official who officiated the most leaf wins.
 */
leafs.get('/official/mostWins', (req, res) => {
    const queryString = (
        'SELECT COUNT(Officiation.gameid), officialid from Officiation ' +
        'JOIN Game ON Game.gameid = Officiation.gameid WHERE Game.gameid IN (' +
            'SELECT info1.gameid From GameInfo info1 INNER JOIN (' +
                'SELECT gameid, MAX(teamscore) AS teamscore FROM GameInfo GROUP BY gameid' +
            ') info2 ON info1.gameid=info2.gameid AND info1.teamscore=info2.teamscore ' +
            'WHERE teamid=$1' +
        ') GROUP BY officialid LIMIT 1'
    );

    database.query(queryString, [ LEAFS_TEAM_ID ]).then((result) => {
        return database.query('SELECT * FROM Official WHERE officialid=$1', [ result.rows[0].officialid ]);
    }).then((result) => {
        const payload = {
            id: result.rows[0].officialid,
            firstName: result.rows[0].fname,
            lastName: result.rows[0].lname,
            home: result.rows[0].homecity
        };

        res.json(payload);
    }).catch((err) => {
        logger.log('error', 'Error in query:', { error: err });
        res.status(500).json({ error: 'Internal Error' });
    });
});

/**
 * GET request for retrieving the official who officiated the most leaf losses.
 */
leafs.get('/official/mostLosses', (req, res) => {
    const queryString = (
        'SELECT COUNT(Officiation.gameid), officialid from Officiation ' +
        'JOIN Game ON Game.gameid = Officiation.gameid WHERE Game.gameid IN (' +
            'SELECT info1.gameid From GameInfo info1 INNER JOIN (' +
                'SELECT gameid, MIN(teamscore) AS teamscore FROM GameInfo GROUP BY gameid' +
            ') info2 ON info1.gameid=info2.gameid AND info1.teamscore=info2.teamscore ' +
            'WHERE teamid=$1' +
        ') GROUP BY officialid LIMIT 1'
    );

    database.query(queryString, [ LEAFS_TEAM_ID ]).then((result) => {
        return database.query('SELECT * FROM Official WHERE officialid=$1', [ result.rows[0].officialid ]);
    }).then((result) => {
        const payload = {
            id: result.rows[0].officialid,
            firstName: result.rows[0].fname,
            lastName: result.rows[0].lname,
            home: result.rows[0].homecity
        };

        res.json(payload);
    }).catch((err) => {
        logger.log('error', 'Error in query:', { error: err });
        res.status(500).json({ error: 'Internal Error' });
    });
});

module.exports = leafs;
