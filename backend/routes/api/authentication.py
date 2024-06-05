from flask_cors import CORS
from flask import Blueprint, jsonify, request
from database.database import database as db
from routes.api.validation_wrapper import validate_json
from classes.date import Date

authentication_routes = Blueprint('api_routes', __name__)
CORS(authentication_routes)

CREATE_ACCOUNT_FORMAT = {
    "userID": "",
    "displayName": ""
}

GET_USER_FORMAT = {
    "userID": ""
}

GET_USER_STATS_FORMAT = GET_USER_FORMAT

@authentication_routes.route("/api/create-account", methods=["POST"])
@validate_json(CREATE_ACCOUNT_FORMAT)
def create_account():
    """ Create an account for the user if one is not created """
    user_id = request.json.get("userID")
    name = request.json.get("displayName")

    date = Date()
    today = date.get_current_date().replace('/', '-')

    db.users.create_user(user_id, name)
    db.statistics.create_new_user_stats(user_id, today)

    return jsonify({"success": True}, 200)

@authentication_routes.route("/api/get-user", methods=["GET"])
@validate_json(GET_USER_FORMAT)
def get_user():
    """Get the data for a user
    """
    user_id = request.json.get("userID")
    try:
        user = db.users.get_user(user_id)
        return jsonify(user, 200)
    except Exception as e:
        return jsonify({"error": str(e)}, 400)

@authentication_routes.route("/api/get-user-stats", methods=["GET"])
@validate_json(GET_USER_STATS_FORMAT)
def get_user_stats():
    """Get the statistics for a user
    """
    user_id = request.json.get("userID")
    try:
        stats = db.statistics.get_stats(user_id)
        return jsonify(stats, 200)
    except Exception as e:
        return jsonify({"error": str(e)}, 400)
