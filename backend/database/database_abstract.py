"""Provides the abstract class for the database
"""
from abc import ABC, abstractmethod
from database.handlers.flashcard_set import FlashcardSet

class DatabaseAbstract(ABC) :
    """ Abstract class for the database """
    @abstractmethod
    def __init__(self):
        # Redefined in classes implementing this abstract class
        self._db = None

    def _init_database_handlers(self):
        """Initialise the database handlers. This can't be placed in this abstract init class
        because the concrete implementations need to occur first to set self.db
        """
        self._flashcard_set = FlashcardSet(self.db)

    @property
    def query(self):
        """Return the db element

        Returns:
            FirebaseDatabase | LocalDatabase: The value of db
        """
        return self._db

    @query.setter
    def db(self, value):
        self._db = value

    @property
    def flashcard_set(self):
        """Return the flashcard set class

        Returns:
            FlashcardSet: The flashcard set class
        """
        return self._flashcard_set
