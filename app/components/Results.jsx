import React from 'react';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    let currentPage = this.state.page + 1;
    this.setState({page: currentPage}, ()=>{
      this.props.loadMore(this.state.page)
    });
  }
  
  render() {
    let userinfo = this.props.user;
    let followers = this.props.followers;
    let loadMoreFollowers;
    // show "load more" button if there are more followers to load
    if (this.props.moreFollowers) {
      loadMoreFollowers = <input type="button" value="load more" onClick={this.loadMore}/>
    }
    if(userinfo && userinfo !== "invalid") {
      return (
        <div>
          <div className="profile-pic"><img src={userinfo.avatar_url} /></div>
          <div className="username"><a href={userinfo.html_url}>{userinfo.login}</a></div>
          <div className="follower-info">
            Followers: <span className="follower-count">{userinfo.followers}</span> {loadMoreFollowers}
          </div>
          <ul>
            {this.props.followers.map(follower => {
              return <li className="follower" key={follower.id}><img src={follower.avatar_url} title={follower.login} /></li>;
            })}
          </ul>
        </div>
      );
    } else if (userinfo === "invalid"){
      return (
        <div className="username not-found">User not found. Please try another search.</div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

module.exports = Results;