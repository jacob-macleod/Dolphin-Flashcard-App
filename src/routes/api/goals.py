""" Routes relating to goal and quest management """
from classes.date import Date
from database.database import database as db
from routes.api.card_management import hash_to_numeric

def update_goals() :
    """ Update the user's goals, depending on whether it is
    an XP or card goal """

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
