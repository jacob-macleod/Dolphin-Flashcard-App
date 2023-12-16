""" Provides a class to interact with the database """
import os
import firebase_admin
from firebase_admin import db, credentials

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

    def get(self, path):
        """ Get data from database """
        return db.reference(path).get()
