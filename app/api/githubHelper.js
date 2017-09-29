import axios from 'axios';
let url = 'https://api.github.com/users/';
let username = process.env.GITHUB_USERNAME;
let password = process.env.GITHUB_TOKEN;

const getUserInfo = function(query, cb) {
  axios.get('https://api.github.com/users/' + query, {
    // auth: { 
    //   username: process.env.GITHUB_USERNAME, 
    //   password: process.env.GITHUB_TOKEN }
  })
  .catch(error => {
    if(error) {
      cb("invalid", null);
      throw(error);
    }
  })
  .then(response => {
    if(response && response.status === 200) {
      axios.get(response.data.followers_url, {
        // auth: { 
        //   username: process.env.GITHUB_USERNAME, 
        //   password: process.env.GITHUB_TOKEN }
      })
      .then(followers => {
        cb(response.data, followers.data);
      })
    } else {
      cb("invalid", null);
    }
  })
}

const getNextPageOfFollowers = function(pageNum, followerURL, cb) {
  axios.get(followerURL, {
    params: {
      page: pageNum
    },
    // auth: { username: process.env.GITHUB_USERNAME,
    //   password: process.env.GITHUB_TOKEN }
  })
  .catch(error => {
    throw(error);
  })
  .then(response => {
    cb(response.data);
  });
}

module.exports = {
  getUserInfo: getUserInfo,
  getNextPageOfFollowers: getNextPageOfFollowers
}