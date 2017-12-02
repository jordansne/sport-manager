/**
 * index.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

require('dotenv').config();

const server = require('./server');
const logger = require('./logger');
const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
    logger.log('info', 'Server now listening on port: ' + PORT + ' with prefix URL: ' + process.env.URL_PREFIX);
});
