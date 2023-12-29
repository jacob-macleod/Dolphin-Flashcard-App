""" Provides a class to interact with the database """
import os
import json
import firebase_admin
from firebase_admin import auth
from firebase_admin import db, credentials
import pyrebase

class Database:
    """ Interact with the database"""
    # Credentials file stored locally for development
    # Stored as a secret key in production for github actions
    cred = credentials.Certificate("credentials.json")

    # Firebase URL stored in local file in development,
    # and as a secret key in github actions in production
    # Open firebase_url and save text to var
    with open("firebase_url", "r") as f:
        firebase_url = f.read()

    firebase_admin.initialize_app(cred, {"databaseURL": firebase_url})
    print (json.load(open('firebase_config.json')))
    pb = pyrebase.initialize_app(json.load(open('firebase_config.json')))

    def get(self, path):
        """ Get data from database """
        return db.reference(path).get()

    def save(self, path, data) :
        """ Save data to a path """
        db.reference(path).set(data)

    def increment(self, path, increment_amount) :
        """ Increment a number stored as a string from a path in the database """
        old_value = self.get(path)
        new_value = str(int(old_value) + int(increment_amount))
        self.save(path, new_value)

database = Database()