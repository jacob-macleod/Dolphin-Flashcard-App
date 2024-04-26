"""Provides utility classes for interacting with the flashcard_set database
"""

class FlashcardSet:
    """Provides utility classes for interacting with the flashcard_set database
    """
    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        self._context = context

    def create_flashcard_set(
            self,
            flashcard_id: str,
            flashcard_name: str,
            flashcard_description: str,
            card_ids:list
    ):
        """Create a flashcard set

        Args:
            flashcard_id (str): The flashcard ID to add
            flashcard_name (str): The name of the flashcard
            flashcard_description (str): The description of the flashcard
            cards_ids (list): A list of the ids of each card within the flashcard set
        """
        # Create the flashcard set
        flashcard_set = self._context.collection("flashcard_set").document(flashcard_id)
        flashcard_set.set(
            {
                "name": flashcard_name,
                "description": flashcard_description,
                "cards": card_ids
            }
        )
