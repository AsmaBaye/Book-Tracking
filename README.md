# Answer Book Tracking Exercise

## General Requirements

The aim is to build a web app that comply with the following requirement.
On the website, users should be able to:

- Add a new book entry with just a title.
- Transition a book to the "reading" state.
- Move a book to the "to-read" column.
- Shift a book to the "completed" column.
- Delete any book entry.
- Book Entry should only contain book title and nothing else. There is no need to add editing functionality.
- For this task, you're required to craft both a frontend (using NextJS) and a backend (with Python + FastAPI).

## Project Structure

The project root folder has two sub folders called

1.  Backend
2.  Frontend

Inside the root folder there is a docker-compose.yml to start docker and .gitignore file

I. Frontend with NextJS

The home page has Input filed to enter book title and a button to add boook, just below the input filed the three columns represent each book's state— "to-read", "in-progress", and "completed" are displayed. Changes made by a user are saved immediately in the database.

## Development Environment:

### Frontnend

- Framework: NextJS
- Sytling: Tailwind(for overall styling) and shadcn/ui (Input and button imported)

### Backend

- FastAPI for API endpoint
- Database sqlite3 with raw-SQL command

## Test

E2E test: playwright
Backend API test: Pytest

## Acceptance criteria:

### Frontend

- Users can add new books.
- Users can transition books between the three columns: "to-read", "in-progress", and "completed".
- Books display by fetching from the backend via a RESTful API.
- - The RESTful API should align with principles detailed [here](https://dev.tasubo.com/2021/08/quick-practical-introduction-to-restful-apis-and-interfaces.html).
- Incorporate at least one integration or end-to-end test for frontend functionality.
- Codebase uses React, NextJS, and TypeScript.
- Tailwind CSS facilitates a 3-column layout.
- Buttons allow users to shift book entries among columns.
- User actions update the backend via a RESTful API.
- Users can delete a book entry.
- User notifications display if the backend service encounters errors.

### Backend:

- Implement the GET, POST, PUT, and DELETE methods for the book resource.
- Resources should interact with the database via the BookRepository class.
- Create the Book class using the @dataclass annotation.
- Incorporate at least one API test.
- Ensure the code complies with PEP8 standards.
- Repository pattern is used for data storage and retrieval.

## Deployment

You can deploy the app by cloning the repo and run docker compose up
Upon executing:
start http://localhost:3000 after back end service is running
