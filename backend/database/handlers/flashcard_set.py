"""Provides utility classes for interacting with the flashcard_set database
"""

from database.handlers.database_handler import DatabaseHandler
from classes.flashcard_searcher import FlashcardSearcher


class FlashcardSet(DatabaseHandler):
    """Provides utility classes for interacting with the flashcard_set database"""

    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="flashcard_set")

    def create_flashcard_set(
        self,
        flashcard_id: str,
        flashcard_name: str,
        flashcard_description: str,
        card_ids: list,
        user_id: str = None,
    ):
        """Create a flashcard set

        Args:
            flashcard_id (str): The flashcard ID to add
            flashcard_name (str): The name of the flashcard
            flashcard_description (str): The description of the flashcard
            cards_ids (list): A list of the ids of each card within the flashcard set
            user_id (str): The user ID of the owner of the flashcard set. Deafults to None
        """
        # Create the flashcard set
        flashcard_set = self._context.collection(self._db_name).document(flashcard_id)
        if user_id is None:
            flashcard_set.set(
                {
                    "name": flashcard_name,
                    "description": flashcard_description,
                    "cards": card_ids,
                }
            )
        else:
            flashcard_set.set(
                {
                    "owner": user_id,
                    "name": flashcard_name,
                    "description": flashcard_description,
                    "cards": card_ids,
                }
            )

    def get_flashcard_set(self, flashcard_id: str):
        """Get a flashcard set

        Args:
            flashcard_id (str): The flashcard ID to get
        """
        flashcard_set = (
            self._context.collection(self._db_name)
            .document(flashcard_id)
            .get()
            .to_dict()
        )
        return flashcard_set

    def search_flashcard(self, flashcard_name: str):
        """Search for flashcards by name

        Args:
            flashcard_name (str): The name of the flashcard to search for
        """
        self.get_flashcard_set(flashcard_name)
        docs = self._context.collection(self._db_name).select(["name"]).stream()
        searcher = FlashcardSearcher(docs)
        return searcher.search(flashcard_name)

    def delete_inidividual_card(
        self, user_id: str, flashcard_set_id: str, card_id: str
    ):
        """
        Delete an individual card from a flashcard set

        Args:
            user_id (str): The user ID currently logged in
            flashcard_set_id (str): The flashcard set ID to delete the card from
            card_id (str): The card ID to delete
        """
        flashcard_set = self._context.collection(self._db_name).document(
            flashcard_set_id
        )
        user_owns_card = True

        # Only delete the card if the currently logged in owner owns the card
        if "owner" in flashcard_set.get().to_dict():
            if flashcard_set.get().to_dict()["owner"] == user_id:
                # Remove the card ID from the array in flashcard_set.cards
                card_list = flashcard_set.get().to_dict()["cards"]
                card_list.remove(card_id)
                flashcard_set.update({"cards": card_list})
            else:
                user_owns_card = False
        else:
            user_owns_card = False

        if not user_owns_card:
            # Fail silently - this will mean the user deletes their personal card, but not
            # the card in the shared version of the flashcard set
            pass
