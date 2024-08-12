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
        else:
            goals = goals.get("goal_data")

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
        title = "Gain " + str(goal_xp) + " XP by " + end_date
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

    def create_card_goal(
        self,
        user_id:str,
        desired_cards_to_revise:int,
        end_date:str,
        hash_to_numeric:callable
    ):
        """
        Create a goal which records how many cards the user has revised

        Args:
            user_id (str): The user id which the goal is for
            desired_cards_to_revise (int): The number of cards to be revised for the goal
            end_date (str): The end date of the goal
            hash_to_numeric (callable): The function which is used to generate the goal id
            from the user id and the title
        """
        goal_type = "Card"
        title = "Revise " + str(desired_cards_to_revise) + " cards by " + end_date
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
                    "cards_revised_so_far": "0",
                    "cards_to_revise": desired_cards_to_revise
                }
            }
        )

    def update_goal_status(
        self,
        user_id: str,
        date_obj: Date,
        now: str
    ):
        """
        Update the status of a goal (in progress, completed or failed)

        Args:
            user_id (str): The user id to update
            date_obj (Date): The date object to use
            now (str): The date now

        Returns:
            dict: The updated goals
        """
        new_goals = {}
        goals = self._context.collection("goals").document(user_id).collection("goal_data").stream()

        for doc in goals:
            goal = doc.to_dict()
            goal_id = doc.id  # Get the document ID

            # If the goal has been deleted, fully delete it
            # When goals are deleted, the goal data is set to <goal id>: {}.
            # In the firebase instance, it is then deleted automatically,
            # But not in the local json files. Thus, an extra check needs to be made
            if "status" in goal:
                new_goals[goal_id] = goal  # Add the goal if it has not been deleted
                if goal["status"] == "in progress":
                    # Check if the goal should be completed
                    if goal["type"] == "XP":
                        if int(goal["data"]["starting_xp"]) >= int(goal["data"]["goal_xp"]):
                            goal["status"] = "completed"
                    elif goal["type"] == "Card":
                        if int(goal["data"]["cards_revised_so_far"]) >= int(goal["data"]["cards_to_revise"]):
                            goal["status"] = "completed"

                    # Check if goal should be failed - if now is after end date (and it is still in progress)
                    # Now and end date are both strings in dd/mm/yyyy format
                    if date_obj.compare_dates(now, goal["end_date"]) > 0:
                        goal["status"] = "failed"
                        goal["fail_date"] = now

        # Save the updated goal data back to Firestore
        for goal_id, goal_data in new_goals.items():
            self._context.collection("goals").document(user_id).collection("goal_data").document(goal_id).set(goal_data)

        return new_goals

    def edit_card_goal(
        self,
        user_id:str,
        goal_id:str,
        new_end_date:str,
        new_title:str,
        new_cards_to_revise:int
    ):
        """Edit an existing card goal

        Args:
            user_id (str): The user who owns the card
            goal_id (str): The ID of the goal to edit
            new_end_date (str): The new end date for the goal
            new_title (str): The new title for the goal
            new_cards_to_revise (int): The new number of cards to revise

        Raises:
            ValueError: Raise an error when the goal has not been created yet
        """
        goal_object = self._context.collection("goals").document(user_id).collection("goal_data").document(goal_id).get()
        goal_data = {
            "data": goal_object.get("data"),
            "end_date": goal_object.get("end_date"),
            "fail_date": goal_object.get("fail_date"),
            "status": goal_object.get("status"),
            "title": goal_object.get("title"),
            "type": goal_object.get("type")
        }

        if goal_data.get("data") is None:
            raise ValueError("Goal not found")

        # Update the goal data
        goal_data["end_date"] = new_end_date
        goal_data["title"] = new_title
        # This line is the only difference between this and edit_xp_goal
        goal_data["data"]["cards_to_revise"] = new_cards_to_revise

        # Save the updated goal data
        self._context.collection("goals").document(user_id).collection("goal_data").document(goal_id).set(goal_data)

    def edit_xp_goal(
        self,
        user_id:str,
        goal_id:str,
        new_end_date:str,
        new_title:str,
        new_goal_xp:int
    ):
        """Edit an existing XP goal

        Args:
            user_id (str): The user who owns the card
            goal_id (str): The ID of the goal to edit
            new_end_date (str): The new end date for the goal
            new_title (str): The new title for the goal
            new_goal_xp (int): The new xp to gain

        Raises:
            ValueError: Raise an error when the goal has not been created yet
        """
        goal_object = self._context.collection("goals").document(user_id).collection("goal_data").document(goal_id).get()
        goal_data = {
            "data": goal_object.get("data"),
            "end_date": goal_object.get("end_date"),
            "fail_date": goal_object.get("fail_date"),
            "status": goal_object.get("status"),
            "title": goal_object.get("title"),
            "type": goal_object.get("type")
        }

        if goal_data.get("data") is None:
            raise ValueError("Goal not found")

        # Update the goal data
        goal_data["end_date"] = new_end_date
        goal_data["title"] = new_title
        # This line is the only difference between this and edit_card_goal
        goal_data["data"]["goal_xp"] = new_goal_xp

        # Save the updated goal data
        self._context.collection("goals").document(user_id).collection("goal_data").document(goal_id).set(goal_data)

    def delete_goal(self, user_id:str, goal_id:str):
        """
        Delete a user's goal

        Args:
            user_id (str): The user id of the goal to delete
            goal_id (str): The goal id to delete
        """
        data = self._context.collection("goals").document(user_id).collection("goal_data").document(goal_id)
        if data is not None:
            data.delete()
            return True
        else:
            return None
