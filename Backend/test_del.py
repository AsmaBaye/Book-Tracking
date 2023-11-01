from http import client
from fastapi.testclient import TestClient
from main import app
from fastapi.testclient import TestClient


client = TestClient(app)


def test_delete():
    book_id = 4
    response = client.delete(f"/books/{book_id}")
    expected_message = f"Deleted book with id: {book_id}"
    assert expected_message in response.text
    assert response.status_code == 200
    assert expected_message in response.text
