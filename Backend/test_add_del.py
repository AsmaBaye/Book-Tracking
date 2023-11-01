from http import client
from fastapi.testclient import TestClient
from main import app
from fastapi.testclient import TestClient
import sqlite3

client = TestClient(app)


def test_delete():
    # book_id = 4
    # response = client.delete(f"/books/{book_id}")
    # expected_message = f"Deleted book with id: {book_id}"
    # assert expected_message in response.text
    # assert response.status_code == 200
    # assert expected_message in response.text
    new_book_data = {
        "title": "Test Book",
    }

    # Add the book using the add_book endpoint
    response_add = client.post("/books", json=new_book_data)
    assert response_add.status_code == 200
    added_book = response_add.json()

    # Retrieve the ID of the added book
    book_id = added_book["id"]

    # Check if the book was added successfully
    assert added_book["title"] == new_book_data["title"]

    # Delete the added book using the delete_book endpoint
    response_delete = client.delete(f"/books/{book_id}")
    assert response_delete.status_code == 200
    expected_message = f"Deleted book with id: {book_id}"
    assert expected_message in response_delete.text

    # Verify that the book was deleted by trying to retrieve it
    response_get_deleted = client.get(f"/books/{book_id}")
    assert response_get_deleted.status_code == 404

    # Optionally, you can check that the book was deleted from the database
    # Replace with the path to your test database
    db = sqlite3.connect("mydatabase.db")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM BookTable WHERE id = ?", (book_id,))
    book = cursor.fetchone()
    db.close()
    assert book is None
