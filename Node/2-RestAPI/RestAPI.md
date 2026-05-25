### What is an API?
 Application Programming Interface(API) is an interface between two systems which follows a set of rules and protocols to allow software applications to communicate and share data with each other.

 It acts as a bridge between programs/applications/systems, verifies request and provides response.

 It revolves around nouns and verbs.

- ## Types of API
- REST API: Representational State Transfer, uses HTTP methods and is stateless.
- SOAP API: Simple Object Access Protocol, uses XML and is more rigid.
- GraphQL API: A query language for APIs, allows clients to specify exactly what data they need.
- gRPC API: A high-performance RPC framework that uses Protocol Buffers for serialization.
- # Kernel level API
- POSIX API: A standard for Unix-like operating systems, provides system calls for file I/O, process management, and more.
- Windows API: A set of APIs for Windows operating systems, provides functions for GUI, file I/O, and more.

### What is REST API?
- Representational State Transfer is an architectural principle(which provides guidance to write API). It represents best practices which are not enforced(do not enforce anything) on the application but it helps develop strong APIs.
- It uses HTTP methods (GET, POST, PUT, PATCH, DELETE) to perform operations on resources.
- It is stateless, meaning each request from client to server must contain all the information needed to understand and process the request. The server does not store any client context between requests.
- It typically uses JSON for data exchange, but can also use XML/HTML/PLAIN TEXT or other formats.

