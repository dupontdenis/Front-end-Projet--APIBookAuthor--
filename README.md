# APIBookAuthor

## Overview

## How to retrieve all books for a given author (the "trick")

To get all books written by a specific author, query the `Book` collection for documents where the `authors` array contains the author's `_id`:

```js
// In a controller or route:
const books = await Book.find({ authors: authorId });
```

Or with REST Client/cURL:

# APIBookAuthor — API Documentation

This repository provides a small REST API to manage authors and books (Node.js, Express, Mongoose).
This README focuses on the API: how to run it, seed data, and the available endpoints with examples.

## Run locally

Install dependencies and start the server:

```bash
npm install
# Seed the database (this will erase authors and books):
npm run seed
# Start the server:
npm start
```

### Prerequisites

- Node.js installed (recommended LTS version).
- MongoDB must be installed and running locally, or reachable via the `MONGO_URL` environment variable. You can run MongoDB quickly with Docker:

```bash
docker run --name mongo -p 27017:27017 -d mongo:latest
```

Make sure the database is reachable at `mongodb://localhost:27017/apiAuhors` (or set `MONGO_URL` accordingly) before running the seed or starting the server.

For development with auto-restart use:

```bash
npm run dev
```

## Seeded data

Running `npm run seed` inserts example authors and books into the database. The seeder adds some authors:

- Jane Austen
- George Orwell
- J.K. Rowling ...

To see the seeded authors and their `_id` values:

```
GET http://localhost:3000/authors
```

Copy an author's `_id` to use when creating books.

## API Endpoints

Base URL: `http://localhost:3000`

Authors

- Create an author

  POST /authors
  Content-Type: application/json

  Body example:

  ```json
  {
    "name": "Alice Example",
    "dateOfBirth": "1985-04-12",
    "dateOfDeath": null
  }
  ```

- List authors

  GET /authors

- Get author by id

  GET /authors/:id

- Update author

  PUT /authors/:id
  Content-Type: application/json

  Body example:

  ```json
  {
    "name": "Alice Updated",
    "dateOfBirth": "1985-04-12",
    "dateOfDeath": null
  }
  ```

- Delete author

  DELETE /authors/:id

Books

- Create a book (use existing author ids)

  POST /books
  Content-Type: application/json

  Body example (single author):

  ```json
  {
    "title": "Example Book",
    "authors": ["<AUTHOR_ID>"]
  }
  ```

  Body example (multiple authors):

  ```json
  {
    "title": "Collected Works (Seeded)",
    "authors": ["<AUTHOR_ID_1>", "<AUTHOR_ID_2>"]
  }
  ```

- List books

  GET /books

- Get book by id

  GET /books/:id

- Update book

  PUT /books/:id
  Content-Type: application/json

  Body example:

  ```json
  {
    "title": "Example Book (Updated)",
    "authors": ["<AUTHOR_ID>"]
  }
  ```

- Delete book

  DELETE /books/:id

## Using seeded IDs in requests

1. Run the seeder: `npm run seed`.
2. Get authors: `GET /authors` and copy an `_id` value.
3. Use that `_id` in the `authors` array when creating a book.

## Notes

- The `authors` field on a `Book` document stores ObjectId references to `Author` documents. The API returns raw references by default. If you need populated author objects, you can populate them in the controller or add a query option to return populated results.
- The seeder will erase the `authors` and `books` collections — do not run it in production.

---

If you'd like, I can add: a) example responses for each endpoint, b) a short Postman collection, or c) auto-fill the `api-requests.http` placeholders with IDs produced by the seeder.

## Frontend tester

A minimal static frontend is included to quickly test the `GET /authors` and `GET /books` endpoints.

- Open the app at: `http://localhost:3000/` after starting the server.
- Click **Load Authors** to fetch `GET /authors` and show authors.
- Click **Load Books** to fetch `GET /books` and show books (populated authors shown when available).

The frontend files are in the `public/` folder: `index.html`, `main.js`, and `style.css`.
