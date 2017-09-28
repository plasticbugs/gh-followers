# Github Followers

## Problem:
Create a service that allows the user to search for a Github username. A successful search should return the username, follower count and the first page of followers' avatars. A "load more" button should fetch the next page of results. The button should no longer display when there are no more pages to fetch.

## Solution:
For the back-end, I created a simple server with Sinatra. Sinatra  serves up the static files (.html, .css, .js) to the client. I chose to use React on the front-end to dynamically display the returned data from the Github API.

### Why Sinatra?
I've been working with Node.js for the backend and enjoy using it quite a bit. However, because I only need one route and there's no data being stored, I felt that Sinatra could get the job done faster and easier than Node with less configuration.

### Why React?
I chose React because it's a fast and versatile front-end framework that I really enjoy using. I was able to quickly build a few components with all the necessary features in the spec. The application conditionally renders elements like the "load more" button and an error message if the user searches for an invalid username.

### React CDN
For production, I would prefer to transpile my JSX on the server side and minify and concatenate all the generated JS into one file using a tool like Webpack. Instead, as a trade-off to get up and running as quickly as possible, I used a CDN to load React into the browser. The app's logic inside `script.js` is written in JSX and is transpiled by the client.