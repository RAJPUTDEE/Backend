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

// API to get all courses
app.get('/api/v1/courses', (req,res) => {
    // If url is like /api/v1/courses?limit=1&offset=2, then req.query will be { limit: '1', offset: '2' }
    // After question mark in the above url, we can pass any number of query parameters.
    // These query parameters are optional and is used to filter the data.
    
    console.log(req.query);

    // These query parameters needs to be handled in the code to filter the data. For example, if limit=1 is passed, then only 1 course should be returned.
    // Query parameter when received at node, node converts it into JSON object and stores it in req.query. So, we can access the query parameters using req.query.<query_parameter_name>


    // To log url
    console.log(req.url);
    res.send(courses);
})

// API to get a specific course by id

// //Below script violates DRY(Don't repeat yourself) principle. We can use route parameters to avoid this repetition.
// app.get('/api/v1/courses/0', (req,res) => {
//     console.log(req.url);
//     res.send(courses[0]);
// })

// app.get('/api/v1/courses/1', (req,res) => {
//     console.log(req.url);
//     res.send(courses[1]);
// })

// app.get('/api/v1/courses/2', (req,res) => {
//     console.log(req.url);
//     res.send(courses[2]);
// })

app.get('/api/v1/courses/:courseId', (req,res) => { // :courseId is a route parameter. It is a placeholder for the actual value which will be passed in the url. For example, if the url is /api/v1/courses/0, then req.params.courseId will be 0.
    // :courseId is also called as path parameter. It is used to identify a specific resource. In this case, it is used to identify a specific course. These path parameter are mandatory and should be passed in the url.
    console.log(req.params); // req.params is an object which contains the route parameters. In this case, it will be { id: '0' } for /api/v1/courses/0
    console.log(req.url);

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