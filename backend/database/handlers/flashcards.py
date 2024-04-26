"""Provides utility classes for interacting with the flashcards database
"""
from database.handlers.database_handler import DatabaseHandler

class Flashcards(DatabaseHandler):
    """Provides utility classes for interacting with the flashcards database
    """
    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="folders")

    def create_flashcards(self, card_ids: list, cards: list):
        """Create multiple flashcards

        Args:
            card_ids (list): The flashcard IDs to create
            cards (list): A list containing dictionaries storing the data for each flashcard
        """
        for index, card_id in enumerate(card_ids):
            card = self._context.collection("flashcards").document(card_id)
            card.set(
                {
                    "front": cards[index]["front"],
                    "back": cards[index]["back"],
                }
            )
