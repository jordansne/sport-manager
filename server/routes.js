/**
 * routes.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const router = express.Router();

const gamesRoute =     require('./routes/games');
const leafsRoute =     require('./routes/leafs');
const officialsRoute = require('./routes/officials');
const teamsRoute =     require('./routes/teams');

// Log all API requests
router.use((req, res, next) => {
    console.log('Received API request \'' + req.originalUrl + '\' from: ' + req.hostname);
    next();
});

// Route the request to the appropriate handler
router.use('/games', gamesRoute);
router.use('/leafs', leafsRoute);
router.use('/officials', officialsRoute);
router.use('/teams', teamsRoute);

// If the URL was not found
router.use((req, res) => {
    res.status(404).send('404: Not found');
});

module.exports = router;
