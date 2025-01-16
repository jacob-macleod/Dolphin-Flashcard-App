"""Abstract class for database handler
"""

from abc import ABC


class DatabaseHandler(ABC):
    """Abstract class for database handler"""

    def __init__(self, context, db_name):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        self._context = context
        self._db_name = db_name
