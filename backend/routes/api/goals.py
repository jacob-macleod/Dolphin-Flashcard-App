""" Routes relating to goal and quest management """
from classes.date import Date
from database.database import database as db
from routes.api.card_management import hash_to_numeric
from flask import Blueprint, request, jsonify
from routes.api.regex_patterns import DATE_REGEX, NUMBER
from verification.api_error_checking import check_request_json

goal_routes = Blueprint('goal_routes', __name__)

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

@goal_routes.route("/api/update-goal-status", methods=["POST"])
def update_goal_status() :
    """ Update the status of a goal (in process, completed or failed)"""
    expected_format = {
        "userID": "",
    }
    result = check_request_json(
        expected_format,
        request.json
    )
    if result is not True:
        return jsonify(
            {"error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    user_id = request.json.get("userID")
    date = Date()
    now = date.get_current_date()
    goals = db.get("/users/" + user_id + "/goals/")

    for goal in goals:
        if goals[goal]["status"] == "in progress" :
            # Check if the goal should be completed
            if goals[goal]["type"] == "XP" :
                if int(goals[goal]["data"]["starting_xp"]) >= int(goals[goal]["data"]["goal_xp"]) :
                    goals[goal]["status"] = "completed"
            elif goals[goal]["type"] == "Card" :
                if int(goals[goal]["data"]["cards_revised_so_far"]) >= int(goals[goal]["data"]["cards_to_revise"]) :
                    goals[goal]["status"] = "completed"

            # Check if goal should be failed - if now is after end date (and it is still in progress)
            # Now and end date are both strings in dd/mm/yyyy format
            if date.compare_dates(now, goals[goal]["end_date"]) > 0 :
                goals[goal]["status"] = "failed"
                goals[goal]["fail_date"] = now

    # Save the new goal data
    db.save("/users/" + user_id + "/goals/", goals)
    return jsonify(goals), 200

@goal_routes.route("/api/create-xp-goal", methods=["POST"])
def create_xp_goal() :
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

    Example request:
    {
        "userID": "my-id",
        "goalXP": "100",
        endDate: "01/01/2022" (in dd/mm/yyyy format)
    }
    """
    expected_format = {
        "userID": "",
        "goalXP": NUMBER,
        "endDate": DATE_REGEX
    }
    result = check_request_json(
        expected_format,
        request.json
    )
    if result is not True:
        return jsonify(
            {"error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    user_id = request.json.get("userID")
    goal_xp = request.json.get("goalXP")
    end_date = request.json.get("endDate")

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
    return jsonify({"success": "Goal created successfully"}), 200

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
