## REST API Structure

http://localhost:9999/restfulservices/v1/users/{id}

- In the above sample URL
  - http is the protocol
  - restfulservices is the Application context
  # Application Context:
  It represents the shared, long-lived global state and configuration environment of the application hosting that API. Unlike a request context—which contains data unique to a single API call (like HTTP headers or request parameters)—the application context holds resources and settings that persist across all incoming API requests.
  - http://localhost:9999/restfulservices is the base URL
  - v1 is the version of the API
  - users is the resource name (plural noun)
  - {id} is a path parameter (dynamic value)
  - Combining restfulservices/v1/users/{id} is the Restful Endpoint
