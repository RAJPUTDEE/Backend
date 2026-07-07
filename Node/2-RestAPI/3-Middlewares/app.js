const express = require('express');

const app = express();

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
]
//Middleware is a function that is executed during the lifecycle of a request to the Express server. Each middleware has access to the HTTP request and response for each route (or path) it is attached to.
//Middleware can execute code, make changes to the request and the response objects, end the request-response cycle, and call the next middleware in the stack.
//Middleware functions are used to perform the following tasks:
// 1. Logging
// 2. Authentication and Authorization
// 3. Error handling
// 4. Request parsing
// 5. Response formatting
// One way to write a middleware is to write a function and call it in the route handler.
// we can use app.use() to register a middleware which will be called for every request.
const logger = (req) => {
    console.log("request received on", req.url);
}

app.use(logger); // This will call logger function for every request.

// Another way to write a middleware is to write a function and pass it as an argument to the route handler. This is called inline middleware.
const logger2 = (req, res, next) => {
    console.log("request received on logger2", req.url);
    next(); // This will call the next middleware in the stack. If we don't call next(), the request will be stuck and will not reach the route handler.
}

// API to get all courses
app.get('/api/v1/courses', logger2, (req,res) => {
    // logger(req); violates DRY
    res.send(courses);
})

// //Another way to get all courses is
// const getAllCoursesHandler = (req, res, next) => {
//     res.send(courses);
//     next();
// }

// app.get('/api/v1/courses', logger2, getAllCoursesHandler); // This will call getAllCoursesHandler function for every request to /api/v1/courses. This is called route specific middleware.

// Above middle ware can also be passed as an array like [logger2, getAllCoursesHandler]

app.get('/api/v1/courses/:courseId', logger2,(req,res) => {
    // logger(req); violates DRY

    const course = courses.find(c => c.id === parseInt(req.params.courseId));

    if(!course) {
        res.status(404).send('The course with the given ID was not found');
    }

    res.send(course);
})

app.get('/', logger2, (req,res) => {
    res.send('Welcome to Course Rating Service');
})

app.listen(3000, () => {
    console.log('Express Server is running on port 3000');
})