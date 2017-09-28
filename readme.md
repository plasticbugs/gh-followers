# Github Followers

## Problem:
Create a service that allows the user to search for a Github username. A successful search should return the username, follower count and the first page of followers' avatars. A "load more" button should fetch the next page of results. The button should no longer display when there are no more pages to fetch.

## Solution:
For the back-end, I created a simple server with Node which required a little bit of configuration. I used Webpack to bundle the frontend React code with my transpiled JSX into one Javascript file. After I had a fairly complete application, I used Jest to write some tests against the frontend code. I chose to use React on the front-end to dynamically display the returned data from the Github API.

### Why Node?
I've been working with Node.js for a while and enjoy using it quite a bit. It's especially handy when I'm working with an application that is likely to change and grow more complex over time and will go through multiple iterations. It's highly configurable and is fairly easy to deploy.

### Why React?
I chose React because it's a fast and versatile front-end framework that I really enjoy using and am very comfortable with. I was able to quickly build a few components with all the necessary features described in the spec. The application conditionally renders elements like the "load more" button and an error message if the user searches for an invalid username.

### If I Had More Time...

I would have likely normalized instead of reset the CSS, but I feel like normalization would have required writing more custom CSS to do things like remove list item bullets and fix spacing issues.

I would have also written some basic tests for the backend code, but since at this time it's only serving up static assets, I felt it would be out of scope for a project with this amount of complexity.