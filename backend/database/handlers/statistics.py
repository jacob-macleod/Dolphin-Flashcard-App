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

    def create_new_user_stats(self, user_id: str):
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
                "totalXP": 0
            }
        )

    def get_stats(self, user_id: str):
        """Get the statistics for a user

        Args:
            user_id (str): The user ID to get the statistics for
        """
        return self._context.collection(self._db_name).document(user_id).get().to_dict()
