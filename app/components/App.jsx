import React from 'react';
import axios from 'axios';
const Search = require('./Search.jsx');
const Results = require('./Results.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      followers: null,
      nextPage: null,
      moreFollowers: false,
      loading: false,
      currentPage: null
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.checkForMoreFollowers = this.checkForMoreFollowers.bind(this);
  }

  handleLoadMore() {
    let newPage = this.state.currentPage + 1;
    // disable load button and increase page counter
    this.setState({loading: true, currentPage: newPage}, () => {
      // append eager-loaded followers
      let followersCopy = this.state.followers.map(follower => Object.assign({}, follower));
      followersCopy = followersCopy.concat(this.state.nextPage);
      this.setState({followers: followersCopy}, ()=>{
        // eager load the next page of followers and hide load button if none left
        this.checkForMoreFollowers(newPage, (followers) => {
          if (followers.length === 0 ) {
            // hide the button
            this.setState({moreFollowers: false, loading: false});
          } else {
            this.setState({moreFollowers: true, loading: false});
          }
        });
      });
    });
  }

  checkForMoreFollowers(onPage = 2, cb) {
    let followerURL = this.state.user.followers_url;
    axios.get('/api/followers', {
      params: {
        page: onPage,
        url: followerURL
      }
    })
    .then(response => {
      this.setState({nextPage: response.data}, ()=> {
        cb(response.data);
      });
    })
  }

  handleSearch(query, callback) {
    this.setState({nextPage: null, currentPage: 2});
    axios.get('/api/user', {
      params: {
        username: query
      }
    })
    .then(response => {
      if(response.data.user) {
        this.setState({ 
          user: response.data.user,
          followers: response.data.followers
        }, ()=> {
          this.checkForMoreFollowers(this.state.currentPage, (followers) => {
            if(callback) {
              callback(response.data, followers)
            }
            if(followers.length === 0) {
              // hide the button
              this.setState({moreFollowers: false});              
            } else {
              this.setState({moreFollowers: true});
            }
          });
        });
      } else {
        this.setState({user: "invalid"});
        if(callback){
          callback();
        }
      }
    })
  }

  render() {
    return (
      <div id="container">
        <div id="sidebar">
          {/* Begin Octocat */}
          <div className="octocat">
            <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon">GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </div>
          {/* End Octocat */}
          <Search handleSearch={this.handleSearch} />
        </div>
        <div id="content">
          <Results 
            user={this.state.user}
            followers={this.state.followers}
            loadMore={this.handleLoadMore}
            moreFollowers={this.state.moreFollowers}
            loadThisUser={this.handleSearch}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

module.exports = App;
