"""Provides utility classes for interacting with the goals database
"""
from database.handlers.database_handler import DatabaseHandler
from classes.date import Date

class Goals(DatabaseHandler):
    """Provides utility classes for interacting with the flashcards database
    """
    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="goals")
        self._date = Date()

    def update_goal_stats(self, user_id:str, xp_increment:int):
        """
        Update the users goal progress (for all goals)

        Args:
            user_id (str): The user id to update for
            xp_increment (int): The amount of xp to increment by
        """
        # Get the user's goals
        goals = self._context.collection("goals").document(user_id)
        if goals is None:
            return "User has no goals"

        # For each goal
        for goal in goals:
            # If the goal is in progress
            if goals[goal].get("status") == "in progress":
                if goals[goal].get("type") == "XP":
                    # Increment the user's XP
                    goals[goal]["data"]["starting_xp"] = str(
                        int(goals[goal]["data"]["starting_xp"]) + int(xp_increment)
                    )
                elif goals[goal].get("type") == "Card":
                    # Increment user's card goal
                    goals[goal]["data"]["cards_revised_so_far"] = str(
                        int(goals[goal]["data"]["cards_revised_so_far"]) + 1
                    )

        # Save the new goal data
        self._context.collection("goals").document(user_id).set(goals)

    def create_xp_goal(
            self,
            user_id:str,
            goal_xp:int,
            start_date:str,
            end_date:str,
            hash_to_numeric:callable
        ):
        """
        Create a new XP goal for the user

        Args:
            user_id (str): The user id to use
            goal_xp (int): The amount of xp to gain
            start_date (str): The start date of the goal
            end_date (str): The end date of the goal
            hash_to_numeric (callable): The function which is used to generate the goal id
            from the user id and the title
        """
        goal_type = "XP"
        title = "Gain " + goal_xp + " XP by " + end_date
        status = "in progress"
        goal_id = hash_to_numeric(user_id + title)

        self._context.collection("goals").document(user_id).collection("goal_data").document(goal_id).set(
            {
                "type": goal_type,
                "title": title,
                "end_date": end_date,
                "status": status,
                "fail_date": "",
                "data": {
                    "start_date": start_date,
                    "starting_xp": "0",
                    "goal_xp": goal_xp
                }
            }
        )
