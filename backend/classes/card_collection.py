"""Utilities to iterate through a collection of flashcards (all the cards belonging to a user)
"""
import json
from datetime import datetime, timedelta
from classes.date import Date

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
        # Get the card presets
        with open("card_presets.json", "r") as f:
            self._card_presets = json.load(f)

        self._not_started = 0
        self._actively_studying = 0
        self._recapping = 0

    def _is_for_today(self, card, current_date):
        """Check whether a flashcard is due for review today

        Args:
            flashcard_data (dict): The data for an individual flashcard
        """
        review_status = card["review_status"]
        days_until_next_review = int(float(review_status))
        if datetime.strptime(
            card["last_review"],
            "%d/%m/%Y"
        ) + timedelta(days=days_until_next_review) <= current_date:
            # Work out if the card is new, being learned, or learned
            daily_review = card["review_status"].split(".")[0]
            sub_daily_review = card["review_status"].split(".")[1]

            if daily_review == "0" and sub_daily_review == "0":
                self._not_started += 1
                count = self._not_started
                limit = self._card_presets["notStarted"]
            elif daily_review == "0":
                self._actively_studying += 1
                count = self._actively_studying
                limit = self._card_presets["activelyStudying"]
            else:
                self._recapping += 1
                count = self._recapping
                limit = self._card_presets["recapping"]
            if int(count) < int(limit):
                return True
        # If the card should not be added
        return False


    def _iter_flashcards(self, flashcards, item_to_append_to):
        """Iterate within flashcards

        Args:
            flashcards (dict): The flashcard data to be iterated through
            item_to_append_to (dict): The structure to append the processed flashcards and folders to
        """
        current_date = datetime.strptime(
            Date().get_current_date(), "%d/%m/%Y"
        )

        for flashcard_name, flashcard_data in flashcards.items():
            # Check if the item is a folder or a flashcard set
            is_folder = "cards" not in flashcard_data
            if is_folder:
                # If it's a folder, create a new sub-folder in the result and iterate through it
                item_to_append_to[flashcard_name] = {}
                self._iter_flashcards(flashcard_data, item_to_append_to[flashcard_name])
            else:
                # If it's a flashcard set, process it
                current_card = flashcard_data
                item_to_append_to[flashcard_name] = {}

                item_to_append_to[flashcard_name]["flashcardID"] = current_card["flashcard_id"]
                item_to_append_to[flashcard_name]["flashcardName"] = flashcard_name
                item_to_append_to[flashcard_name]["cards"] = {}

                # Reset the card counts
                self._not_started = 0
                self._actively_studying = 0
                self._recapping = 0

                # Process each individual card in the flashcard set
                for card_name, card_data in current_card["cards"].items():
                    if self._is_for_today(card_data, current_date):
                        item_to_append_to[flashcard_name]["cards"][card_name] = card_data

    @property
    def today_card_list(self):
        """Generate the list of cards for today
        """
        self._iter_flashcards(self._flashcard_data, self._today_card_list)

        return self._today_card_list

    @property
    def flashcard_data(self):
        """Get flashcard_data

        Returns:
            dict: Flashcard data
        """
        return self._flashcard_data
