/**
 * index.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

require('dotenv').config();

const server = require('./server.js');
const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
    console.log('Server now listening on port ' + PORT);
});
