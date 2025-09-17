"""Provides utility classes for interacting with the sharedFolderSets database
"""

from database.handlers.database_handler import DatabaseHandler
from classes.date import Date
import json
from datetime import datetime, timedelta

class SharedFolderSets(DatabaseHandler):
    """Provides utility classes for interacting with the sharedFolderSets database
    This handles personal progress tracking for shared flashcard sets
    """

    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="sharedFolderSets")
        self._date = Date()

        # Load card presets (same as FlashcardCollection)
        try:
            with open("card_presets.json", "r") as f:
                self._card_presets = json.load(f)
        except FileNotFoundError:
            # Fallback defaults if file not found
            self._card_presets = {
                "notStarted": 20,
                "activelyStudying": 20,
                "recapping": 200
            }

    def _is_card_due_today(self, card_progress: dict, current_date: datetime) -> bool:
        """Check if a card is due for review today (adapted from FlashcardCollection._is_for_today)."""
        try:
            review_status = card_progress.get("review_status", "0.0")
            last_review = card_progress.get("last_review")

            if not last_review:
                return False

            days_until_next_review = int(float(review_status))
            last_review_date = datetime.strptime(last_review, "%d/%m/%Y")

            if last_review_date + timedelta(days=days_until_next_review) <= current_date:
                return True
        except (ValueError, TypeError):
            return False

        return False

    def initialize_user_progress(self, user_id: str, shared_folder_id: str, flashcard_set_id: str, card_ids: list):
        """Initialize progress tracking for a user on a shared flashcard set

        Args:
            user_id (str): The user ID
            shared_folder_id (str): The shared folder ID
            flashcard_set_id (str): The flashcard set ID
            card_ids (list): List of card IDs in the flashcard set
        """
        user_progress = self._context.collection(self._db_name).document(user_id)
        user_data = user_progress.get().to_dict()
        
        if user_data is None:
            user_data = {}
        
        # Initialize nested structure if needed
        if shared_folder_id not in user_data:
            user_data[shared_folder_id] = {}
        
        if flashcard_set_id not in user_data[shared_folder_id]:
            user_data[shared_folder_id][flashcard_set_id] = {"cards": {}}
        
        # Initialize cards with default progress
        current_date = self._date.get_current_date()
        for card_id in card_ids:
            if card_id not in user_data[shared_folder_id][flashcard_set_id]["cards"]:
                user_data[shared_folder_id][flashcard_set_id]["cards"][card_id] = {
                    "review_status": "0.0",
                    "last_review": current_date
                }
        
        user_progress.set(user_data)

    def update_card_progress(self, user_id: str, shared_folder_id: str, flashcard_set_id: str, card_progress_data: list):
        """Update progress for multiple cards in a shared flashcard set"""
        user_progress = self._context.collection(self._db_name).document(user_id)
        user_data = user_progress.get().to_dict()
        
        if user_data is None:
            user_data = {}
        
        # Initialize nested structure if needed
        if shared_folder_id not in user_data:
            user_data[shared_folder_id] = {}
        
        if flashcard_set_id not in user_data[shared_folder_id]:
            user_data[shared_folder_id][flashcard_set_id] = {"cards": {}}
        
        # Update card progress
        for card_data in card_progress_data:
            card_id = card_data.get("cardID")
            review_status = card_data.get("review_status")
            last_review = card_data.get("last_review")
            
            # Initialize card if it doesn't exist
            if card_id not in user_data[shared_folder_id][flashcard_set_id]["cards"]:
                user_data[shared_folder_id][flashcard_set_id]["cards"][card_id] = {}
            
            user_data[shared_folder_id][flashcard_set_id]["cards"][card_id] = {
                "review_status": review_status,
                "last_review": last_review
            }
        
        user_progress.set(user_data)

    def get_user_shared_folder_progress(self, user_id: str, shared_folder_id: str):
        """Get all progress for a user in a specific shared folder

        Args:
            user_id (str): The user ID
            shared_folder_id (str): The shared folder ID

        Returns:
            dict: User's progress data for the shared folder
        """
        user_progress = self._context.collection(self._db_name).document(user_id)
        user_data = user_progress.get().to_dict()
        
        if user_data is None or shared_folder_id not in user_data:
            return {}
        
        return user_data[shared_folder_id]

    def get_user_flashcard_set_progress(self, user_id: str, shared_folder_id: str, flashcard_set_id: str):
        """Get progress for a specific flashcard set in a shared folder

        Args:
            user_id (str): The user ID
            shared_folder_id (str): The shared folder ID
            flashcard_set_id (str): The flashcard set ID

        Returns:
            dict: User's progress data for the flashcard set
        """
        shared_folder_progress = self.get_user_shared_folder_progress(user_id, shared_folder_id)
        
        if flashcard_set_id not in shared_folder_progress:
            return {}
        
        return shared_folder_progress[flashcard_set_id]

    def copy_shared_flashcard_to_personal(self, user_id: str, shared_folder_id: str, flashcard_set_id: str, personal_folder: str = ""):
        """Copy a shared flashcard set to user's personal collection
        This would integrate with the existing folders handler

        Args:
            user_id (str): The user ID
            shared_folder_id (str): The shared folder ID
            flashcard_set_id (str): The flashcard set ID to copy
            personal_folder (str): The personal folder path to copy to

        Returns:
            str: The new personal flashcard set ID
        """
        # Get user's progress for this flashcard set
        progress_data = self.get_user_flashcard_set_progress(user_id, shared_folder_id, flashcard_set_id)
        
        if not progress_data:
            progress_data = {"cards": {}}
        
        # This would need to integrate with existing folders and flashcard_set handlers
        # For now, return the structure that would be needed
        return {
            "cards": progress_data.get("cards", {}),
            "flashcard_set_id": flashcard_set_id,
            "source": "shared",
            "original_shared_folder": shared_folder_id
        }

    def remove_user_progress_from_folder(self, user_id: str, shared_folder_id: str):
        """Remove all user progress when they leave a shared folder

        Args:
            user_id (str): The user ID
            shared_folder_id (str): The shared folder ID to remove progress from
        """
        user_progress = self._context.collection(self._db_name).document(user_id)
        user_data = user_progress.get().to_dict()
        
        if user_data is not None and shared_folder_id in user_data:
            user_data.pop(shared_folder_id)
            user_progress.set(user_data)

    def get_today_cards_from_shared_folders(self, user_id: str):
        """Get cards due for review today from all shared folders
        Similar to the existing get_today_cards functionality

        Args:
            user_id (str): The user ID

        Returns:
            dict: Cards due for review today from shared folders
        """
        user_progress = self._context.collection(self._db_name).document(user_id)
        user_data = user_progress.get().to_dict()
        
        if user_data is None:
            return {}
        
        # This would need to integrate with existing FlashcardCollection logic
        # For now, return the structure
        today_cards = {}
        current_date = datetime.strptime(self._date.get_current_date(), "%d/%m/%Y")
        
        for shared_folder_id, folder_data in user_data.items():
            today_cards[shared_folder_id] = {}
            for flashcard_set_id, set_data in folder_data.items():
                cards_for_today = {}
                for card_id, card_progress in set_data.get("cards", {}).items():
                    if self._is_card_due_today(card_progress, current_date):
                        cards_for_today[card_id] = card_progress
                
                if cards_for_today:
                    today_cards[shared_folder_id][flashcard_set_id] = {
                        "cards": cards_for_today
                    }
        
        return today_cards

    def cleanup_removed_flashcard_set(self, shared_folder_id: str, flashcard_set_id: str):
        """Clean up progress data when a flashcard set is removed from a shared folder

        Args:
            shared_folder_id (str): The shared folder ID
            flashcard_set_id (str): The flashcard set ID that was removed
        """
        # Get all users who have progress in this shared folder
        all_users = self._context.collection(self._db_name).stream()
        
        for user_doc in all_users:
            user_data = user_doc.to_dict()
            user_id = user_doc.id
            
            if (user_data and 
                shared_folder_id in user_data and 
                flashcard_set_id in user_data[shared_folder_id]):
                
                # Remove the flashcard set progress
                user_data[shared_folder_id].pop(flashcard_set_id)
                
                # If the shared folder is now empty, remove it too
                if not user_data[shared_folder_id]:
                    user_data.pop(shared_folder_id)
                
                # Update the user's progress data
                self._context.collection(self._db_name).document(user_id).set(user_data)