const express = require('express');
const app = express();
const path = require('path');
const Github = require('./api/githubHelper');

app.use(express.static('public'))

app.get('/', (request, response)=> {
  response.sendFile(path.resolve('../public/index.html'));
})

app.get('/api/user', (req,res) => {
  let username = req.query.username;
  Github.getUserInfo(username, (err, result) => {
    if(err) {
      console.log(err);
      res.send({});
    } else {
      res.send(result);
    }
  })
});

app.get('/api/followers', (req, res) => {
  let followerURL = req.query.url;
  let page = req.query.page;
  Github.getNextPageOfFollowers(page, followerURL, (err, result) => {
    if(err) {
      console.log(err);
      res.send("There was an error retrieving this data: ", err);
    } else {
      res.send(result);
    }
  })
})

module.exports = app;