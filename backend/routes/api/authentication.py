from flask_cors import CORS
from flask import Blueprint, jsonify, request
from database.database import database as db
from routes.api.validation_wrapper import validate_json
from classes.date import Date
from database.jwt_handler import JwtHandler

authentication_routes = Blueprint('api_routes', __name__)
CORS(authentication_routes)

CREATE_ACCOUNT_FORMAT = {
    "jwtToken": "",
    "displayName": "",
    "idToken": ""
}

GET_USER_FORMAT = {
    "jwtToken": ""
}

GET_USER_STATS_FORMAT = GET_USER_FORMAT

@authentication_routes.route("/api/create-account", methods=["POST"])
@validate_json(CREATE_ACCOUNT_FORMAT)
def create_account():
    """ Create an account for the user if one is not created """
    user_id = request.json.get("userID")
    name = request.json.get("displayName")
    id_token = request.json.get("idToken")

    if db.verify_id_token(id_token, user_id) is False:
        return jsonify({"success": False, "error": "User ID does not match token."}), 403

    date = Date()
    today = date.get_current_date().replace('/', '-')

    db.users.create_user(user_id, name)
    db.statistics.create_new_user_stats(user_id, today)

    jwt_handler = JwtHandler()
    token = jwt_handler.encode(user_id, "Hello world")

    return jsonify({"success": True, "token": token}, 200)

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

@authentication_routes.route("/api/get-user-stats", methods=["GET", "POST"])
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
