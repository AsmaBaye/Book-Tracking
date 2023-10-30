import uvicorn
import sqlite3
from typing import List
from fastapi import FastAPI, Depends, HTTPException
# Import the database connection function
from database import get_database_connection
from dataclasses import dataclass
from typing import Optional
# Handling CORS in FastAPI:

from fastapi.middleware.cors import CORSMiddleware
from enum import Enum


class BookStatus(str, Enum):
    reading = "reading"
    to_read = "to-read"
    completed = "completed"


app = FastAPI()

# Add this line to your FastAPI app to enable CORS
app.add_middleware(
    CORSMiddleware,
    # Adjust this to limit the allowed origins for security
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    # You can specify specific HTTP methods (e.g., ["GET", "POST"])
    allow_methods=["*"],
    allow_headers=["*"],  # You can specify specific headers
)
# ... Other endpoints ...


@dataclass
class Book:
    id: int
    title: str
    status: BookStatus = BookStatus.to_read


@dataclass
class NewBook:
    title: str


@app.get("/books", response_model=List[Book])
def get_all_books(db: sqlite3.Connection = Depends(get_database_connection)):
    cursor = db.cursor()
    cursor.execute("SELECT id, title, status FROM tasks")
    books = cursor.fetchall()

    cursor.close()

    book_list = [Book(id=book[0], title=book[1], status=book[2])
                 for book in books]

    return book_list


@app.post("/books", response_model=Book)
def create_book(book: NewBook, db: sqlite3.Connection = Depends(get_database_connection)):
    cursor = db.cursor()
    cursor.execute("INSERT INTO tasks (title, status) VALUES (?, ?)",
                   (book.title, BookStatus.to_read))
    db.commit()
    book_id = cursor.lastrowid
    cursor.close()
    return Book(id=book_id, title=book.title, status=BookStatus.to_read)


@app.delete("/books/{book_id}", response_model=str)
def delete_book(book_id: int, db: sqlite3.Connection = Depends(get_database_connection)):
    cursor = db.cursor()
    cursor.execute("SELECT title FROM tasks WHERE id = ?", (book_id,))
    book = cursor.fetchone()

    if book is None:
        cursor.close()
        raise HTTPException(status_code=404, detail="Book not found")

    cursor.execute("DELETE FROM tasks WHERE id = ?", (book_id,))
    db.commit()
    cursor.close()

    return f"Deleted book with id: {book_id}"
