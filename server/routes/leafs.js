/**
 * leafs.js
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

const express = require('express');
const leafs = express.Router();

leafs.get('/', (req, res) => {
    res.send('Leafs end point');
});

module.exports = leafs;
