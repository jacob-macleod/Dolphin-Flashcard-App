""" Provides a class to interact with the database """
from backend.database.firebase_database import FirebaseDatabase
from backend.database.local_database import LocalDatabase
from backend.database.database_config import type

class Database:
    """ Use the firebase database if in production, else use
    local files that don't require API keys"""
    def __init__(self) :
        print ("Starting init with " + type)
        if type == "production":
            print ("Using production database")
            self.db = FirebaseDatabase()
        else:
            print ("Using local database")
            self.db = LocalDatabase()

    def get(self, path):
        """ Get data from database """
        self.db.get(path)

    def save(self, path, data) :
        """ Save data to a path """
        self.db.save(path, data)

    def increment(self, path, increment_amount) :
        """ Increment a number stored as a string from a path in the database """
        self.db.increment(path, increment_amount)

database = Database()
