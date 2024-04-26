"""Provides the abstract class for the database
"""
from abc import ABC, abstractmethod
from database.handlers.flashcard_set import FlashcardSet
from database.handlers.flashcards import Flashcards
from database.handlers.folders import Folders
from database.handlers.read_write_access import ReadWriteAccess

class DatabaseAbstract(ABC) :
    """ Abstract class for the database """
    @abstractmethod
    def __init__(self):
        # Redefined in classes implementing this abstract class
        self._db = None
        self._flashcard_set = None
        self._flashcards = None
        self._folders = None
        self._read_write_access = None

    def _init_database_handlers(self):
        """Initialise the database handlers. This can't be placed in this abstract init class
        because the concrete implementations need to occur first to set self.db
        """
        self._flashcard_set = FlashcardSet(self.db)
        self._flashcards = Flashcards(self.db)
        self._folders = Folders(self.db)
        self._read_write_access = ReadWriteAccess(self.db)

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

    @property
    def flashcards(self):
        """Return the flashcards class

        Returns:
            Flashcards: The flashcards class
        """
        return self._flashcards

    @property
    def folders(self):
        """Return the folders class

        Returns:
            Folders: The folders class
        """
        return self._folders

    @property
    def read_write_access(self):
        """Return the ReadWriteAccess class

        Returns:
            ReadWriteAccess: The ReadWriteAccess class
        """
        return self._read_write_access
