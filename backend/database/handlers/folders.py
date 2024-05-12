"""Provides utility classes for interacting with the folders database
"""
from database.handlers.database_handler import DatabaseHandler
from classes.date import Date

class Folders(DatabaseHandler):
    """Provides utility classes for interacting with the flashcards database
    """
    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="folders")
        self._date = Date()

    def add_flashcard_to_folder(
        self,
        user_id: str,
        folder: str,
        flashcard_id: str,
        flashcard_name: str,
        card_ids: list
    ):
        """Add a flashcard to a folder, creating the folder and any sub folders as needed

        Args:
            user_id (str): The user ID to save to
            folder (str): The folder path (in the format "folder1/folder2/end_folder")
            flashcard_id (str): The flashcard id
            flashcard_name (str): The name of the flashcard
            card_ids (str): The card_ids to be added
        """
        # Initialise variables
        folder_path = folder.split("/")
        # Store whether the folder to store the flashcard in is the root folder
        is_root_folder = (folder_path==[""])
        folder = self._context.collection("folders").document(user_id)

        folder_data = folder.get().get("data")
        if folder_data is None:
            folder_data = {}

        current = folder_data

        # Traverse the dictionary according to the given path
        for key in folder_path[:-1]:
                current = current.setdefault(key, {})

        # Calculate the initial card review statuses
        card_review_statuses = {}
        current_date = self._date.get_current_date()

        for card_id in card_ids:
            card_review_statuses[card_id] = {
                "review_status": "0.0",
                "last_review": current_date
            }

        # Set the correct data to current, which will also change folder_data
        if folder_path[-1] not in current.keys() and not is_root_folder:
            current[folder_path[-1]] = {}

        # Save the flashcard data
        if is_root_folder:
            # If the data is being saved to the root folder
            current[flashcard_name] = {
                "flashcard_id": flashcard_id,
                "cards": card_review_statuses
            }
        else:
            # If the data is being saved to a subfolder
            current[folder_path[-1]][flashcard_name] = {
                "flashcard_id": flashcard_id,
                "cards": card_review_statuses
            }

        folder.set(
            {
                "data": folder_data
            }
        )

    def get_user_data(self, user_id:str):
        """Get the folder data for a user
        """
        data = self._context.collection(self._db_name).document(user_id).get().to_dict()
        if data is not None:
            data = data.get("data")
        return data

    def move_flashcard_set(
        self,
        user_id: str,
        flashcard_name: str,
        current_location: str,
        move_location: str
    ):
        """
        Move a flashcard set to a new location

        Args:
            user_id (str): The user id who owns the set
            flashcard_name (str): The name of the flashcard set
            current_location (str): The current location where the flashcard is stored
            move_location (str): The location to move the flashcard set to

        Raises:
            KeyError: When the flashcard is not found in the current location
        """
        # Get the current flashcard data
        flashcard_data = self._context.collection(self._db_name).document(user_id).get().to_dict()
        if flashcard_data is None:
            return None
        else:
            flashcard_data = flashcard_data.get("data")

        current_location_list = current_location.split("/")
        edited_flashcard_data = flashcard_data.copy()
        for item in current_location_list:
            edited_flashcard_data = edited_flashcard_data.get(item)

        # Handle the case where the flashcard is in the root folder
        if edited_flashcard_data is None:
            edited_flashcard_data = flashcard_data

        if flashcard_name in edited_flashcard_data.keys():
            flashcard_id = edited_flashcard_data.get(flashcard_name).get("flashcard_id")
            cards = edited_flashcard_data.get(flashcard_name).get("cards")
            edited_flashcard_data.pop(flashcard_name, None)
        else:
            raise KeyError("Flashcard not found in current location")

        # Remove the flashcard where it currently is
        self._context.collection(self._db_name).document(user_id).set(
            {
                "data": edited_flashcard_data
            }
        )

        # Save the flashcard in the new location
        self.add_flashcard_to_folder(
            user_id,
            move_location,
            flashcard_id,
            flashcard_name,
            cards
        )
