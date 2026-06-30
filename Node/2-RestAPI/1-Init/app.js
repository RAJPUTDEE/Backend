// This express script uses nodemon to run the server.
// nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
// Perfect for only for development and not production.
// To install nodemon locally npm install --save-dev nodemon.
// To run using nodemon, as installed locally use 'node_modules/.bin/nodemon app.js'
// It's a complex command hence we write it in scripts section of package.json file.
// package.json --> under scripts --> "dev":"nodemon app.js", and run it using 'npm run dev' command.

const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('Welcome to Course Rating Service');
})

app.listen(3000, () => {
    console.log('Express Server is running on port 3000');
})