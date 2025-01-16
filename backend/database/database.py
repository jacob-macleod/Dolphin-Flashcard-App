""" Provides a class to interact with the database """

from database.firebase_database import FirebaseDatabase
from database.local_database import LocalDatabase
from database.database_config import type


class Database:
    """Use the firebase database if in production, else use
    local files that don't require API keys"""

    def __init__(self):
        print("Starting init with " + type)
        if type == "production":
            print("Using production database")
            self.db = FirebaseDatabase()
        else:
            print("Using local database")
            self.db = LocalDatabase()

    def __getattr__(self, name):
        return getattr(self.db, name)


database = Database()
