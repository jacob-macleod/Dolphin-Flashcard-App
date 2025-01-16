"""Provides utility classes for interacting with the users database
"""

from database.handlers.database_handler import DatabaseHandler
from classes.date import Date


class Statistics(DatabaseHandler):
    """Provides utility classes for interacting with the flashcards database"""

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
                "heatmap_data": {today: "1"},
            }
        )

    def get_stats(self, user_id: str):
        """Get the statistics for a user

        Args:
            user_id (str): The user ID to get the statistics for
        """
        return self._context.collection(self._db_name).document(user_id).get().to_dict()

    def update_heatmap(
        self, user_id: str, today: str, user_data: dict = None, save_to_database=True
    ):
        """
        Increment the heatmap data for the current date for a user

        Args:
            user_id (str): The user id to update for
            today (str): The current date in the format "DD-MM-YYYY"
            user_data (dict): The user's statistics data

        Raises:
            ValueError: Raised when the user id does not exist

        Returns:
            dict: The updated heatmap data
        """
        if user_data is None:
            user_data = (
                self._context.collection(self._db_name)
                .document(user_id)
                .get()
                .to_dict()
            )

        # Heatmap has a date as the key, and the value is the number of cards reviewed that day
        if user_data is not None:
            item_found = False
            for item in user_data["heatmap_data"]:
                if item == today:
                    item_found = True
                    # Increment data
                    user_data["heatmap_data"][item] = str(
                        int(user_data["heatmap_data"][item]) + 1
                    )

            # If no data for today is recorded
            if not item_found:
                user_data["heatmap_data"][today] = "1"
        # If the user has not been created yet
        else:
            raise ValueError("User does not exist!")

        if save_to_database is True:
            self._context.collection(self._db_name).document(user_id).set(user_data)

        return user_data["heatmap_data"]

    def get_heatmap(self, user_id: str, user_data: dict = None):
        """
        Get the heatmap data for a user

        Args:
            user_id (str): The user ID to get the heatmap data for
            user_data (dict): The user's statistics data

        Raises:
            ValueError: Raised when the user does not exist

        Returns:
            dict: The full heatmap data for the user
        """
        if user_data is None:
            user_data = (
                self._context.collection(self._db_name)
                .document(user_id)
                .get()
                .to_dict()
            )

        # If the user data is None after being set
        if user_data is None:
            raise ValueError("User does not exist!")

        return user_data["heatmap_data"]

    def calculate_streak(
        self,
        user_id: str,
        date: Date,
        increase_streak,
        stats: dict = None,
        save_to_database=True,
    ):
        """
        Calculate the user's streak, and increase it if needed

        Args:
            user_id (str): The user_id
            date (Date): The current date
            increase_xp (str): If "true", the streak will be increased
            stats (dict): The user's statistics data

        Returns:
            int: The value of the new streak
        """
        today = date.get_current_date()
        if stats is None:
            stats = (
                self._context.collection(self._db_name)
                .document(user_id)
                .get()
                .to_dict()
            )
        last_streak = stats["lastStreak"]
        today = date.get_current_date()
        difference = date.compare_dates(last_streak, today)

        # If the streak needs to be reset
        if difference < -1:
            stats["streak"] = 0
            stats["lastStreak"] = today
        if difference == -1 and increase_streak == "true":
            stats["streak"] = 1
            stats["lastStreak"] = today

        if save_to_database is True:
            self._context.collection(self._db_name).document(user_id).set(stats)

        return stats["streak"]

    def increase_xp(self, user_id: str, xp: int):
        """
        Increase the user's XP

        Args:
            user_id (str): The user_id
            xp (int): The amount of XP to increase by
            stats (dict): The user's statistics data

        Returns:
            int: The new total XP
        """
        stats = (
            self._context.collection(self._db_name).document(user_id).get().to_dict()
        )

        stats["totalXP"] += xp
        stats["weeklyXP"] += xp
        stats["streak"] = self.calculate_streak(
            user_id,
            self._date,
            "true",
            stats,
            save_to_database=False,
        )
        stats["heatmap_data"] = self.update_heatmap(
            user_id,
            self._date.get_current_date().replace("/", "-"),
            stats,
            save_to_database=False,
        )

        self._context.collection(self._db_name).document(user_id).set(stats)
