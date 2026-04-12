// To create a simple http server without any framework, we can use the built-in http module in Node.js. The http module provides a way to create an HTTP server and handle HTTP requests and responses.

const http = require('http'); // Importing the http module to create an HTTP server

// Create an HTTP server using http.createServer(). This method takes a callback function that will be executed every time a request is made to the server. The callback function takes two parameters: req (the request object) and res (the response object). In this example, we use res.write() to send a response back to the client with the message "Hello from http!" and then call res.end() to indicate that the response is complete.

const server = http.createServer((req, res) => {
    
    res.writeHead(200, {"Content-Type": 'text/plain'}); // Set the response header to indicate that the content type is plain text
    
    res.write('Hello from http!'); // Write the response body
    
    res.end(); // End the response

    // We can also directly send the response using res.end() like this: res.end('Hello from http!');

});

// Start the server and listen on port 3000. When the server is running, it will log a message to the console indicating that it is running and the URL where it can be accessed.

server.listen(3000, () => {
    
    console.log('Server is running on http://localhost:3000');
});