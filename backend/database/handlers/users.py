"""Provides utility classes for interacting with the users database
"""

from database.handlers.database_handler import DatabaseHandler


class Users(DatabaseHandler):
    """Provides utility classes for interacting with the flashcards database"""

    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="users")

    def create_user(self, user_id: str, name: str):
        """Create a new user

        Args:
            user_id (str): The user ID to add
            name (str): The user name
        """
        user = self._context.collection(self._db_name).document(user_id)
        user.set({"name": name})

    def get_user(self, user_id: str):
        """Get a user from the user_id

        Args:
            user_id (str): The user_id
        """
        return self._context.collection(self._db_name).document(user_id).get().to_dict()
