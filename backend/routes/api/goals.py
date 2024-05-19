""" Routes relating to goal and quest management """
from classes.date import Date
from database.database import database as db
from routes.api.card_management import hash_to_numeric
from flask import Blueprint, request, jsonify
from routes.api.regex_patterns import DATE_REGEX, NUMBER
from verification.api_error_checking import check_request_json
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
        endDate: "01/01/2022" (in dd/mm/yyyy format)
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

    new_goals = {}

    for goal in goals:
        # If the goal has been deleted, fully delete it
        # When goals are deleted, the goal data is set to <goal id>: {}. In the firebase instance, it is then deleted automatically,
        # But not in the local json files. Thus, an extra check needs to be made
        if "status" in goals[goal]:
            new_goals[goal] = goals[goal] # Add the goal if it has not been deleted
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
    db.save("/users/" + user_id + "/goals/", new_goals)
    return jsonify(new_goals), 200

@goal_routes.route("/api/edit-card-goal", methods=["POST"])
def edit_card_goal():
    """ Edit an existing card goal for the user """
    expected_format = {
        "userID": "",
        "goalID": "",
        "newEndDate": DATE_REGEX,
        "newTitle": "",
        "newCardsToRevise": NUMBER
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
    goal_id = request.json.get("goalID")
    print (goal_id)
    new_end_date = request.json.get("newEndDate")
    new_title = request.json.get("newTitle")
    new_cards_to_revise = request.json.get("newCardsToRevise")

    goal_path = "/users/" + user_id + "/goals/" + goal_id + "/"
    goal_data = db.get(goal_path)

    if goal_data is None:
        return jsonify({"error": "Goal not found"}), 404

    # Update the goal data
    goal_data["end_date"] = new_end_date
    goal_data["title"] = new_title
    goal_data["data"]["cards_to_revise"] = str(new_cards_to_revise)

    # Save the updated goal data
    db.save(goal_path, goal_data)

    return jsonify({"success": "Goal updated successfully"}), 200

@goal_routes.route("/api/edit-xp-goal", methods=["POST"])
def edit_xp_goal():
    """ Edit an existing XP goal for the user """
    expected_format = {
        "userID": "",
        "goalID": "",
        "newEndDate": DATE_REGEX,
        "newTitle": "",
        "newGoalXP": NUMBER
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
    goal_id = request.json.get("goalID")
    new_end_date = request.json.get("newEndDate")
    new_title = request.json.get("newTitle")
    new_goal_xp = request.json.get("newGoalXP")

    goal_path = "/users/" + user_id + "/goals/" + goal_id + "/"
    goal_data = db.get(goal_path)

    if goal_data is None:
        return jsonify({"error": "Goal not found"}), 404

    # Update the goal data
    goal_data["end_date"] = new_end_date
    goal_data["title"] = new_title
    goal_data["data"]["goal_xp"] = str(new_goal_xp)

    # Save the updated goal data
    db.save(goal_path, goal_data)

    return jsonify({"success": "Goal updated successfully"}), 200

@goal_routes.route("/api/delete-goal", methods=["DELETE"])
def delete_goal():
    """ Edit an existing XP goal for the user """
    expected_format = {
        "userID": "",
        "goalID": ""
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
    goal_id = request.json.get("goalID")

    goal_path = "/users/" + user_id + "/goals/" + goal_id + "/"

    # Save the updated goal data
    db.save(goal_path, {})

    return jsonify({"success": "Goal deleted successfully"}), 200
