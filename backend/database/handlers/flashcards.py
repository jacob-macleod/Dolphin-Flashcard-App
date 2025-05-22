"""Provides utility classes for interacting with the flashcards database
"""

from database.handlers.database_handler import DatabaseHandler


class Flashcards(DatabaseHandler):
    """Provides utility classes for interacting with the flashcards database"""

    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="folders")

    def create_flashcards(self, card_ids: list, cards: list):
        """Create multiple flashcards using batch writes (500 max per batch)

        Args:
            card_ids (list): The flashcard IDs to create
            cards (list): A list containing dictionaries storing the data for each flashcard
        """
        max_batch_size = 500
        total_cards = len(card_ids)

        for start in range(0, total_cards, max_batch_size):
            end = start + max_batch_size
            batch = self._context.batch()

            for index in range(start, min(end, total_cards)):
                card_ref = self._context.collection("flashcards").document(card_ids[index])
                card_data = {
                    "front": cards[index]["front"],
                    "back": cards[index]["back"],
                }
                batch.set(card_ref, card_data)

            batch.commit()

    def get_flashcard(self, card_id: str):
        """Get a flashcard

        Args:
            card_id (str): The card ID to get
        """
        return self._context.collection("flashcards").document(card_id).get().to_dict()

    def get_multiple_flashcards(self, card_ids:list):
        """
        Get multiple flashcards by their IDs

        Args:
            card_ids (list): The list of flashcards to get

        Returns:
            list: The returned flashcard data
        """
        flashcard_datas = []
        for card_id in card_ids:
            flashcard_datas.append(
                self._context.collection("flashcards").document(card_id).get().to_dict()
            )
        return flashcard_datas
