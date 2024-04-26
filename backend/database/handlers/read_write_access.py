"""Provides utility classes for interacting with the read_write_access database
"""
from database.handlers.database_handler import DatabaseHandler

class ReadWriteAccess(DatabaseHandler):
    """Provides utility classes for interacting with the flashcards database
    """
    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="read_write_access")

    def give_user_access(self, user_id: str, flashcard_id: str):
        """Give a user read/write access to a flashcard set by appending them to the list of users
        with rw access.
        WARNING: If this is run multiple times with the same user, they will be appended multiple
        times! If this is an issue in practice, add checking to ensure that a user is not added
        if they already have been

        Args:
            user_id (str): The user ID to add
            flashcard_id (str): The flashcard ID to add
        """
        # Get the required variables
        read_write_access = self._context.collection("read_write_access").document(flashcard_id)
        allowed_cards = read_write_access.get().get("card_list")

        # Append the user to the set
        if allowed_cards is None:
            # Create a new list if it has not been created
            allowed_cards = [user_id]
        else:
            allowed_cards.append(user_id)

        # Save the modified data
        read_write_access.set(
            {
                "card_list": allowed_cards
            }
        )
