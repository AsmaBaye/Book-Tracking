import sqlite3


def get_database_connection():
    connection = sqlite3.connect('mydatabase.db')
    return connection
