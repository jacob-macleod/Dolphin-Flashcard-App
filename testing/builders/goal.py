import datetime
import os
import random
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "../..", "backend")
sys.path.append(src_path)

from database.database import database as db
from routes.api.card_management import hash_to_numeric



def create_card_goal_no_db(user_id, **kwargs) -> dict:
    goal = {
        "goal_type": "Card",
        "title": "Revise " + str(kwargs.get("cardsToRevise", 5)) + " cards by " + kwargs.get("endDate", "01/01/2022"),
        "cardsToRevise": kwargs.get("cardsToRevise", 5),
        "endDate": kwargs.get("endDate", "01/01/2022"),
        "status": "in progress",
    }

    goal["goal_id"] = hash_to_numeric(user_id + goal["title"])

    return goal


def create_xp_goal_no_db(user_id, **kwargs) -> dict:
    goal = {
        "goalXP": kwargs.get("goal_xp", 5),
        "endDate": kwargs.get("endDate", "01/01/2022"),
        "startDate": kwargs.get("startDate", datetime.datetime.now().strftime('%d/%m/%Y')),
        "goal_type": "XP",
        "status": "in progress",
    }
    goal["title"] = "Gain " + str(goal["goalXP"]) + " XP by " + str(goal["endDate"])
    goal["goal_id"] = hash_to_numeric(user_id + goal["title"])

    return goal


def create_xp_goal(user_id, **kwargs) -> dict:
    goal = create_xp_goal_no_db(user_id, **kwargs)
    db.goals.create_xp_goal(
        user_id,
        goal["goalXP"],
        goal["startDate"],
        goal["endDate"],
        hash_to_numeric,
    )
    return goal


def create_card_goal(user_id, **kwargs) -> dict:
    goal = create_card_goal_no_db(user_id, **kwargs)

    db.goals.create_card_goal(
        user_id,
        goal["cardsToRevise"],
        goal["endDate"],
        hash_to_numeric,
    )

    return goal
