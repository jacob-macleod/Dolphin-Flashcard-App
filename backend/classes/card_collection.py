"""Utilities to iterate through a collection of flashcards (all the cards belonging to a user)
"""

class FlashcardCollection():
    """Iterate through a collection of flashcards
    """
    def __init__(self, flashcard_data:dict):
        """Initialise the class

        Args:
            flashcard_data (dict): All the flashcard data for a user
        """
        self._flashcard_data = flashcard_data
        self._today_card_list = {}

    def _is_for_today(self, flashcard_data):
        """Check whether a flashcard is due for review today

        Args:
            flashcard_data (dict): The data for an individual flashcard
        """
        return True

    def _iter_flashcards(self, flashcards, item_to_append_to):
        """Iterate within flashcards

        Args:
            flashcards (dict): The flashcard data to be iterated through
        """
        for _, flashcard_data in enumerate(flashcards):
            # Check if the item is a flashcard or a folder
            is_folder = "cards" not in flashcards[flashcard_data]
            if is_folder:
                # If it's a folder, iterate through the folder
                item_to_append_to[flashcard_data] = {}
                self._iter_flashcards(flashcards[flashcard_data], item_to_append_to[flashcard_data])
            else:
                # If it's a flashcard set, add it to the list
                current_card = flashcards[flashcard_data]
                item_to_append_to[flashcard_data] = {}
                item_to_append_to[flashcard_data]["flashcardID"] = current_card["flashcardID"]
                item_to_append_to[flashcard_data]["flashcardName"] = current_card["flashcardName"]
                item_to_append_to[flashcard_data]["flashcardDescription"] = current_card["flashcardDescription"]
                item_to_append_to[flashcard_data]["cards"] = {}

                # If each individual flashcard is for today, add it to the set
                for key, card in enumerate(current_card["cards"]):
                    if self._is_for_today(card):
                        item_to_append_to[flashcard_data]["cards"][key] = card

    @property
    def today_card_list(self):
        """Generate the list of cards for today
        """
        self._iter_flashcards(self._flashcard_data, self._today_card_list)
        print (self._today_card_list)

        return self._today_card_list

    @property
    def flashcard_data(self):
        """Get flashcard_data

        Returns:
            dict: Flashcard data
        """
        return self._flashcard_data
