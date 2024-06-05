"""Provides utility classes for interacting with the users database
"""
from database.handlers.database_handler import DatabaseHandler
from classes.date import Date

class Statistics(DatabaseHandler):
    """Provides utility classes for interacting with the flashcards database
    """
    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="statistics")
        self._date = Date()

    def create_new_user_stats(self, user_id: str, today):
        """Create the statistics for a new user 

        Args:
            user_id (str): The user ID to add the statistics to
        """
        stats = self._context.collection(self._db_name).document(user_id)
        stats.set(
            {
                "lastStreak": self._date.get_current_date(),
                "streak": 0,
                "weeklyXP": 0,
                "totalXP": 0,
                "heatmap_data": {
                    today: "1"
                }
            }
        )

    def get_stats(self, user_id: str):
        """Get the statistics for a user

        Args:
            user_id (str): The user ID to get the statistics for
        """
        return self._context.collection(self._db_name).document(user_id).get().to_dict()

    def update_heatmap(self, user_id:str, today:str):
        """
        Increment the heatmap data for the current date for a user

        Args:
            user_id (str): The user id to update for
            today (str): The current date in the format "DD-MM-YYYY"

        Raises:
            ValueError: Raised when the user id does not exist

        Returns:
            dict: The updated heatmap data
        """
        user_data = self._context.collection(self._db_name).document(user_id).get().to_dict()

        # Heatmap has a date as the key, and the value is the number of cards reviewed that day
        if user_data is not None :
            item_found = False
            for item in user_data["heatmap_data"]:
                if item == today:
                    item_found = True
                    # Increment data
                    user_data["heatmap_data"][item] = str(int(user_data["heatmap_data"][item]) + 1)

            # If no data for today is recorded
            if not item_found:
                user_data["heatmap_data"][today] = "1"
        # If the user has not been created yet
        else :
            raise ValueError("User does not exist!")

        self._context.collection(self._db_name).document(user_id).set(
            user_data
        )

        return user_data["heatmap_data"]

    def get_heatmap(self, user_id:str):
        """
        Get the heatmap data for a user

        Args:
            user_id (str): The user ID to get the heatmap data for

        Raises:
            ValueError: Raised when the user does not exist

        Returns:
            dict: The full heatmap data for the user
        """
        user_data = self._context.collection(self._db_name).document(user_id).get().to_dict()

        if user_data is None:
            raise ValueError("User does not exist!")

        return user_data["heatmap_data"]
