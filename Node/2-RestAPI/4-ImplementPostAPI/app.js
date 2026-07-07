const express = require('express');

const app = express();

// Express in-built middleware to parse incoming request body in JSON format and make it available in req.body
app.use(express.json());

//Other supported parsers are
// 1. express.urlencoded() - To parse incoming request body in URL-encoded format
// 2. express.text() - To parse incoming request body in text format
// 3. express.raw() - To parse incoming request body in raw format

// 4. body-parser - A third-party middleware to parse incoming request body in various formats. It is not recommended to use this middleware as it is no longer maintained and has security vulnerabilities.

const courses = [
    {
        id: 1,
        name: 'node.js',
        rating: 4.5,
        description: "Learn node js",
        instructions: "JC",
        difficulty: "Begineer",
        price: 200
    },
    {
        id: 2,
        name: 'React.js',
        rating: 4.5,
        description: "Learn React js",
        instructions: "JC",
        difficulty: "Begineer",
        price: 200
    },
    {
        id: 3,
        name: 'node.js',
        rating: 4.5,
        description: "Learn node js",
        instructions: "JC",
        difficulty: "Begineer",
        price: 200
    }
];

const logger = (req, res, next) => {
    console.log(`Request Received on ${Date.now()}`, req.url);
    next();
};

// I want to log every request
app.use(logger);

// Post API to create a new course
app.post('/api/v1/courses', (req,res) => {
    // In post request, we can send data in the request body. This data can be in any format like JSON, XML, etc. But most of the time, we send data in JSON format.
    // To access the data sent in the request body, we need to use a middleware called express.json(). This middleware is used to parse the incoming request body in JSON format and make it available in req.body.
    
    console.log(req.body); // This will log incoming request in JSON format.
    
    // But cannot parse other formats like XML, text, etc. To parse other formats, we need to use other middlewares like express.urlencoded(), express.text(), express.raw(), etc.
    
    res.send('Course created successfully');
});

// We will send the post request using Postman, And the response will be logged in JSON and then send a response stating "Course created successfully".

// API to get courses using courseId
app.get('/api/v1/courses/:courseId',(req,res) => {

    const course = courses.find(c => c.id === parseInt(req.params.courseId));

    if(!course) {
        res.status(404).send('The course with the given ID was not found');
    }

    res.send(course);
})

app.get('/', (req,res) => {
    res.send('Welcome to Course Rating Service');
})

app.listen(3000, () => {
    console.log('Express Server is running on port 3000');
})