# Github Followers
[Link to the deployed application on Heroku](https://gh-follower-demo-app.herokuapp.com/)

[Link to the repo](https://github.com/plasticbugs/gh-followers)

## Problem:
Create a service that allows the user to search for a Github username. A successful search should return the username, follower count and the first page of followers' avatars. A "load more" button should fetch the next page of results. The button should no longer display when there are no more pages to fetch.

## Solution:
For the back-end, I created a simple server with Node which required a little bit of configuration. I used Webpack to bundle the frontend React code with my transpiled JSX into one Javascript file. I chose to use React on the front-end to dynamically display the returned data from the Github API.

I used Jest/Enzyme for my testing framework. I don't have a lot of experience testing front end code with Jest & Enzyme, so my testing could certainly use improvement. I quickly mocked my async API calls after realizing that I couldn't call setTimeout to wait for a response and would have to otherwise rewrite a fair amount of code to write proper tests.

### Why Node?
I've been working with Node.js for a while and enjoy using it quite a bit. It's especially handy when I'm working with an application that is likely to change and grow more complex over time and will go through multiple iterations. It's highly configurable and is fairly easy to deploy and write tests against.

### Why React?
I chose React because it's a fast and versatile front-end framework that I really enjoy using and am very comfortable with. I was able to quickly build a few components with all the necessary features described in the spec. The application conditionally renders elements like the "load more" button and an error message if the user searches for an invalid username.

### If I Had More Time...

If I had more time, I would have written more & better test coverage against the frontend code. I would have also implemented more features like paginating the followers and creating routes with React Router so that pages could be bookmarked.

### Issues I Ran Into

I ran into rate-limiting issues with the Github API while testing, which led me to use Basic Auth. Basic Auth doesn't work when you have 2-factor authentication on your account, so that caused requests to 401. Ultimately, for the sake of time, I removed authentication from the deployed app.
