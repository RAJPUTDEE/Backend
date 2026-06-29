### Write Following practice APIs
- Gets the list of the courses and their details
- Gets the details of the course id 1234
- Creates the course with the provided details
- Modifies the information of the course with the provided details
- Gets the average ratings for the course 1234

/* Default Endpoint http://localhost:8080/api/

## Gets the list of the courses and their details
Best practice: Use plural nouns for resources
1. GET /api/v1/courses (This is correct API endpoint)
2. GET /api/courses (missing v1)
3. GET /api/v1/course/{course_id} (course_id is not required)
4. GET /api/v1/course/getAll (no need for getAll)

## Gets the details of the course id 1234
1. GET /api/v1/courses/1234 (This is correct API endpoint)
2. GET /api/v1/courses/:1234 (This is also correct)

## Creates the course with the provided details
1. POST /api/v1/courses
        {body}

## Modifies the information of the course with the provided details
1. PUT /api/v1/courses/:courseId
        {body}
2. PATCH /api/v1/courses/id
            {body}

PUT --> To replace the resource
PATCH --> Update part of a resource

## Gets the average ratings for the course {id}
1. GET /api/v1/courses/{id}/students/studentId/avgRating (Need course rating not students rating the courses)

2. GET /api/v1/courses/:courseId?field=average (Assuming that there's a field within the resource named 'average')

3. GET /api/v1/courses/1234/ratings?stat=average
4. GET /api/v1/courses/:courseId/ratings?aggregate=avg
(Both are acceptable like considering ratings for courses and then finding only the avg. This means that ratings might have best, worst, good and avg and we are only using avg from that ratings.)

- All the above 4 api end points are written from a courses perspective; for a person who is working in the same course department.

5. GET /api/v1/ratings?courseId:=courseId&aggregate=avg 
(This is written such that only analytics team is getting the information and they have a specific resource called ratings)

- Any parameters after '?' in the api endpoint are called optional parameters.