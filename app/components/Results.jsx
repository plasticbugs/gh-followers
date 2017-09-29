import React from 'react';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let userinfo = this.props.user;
    let followers = this.props.followers;
    let loadMoreFollowers;
    // conditionally render "load more" button if there are more followers to load
    if(userinfo && userinfo !== "invalid") {
      if (!this.props.loading && this.props.moreFollowers) {
        loadMoreFollowers = <input type="button" value="load more" onClick={this.props.loadMore} />
      } else if (this.props.loading) {
        // disable load button if loading
        loadMoreFollowers = <input type="button" value="load more" onClick={this.props.loadMore} disabled/>
      } else {
        loadMoreFollowers = null;
      }
      return (
        <div>
          <div className="profile-pic">
            <img src={userinfo.avatar_url} />
          </div>
          <div className="username">
            <a href={userinfo.html_url}>
              {userinfo.login}
            </a>
          </div>
          <div className="follower-info">
            Followers: <span className="follower-count">{userinfo.followers}</span> {loadMoreFollowers}
          </div>
          <ul className="follower-grid">
            {this.props.followers.map(follower => {
              return (
                <li className="follower" key={follower.id}>
                  <a href="" onClick={(e)=>{e.preventDefault(); this.props.loadThisUser(follower.login)}} >
                    <img src={follower.avatar_url} title={follower.login} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else if (userinfo === "invalid"){
      return (
        <div className="username not-found">
          User not found. Please try another search.
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

module.exports = Results;