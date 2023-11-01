import sqlite3


import sqlite3


def get_database_connection():
    connection = sqlite3.connect('mydatabase.db')
    return connection


def create_table():
    # Open a connection
    connection = get_database_connection()
    cursor = connection.cursor()

    # Check if the table already exists
    cursor.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='BookTable';")
    table_exists = cursor.fetchone()

    if not table_exists:
        # Create the table if it doesn't exist
        cursor.execute('''
            CREATE TABLE BookTable (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT ,
                status TEXT 
            )
        ''')

        # Commit and close the connection
        connection.commit()

    # Always close the connection
    connection.close()


# Call the create_table function to create the 'BookTable' table (if it doesn't already exist)
create_table()
