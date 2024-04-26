"""Provides utility classes for interacting with the folders database
"""
from database.handlers.database_handler import DatabaseHandler

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

    def add_flashcard_to_folder(
        self,
        user_id: str,
        folder: str,
        flashcard_id: str,
        flashcard_name: str
    ):
        """Add a flashcard to a folder, creating teh folder and any sub folders as needed

        Args:
            user_id (str): The user ID to save to
            folder (str): The folder path (in the format "folder1/folder2/end_folder")
            flashcard_id (str): The flashcard id
            flashcard_name (str): The name of the flashcard
        """
        # Initialise variables
        folder_path = folder.split("/")
        folder = self._context.collection("folders").document(user_id)

        folder_data = folder.get().get("data")
        if folder_data is None:
            folder_data = {}

        current = folder_data

        # Traverse the dictionary according to the given path
        for key in folder_path[:-1]:
                current = current.setdefault(key, {})

        # Set the correct data to current, which will also change folder_data
        if folder_path[-1] not in current.keys():
            current[folder_path[-1]] = {}

        current[folder_path[-1]][flashcard_name] = {"flashcardId": flashcard_id}

        folder.set(
            {
                "data": folder_data
            }
        )
