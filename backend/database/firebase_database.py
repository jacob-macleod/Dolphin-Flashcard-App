""" Provides a class to interact with the database """
import firebase_admin
from firebase_admin import credentials
from firebase_admin import credentials, firestore
from database.database_abstract import DatabaseAbstract

class FirebaseDatabase(DatabaseAbstract):
    """ Interact with the database"""
    def __init__(self) :
        # Credentials file stored locally for development
        # Stored as a secret key in production for github actions
        cred = credentials.Certificate("credentials.json")

        # Firebase URL stored in local file in development,
        # and as a secret key in github actions in production
        # However, I don't know if firebase URL is still needed!
        # TODO: Investigate if this is needed by seeing what happens when the file
        # firebase_url is not provided

        firebase_admin.initialize_app(cred)
        # TODO: Investigate if firebase_config.json is needed, after the new changes
        self.db = firestore.client()

        self._init_database_handlers()
