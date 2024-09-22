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
    ):
        """Create a flashcard set

        Args:
            flashcard_id (str): The flashcard ID to add
            flashcard_name (str): The name of the flashcard
            flashcard_description (str): The description of the flashcard
            cards_ids (list): A list of the ids of each card within the flashcard set
        """
        # Create the flashcard set
        flashcard_set = self._context.collection(self._db_name).document(flashcard_id)
        flashcard_set.set(
            {
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
