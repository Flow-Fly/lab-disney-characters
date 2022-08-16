/**
 *  Your code ⬇️
 */

const express = require('express');
const app = express();

const data = require('./disney.json');

app.get('/', (request, response) => {
	response.send("Hello world!");
});

app.listen(3000);

