// To create a simple http server using express

// Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It allows you to create web servers and APIs quickly and easily.

const express = require('express'); // Importing the express module to create a web server
const app = express(); // Creating an instance of the express application. This instance will be used to define routes and middleware for the web server.

// Define a route for the root URL ("/"). When a GET request is made to this URL, the server will respond with "Hello from express!".
// app.get() takes two arguments: the first is the path for the route (in this case, "/"), and the second is a callback function that will be executed when a request is made to that route. The callback function takes two parameters: req (the request object) and res (the response object). In this example, we use res.send() to send a response back to the client with the message "Hello from express!".

app.get('/', (req, res) => {
    res.send('Hello from express!');
});

// Start the server and listen on port 3000. When the server is running, it will log a message to the console indicating that it is running and the URL where it can be accessed.

app.listen(3000);
console.log('Server is running on http://localhost:3000');