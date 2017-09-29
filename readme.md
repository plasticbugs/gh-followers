# Github Followers
[Deployed application on Heroku](https://gh-follower-demo-app.herokuapp.com/)

[Github Repo for this demo](https://github.com/plasticbugs/gh-followers)

[My LinkedIn](https://www.linkedin.com/in/scott-moschella/)

## Problem:
Create a service that allows the user to search for a Github username. A successful search should return the username, follower count and the first page of followers' avatars. A "load more" button should fetch the next page of results. The button should no longer display when there are no more pages to fetch.

## Solution:
For the back-end, I created a simple server with Node. I used Webpack to bundle the frontend React code with my transpiled JSX into one Javascript file. I chose to use React on the front-end to dynamically display the returned data from the Github API.

I used Jest/Enzyme for my testing framework. I don't have a lot of experience testing front end code with Jest & Enzyme, so my testing could use improvement.

I decided to eager load the next page of user followers, so that clicking the "load more" button would feel a bit snappier.

I also implemented the ability to click on a follower avatar to see that user and their followers. If you click on a searched user's profile name, it loads their Github page.

### Why Node?
I've been working with Node.js for a while and enjoy using it quite a bit. It's especially handy when I'm working with an application that is likely to change and grow more complex over time and will go through multiple iterations. It's highly configurable and is fairly easy to deploy and write tests against.

### Why React?
I chose React because it's a fast and versatile front-end framework that I really enjoy using and can prototype quickly with. In a short time, I was able to build a few components with all the necessary features described in the spec. The application conditionally renders elements like the "load more" button and an error message if the user searches for an invalid username.

### If I Had More Time...

If I had more time, I would have written more test coverage against the frontend code. I would have also tested the backend code. I would possibly add additional features like paginating the followers and creating routes with React Router so that user pages could be bookmarked. I would also make it so the browser's back button would load previous states/searches.

### Issues I Ran Into

I ran into rate-limiting issues with the Github API while testing, which led me to use Basic Auth. Unfortunately, Basic Auth doesn't work when you have 2-factor authentication on your account, which caused requests to 401. Ultimately, for simplicity and the sake of time, I turned off 2FA on my Github account so I could continue to use Basic Auth for accessing the Github API.

### Other Projects I'm Proud Of!

A long time ago, I created a fork of GIMP called [Gimpshop](https://en.wikipedia.org/wiki/GIMPshop). Thousands of people have downloaded and used it as an alternative to Adobe Photoshop.

I created a YouTube to MP3 podcast generator called [Podcasty](https://github.com/plasticbugs/podcasty). It converts YouTube channels into iTunes-friendly XML feeds.

![podcast gif](https://raw.githubusercontent.com/plasticbugs/podcasty/master/demo.gif)

I created many features and architected the backend for [Ynck](http://www.ynck.io), a social network for Tattoo enthusiasts.

![ynck screenshot](https://media.licdn.com/media-proxy/ext?w=800&h=800&f=n&hash=GwrTXYMha51SX4LTHV%2BXyKR9o1U%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta9Er0Vinkhwfjw8177yE41y87UNCVordEGXyD3u0qYrdf3HtfsfZL-TzuQ4RcC0clFAyKvL6QzflD5S-L43meNtx3Z7gJo24ZxUBbFImi24)