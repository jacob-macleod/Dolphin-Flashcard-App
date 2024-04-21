"""Provides the abstract class for the database
"""
from abc import ABC, abstractmethod

class DatabaseAbstract(ABC) :
    """ Abstract class for the database """
    @abstractmethod
    def __init__(self):
        # Redefined in classes implementing this abstract class
        self.db = None

    def get(self, path):
        """ Get data from database """
        print ("Getting data")
        self.db.collection("users").document("user1").set(
            {
                "name": "Jacob"
            }
        )
        print ("Saved data")

        doc_ref = self.db.collection("users").document("user1")

        doc = doc_ref.get()
        if doc.exists:
            print(f"Document data: {doc.to_dict()}")
        else:
            print("No such document!")

    def save(self, path, data) :
        """ Save data to a path """
        print ("Saving data")

    def increment(self, path, increment_amount) :
        """ Increment a number stored as a string from a path in the database """
        print ("Incrementing data")
