const axios = require('axios');

let username = process.env.GITHUB_USERNAME;
let password = process.env.GITHUB_TOKEN;

const getUserInfo = function(query, cb) {
  axios.get('https://api.github.com/users/' + query, {
    auth: {
      username: username,
      password: password
    }
  })
  .catch(error => {
    if(error) {
      cb(error);
    }
  })
  .then(response => {
    if(response && response.status === 200) {
      axios.get(response.data.followers_url, {
        auth: {
          username: username,
          password: password
        }
      })
      .then(followers => {
        cb(null, {user: response.data, followers: followers.data});
      })
    } else {
      const error = new Error('Bad response from API: ', response);
      cb(error);
    }
  })
}

const getNextPageOfFollowers = function(pageNum, followerURL, cb) {
  axios.get(followerURL, {
    params: {
      page: pageNum
    },
    auth: {
      username: username,
      password: password
    }
  })
  .catch(error => {
    cb(error);
  })
  .then(response => {
    cb(null, response.data);
  });
}

module.exports = {
  getUserInfo: getUserInfo,
  getNextPageOfFollowers: getNextPageOfFollowers
}