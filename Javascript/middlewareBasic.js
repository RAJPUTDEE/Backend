// Logging Middleware: Logs details about each incoming request.

const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000);

// Authentication Middleware: Checks if a user is authenticated.

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === 'Bearer valid-token') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

app.use(authenticate); // Apply authentication middleware globally

app.get('/secure', (req, res) => {
  res.send('Secure data');
});

app.listen(3000);

// Error Handling Middleware: Catches and processes errors.

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Example error throwing route
app.get('/error', (req, res) => {
  throw new Error('BROKEN');
});

app.listen(3000);