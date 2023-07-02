# REST API with MongoDB Database

This repository contains a RESTful API implemented using Node.js and MongoDB as the database. It provides endpoints for managing a todo list.

## Features

- CRUD operations for managing todo items.
- Pagination when retrieving a list of todo items.
- Unit testing using Jest.
- Integration with MongoDB as the database.

## Prerequisites

Before running the application, ensure that the following prerequisites are met:

- Node.js and npm are installed on your machine.
- MongoDB is installed and running.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kingdinner/TODOSWithMONGODB.git
```

2. Navigate to the project directory:

```bash
cd your-repo
```

3. Install the dependencies:

```bash
npm install
```

4. Set up the MongoDB connection:

   - Update the MongoDB connection string in env file to connect to your MongoDB database.

## Usage

1. Start the server:

```bash
npm start
```

2. The API will be accessible at `http://localhost:3000`.

## Endpoints

The following endpoints are available:

- `GET /todos`: Retrieves a list of all todo items.
- `GET /todos/:id`: Retrieves a specific todo item by ID.
- `POST /todos`: Creates a new todo item.
- `PUT /todos/:id`: Updates an existing todo item by ID.
- `DELETE /todos/:id`: Deletes a todo item by ID.

For detailed information about the request and response formats, please refer to the API documentation or explore the source code.

## Pagination

The `/todos` endpoint supports pagination. You can specify the `page` and `limit` query parameters to control the page number and the number of items per page, respectively.

Example: `GET /todos?page=1&limit=10` retrieves the first page with 10 todo items.

## Unit Testing

Unit tests are implemented using Jest, a popular testing framework for Node.js applications. The tests can be found in the `tests` directory. To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions to this repository are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

