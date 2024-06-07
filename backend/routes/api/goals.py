""" Routes relating to goal and quest management """
from classes.date import Date
from database.database import database as db
from routes.api.card_management import hash_to_numeric
from flask import Blueprint, request, jsonify
from routes.api.regex_patterns import DATE_REGEX, NUMBER
from routes.api.validation_wrapper import validate_json

goal_routes = Blueprint('goal_routes', __name__)

CREATE_XP_GOAL_FORMAT = {
    "userID": "",
    "goalXP": NUMBER,
    "endDate": DATE_REGEX
}

CREATE_CARD_GOAL_FORMAT = {
    "userID": "",
    "cardsToRevise": NUMBER,
    "endDate": DATE_REGEX
}

UPDATE_GOAL_STATUS_FORMAT = {
    "userID": "",
}

EDIT_CARD_GOAL_FORMAT = {
    "userID": "",
    "goalID": "",
    "newEndDate": DATE_REGEX,
    "newTitle": "",
    "newCardsToRevise": NUMBER
}

EDIT_XP_GOAL_FORMAT = {
    "userID": "",
    "goalID": "",
    "newEndDate": DATE_REGEX,
    "newTitle": "",
    "newGoalXP": NUMBER
}

DELETE_GOAL_FORMAT = {
    "userID": "",
    "goalID": ""
}

def update_goal_stats(user_id, xp_increment):
    """Update the user's goal stats
    To be run when a new card is revised"""
    db.goals.update_goal_stats(user_id, xp_increment)

@goal_routes.route("/api/create-xp-goal", methods=["POST"])
@validate_json(CREATE_XP_GOAL_FORMAT)
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
        "endDate": "01/01/2022" (in dd/mm/yyyy format)
    }
    """
    try:
        user_id = request.json.get("userID")
        goal_xp = request.json.get("goalXP")
        end_date = request.json.get("endDate")
        start_date = Date().get_current_date()
        db.goals.create_xp_goal(user_id, goal_xp, start_date, end_date, hash_to_numeric)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"success": "Goal created successfully"}), 200

@goal_routes.route("/api/create-card-goal", methods=["POST"])
@validate_json(CREATE_CARD_GOAL_FORMAT)
def create_card_goal() :
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
    try:
        user_id = request.json.get("userID")
        desired_cards_to_revise = request.json.get("cardsToRevise")
        end_date = request.json.get("endDate")

        db.goals.create_card_goal(user_id, desired_cards_to_revise, end_date, hash_to_numeric)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"success": "Goal created successfully"}), 200

@goal_routes.route("/api/update-goal-status", methods=["POST"])
@validate_json(UPDATE_GOAL_STATUS_FORMAT)
def update_goal_status() :
    """ Update the status of a goal (in process, completed or failed)"""
    try:
        user_id = request.json.get("userID")
        date = Date()
        now = date.get_current_date()

        new_goals = db.goals.update_goal_status(user_id, date, now)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(new_goals), 200

@goal_routes.route("/api/edit-card-goal", methods=["POST"])
@validate_json(EDIT_CARD_GOAL_FORMAT)
def edit_card_goal():
    """ Edit an existing card goal for the user """
    user_id = request.json.get("userID")
    goal_id = request.json.get("goalID")
    new_end_date = request.json.get("newEndDate")
    new_title = request.json.get("newTitle")
    new_cards_to_revise = request.json.get("newCardsToRevise")

    try:
        db.goals.edit_card_goal(user_id, goal_id, new_end_date, new_title, new_cards_to_revise)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"success": "Goal updated successfully"}), 200

@goal_routes.route("/api/edit-xp-goal", methods=["POST"])
@validate_json(EDIT_XP_GOAL_FORMAT)
def edit_xp_goal():
    """ Edit an existing XP goal for the user """
    user_id = request.json.get("userID")
    goal_id = request.json.get("goalID")
    new_end_date = request.json.get("newEndDate")
    new_title = request.json.get("newTitle")
    new_goal_xp = request.json.get("newGoalXP")

    try:
        db.goals.edit_xp_goal(user_id, goal_id, new_end_date, new_title, new_goal_xp)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"success": "Goal updated successfully"}), 200

@goal_routes.route("/api/delete-goal", methods=["DELETE"])
@validate_json(DELETE_GOAL_FORMAT)
def delete_goal():
    """
    Delete a user's goal
    """
    user_id = request.json.get("userID")
    goal_id = request.json.get("goalID")

    try:
        db.goals.delete_goal(user_id, goal_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"success": "Goal deleted successfully"}), 200
