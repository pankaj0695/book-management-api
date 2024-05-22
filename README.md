# Book Management API

## Overview

This project is a simple Book Management API built with Express.js. It provides endpoints to create, retrieve, update, and delete books. Additionally, it includes JWT-based authentication for secure access to the endpoints.

## Features

- User authentication with JWT
- CRUD operations for managing books
- Middleware to verify JWT

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Postman (for testing the API endpoints)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-management-api.git
```

2. Navigate to the project directory:

```bash
cd book-management-api
```

3. Install the dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
node app.js
```

The server will be running at http://localhost:3000.

2. Test the API endpoints using Postman.

## API Endpoints

### User Login

- Endpoint: /login
- Method: POST
- Description: Authenticates the user and returns a JWT token.
- Request Body:

```json
{
  "username": "pankajgupta",
  "password": "pankaj@express"
}
```

- Response:

```json
{
  "token": "your-jwt-token"
}
```

### Create Book

- Endpoint: /books
- Method: POST
- Description: Creates a new book.
- Headers: Authorization: Bearer <your-jwt-token>
- Request Body:

````json
  {
  "title": "Book Title",
  "author": "Author Name"
  }
- Response:
```json
  {
  "id": 1,
  "title": "Book Title",
  "author": "Author Name"
  }
````

### Retrieve Books

- Endpoint: /books
- Method: GET
- Description: Retrieves all books.
- Headers: Authorization: Bearer <your-jwt-token>
- Response:

```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name"
  }
]
```

### Retrieve Single Book

- Endpoint: /books/:id
- Method: GET
- Description: Retrieves a single book by ID.
- Headers: Authorization: Bearer <your-jwt-token>
- Response:

```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name"
}
```

### Update Book

- Endpoint: /books/:id
- Method: PUT
- Description: Updates a book by ID.
- Headers: Authorization: Bearer <your-jwt-token>
- Request Body:

```json
{
  "title": "Updated Book Title",
  "author": "Updated Author Name"
}
```

- Response:

```json
{
  "id": 1,
  "title": "Updated Book Title",
  "author": "Updated Author Name"
}
```

### Delete Book

- Endpoint: /books/:id
- Method: DELETE
- Description: Deletes a book by ID.
- Headers: Authorization: Bearer <your-jwt-token>
- Response:

```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name"
  }
]
```

## Testing with Postman

1. Login:

- Send a POST request to http://localhost:3000/login with the body containing the username and password.
- Copy the returned JWT token.

2. Create a Book:

- Send a POST request to http://localhost:3000/books with the JWT token in the Authorization header (e.g., Bearer <your-jwt-token>).
- Include the book details in the body.

3. Retrieve All Books:

- Send a GET request to http://localhost:3000/books with the JWT token in the Authorization header.

4. Retrieve a Single Book:

- Send a GET request to http://localhost:3000/books/:id with the JWT token in the Authorization header.

5. Update a Book:

- Send a PUT request to http://localhost:3000/books/:id with the JWT token in the Authorization header.
- Include the updated book details in the body.

6. Delete a Book:

- Send a DELETE request to http://localhost:3000/books/:id with the JWT token in the Authorization header.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [JSON Web Token (JWT)](https://jwt.io/)
