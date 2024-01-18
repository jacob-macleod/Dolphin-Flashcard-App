""" Routes relating to goal and quest management """
from classes.date import Date
from database.database import database as db
from routes.api.card_management import hash_to_numeric

def update_goal_stats(user_id, xp_increment):
    """Update the user's goal stats
    To be run when a new card is revised"""

    # Get the user's goals
    goals = db.get("/users/" + user_id + "/goals/")

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
    db.save("/users/" + user_id + "/goals/", goals)

def update_goal_status(user_id) :
    """ Update the status of a goal (in process, completed or failed)"""
    date = Date()
    now = date.get_current_date()
    goals = db.get("/users/" + user_id + "/goals/")

    for goal in goals:
        if goal[goal]["status"] == "in progress" :
            # Check if the goal should be completed
            if goal[goal]["type"] == "XP" :
                if int(goal[goal]["data"]["starting_xp"]) >= int(goal[goal]["data"]["goal_xp"]) :
                    goal[goal]["status"] = "completed"
            elif goal[goal]["type"] == "Card" :
                if int(goal[goal]["data"]["cards_revised_so_far"]) >= int(goal[goal]["data"]["cards_to_revise"]) :
                    goal[goal]["status"] = "completed"
            
            # Check if goal should be failed - if now is after end date (and it is still in progress)
            # Now and end date are both strings in dd/mm/yyyy format
            if date.compare_dates(now, goal[goal]["end_date"]) > 0 :
                goal[goal]["status"] = "failed"
                goal[goal]["fail_date"] = now

    # Save the new goal data
    db.save("/users/" + user_id + "/goals/", goals)

def create_xp_goal(user_id, goal_xp, end_date) :
    """ Create an XP goal for the user
     XP goals have:
     - ID
     - type (XP)
     - title
     - end date
     - status (failed, completed or in progress)
     - a fail date if failed
     - data storing:
        - start date
        - starting XP
        - desired XP
    This is the same as a card goal except for the data section
    """

    date = Date()
    goal_xp = str(goal_xp)
    goal_type = "XP"
    title = "Gain " + goal_xp + " XP by " + end_date
    status = "in progress"
    start_date = date.get_current_date()
    goal_id = hash_to_numeric(user_id + title)

    db.save(
        "/users/" + user_id + "/goals/" + goal_id + "/",
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

def create_card_goal(user_id, desired_cards_to_revise, end_date) :
    """ Create a card goal for the user
    Card goals have:
     - ID
     - type (XP)
     - title
     - end date
     - status (failed, completed or in progress)
     - a fail date if failed
     - data storing:
        - cards revised so far
        - starting XP
        - desired cards to revise
    """

    desired_cards_to_revise = str(desired_cards_to_revise)
    goal_type = "Card"
    title = "Revise " + desired_cards_to_revise + " cards by " + end_date
    status = "in progress"
    goal_id = hash_to_numeric(user_id + title)

    db.save(
        "/users/" + user_id + "/goals/" + goal_id + "/",
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
