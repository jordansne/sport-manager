/**
 * logger.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const winston = require('winston');

module.exports = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' })
    ]
});
