/**
 * database.js - Module for making database queries.
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const logger = require('./logger');
const { Pool } = require('pg');
const pool = new Pool({
    // Set max postgres connections to 1 to prevent too many connections error
    max: 1
});

module.exports = {
    // Promise returning function for making SQL queries
    query: (queryString, params) => {
        logger.log('info', 'Connecting to postgres server..');

        // Connect to the database
        return pool.connect().then((client) => {
            logger.log('info', 'Connected, performing query', { query: queryString });

            // Perform the query
            return client.query(queryString, params).then((result) => {
                logger.log('info', 'Query success');

                // Disconnect from the database
                client.release();
                // Return the result
                return result;

            // Catch any errors that could occur with making the query
            }).catch((err) => {
                logger.log('error', 'Failed to make query', { error: err });

                // Disconnect from the database
                client.release();
                // Pass the error to the caller to handle
                throw err;
            });
        });
    }
};
