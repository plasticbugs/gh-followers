const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'))

app.get('/', (request, response)=> {
  response.sendFile(path.resolve('./public/index.html'));
})

module.exports = app;