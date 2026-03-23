/*
Basic HTTP Server in Node.js
===========================

Creates a simple server that responds "Hello World" to HTTP requests on port 3000.

Flow:
Client --Request--> Server --Handler--> Response Headers --> Response Body --> Client

Steps:
1. Load 'http' module
2. Create server with request handler
3. Set response (status 200, content-type)
4. Send "Hello World"
5. Listen on port 3000

Run: node node.js
Test: Visit http://localhost:3000 in browser
*/

// Import HTTP module for server functionality
const http = require("http");

// Create server with request handler (req=request, res=response)
const server = http.createServer((req, res) => {
  // Set response status and content type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send response and end
  res.end("Hello World");
});

// Start server on port 3000
server.listen(3000, () => {
  console.log("Server running on port 3000");
});

