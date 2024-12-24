from flask_cors import CORS
from flask import Blueprint, jsonify, request
from database.database import database as db
from routes.api.validation_wrapper import validate_json
from classes.date import Date
from database.jwt_handler import JwtHandler
from routes.api.card_management import hash_to_numeric

authentication_routes = Blueprint("api_routes", __name__)
CORS(authentication_routes)

CREATE_ACCOUNT_FORMAT = {
    "userID": "",
    "displayName": "",
    "rawAccessToken": "",
    "accessToken": "",
    "idToken": "",
}

SIGN_IN_FORMAT = {
    "userID": "",
    "rawAccessToken": "",
    "accessToken": "",
    "idToken": "",
}


GET_USER_FORMAT = {"jwtToken": ""}

GET_USER_STATS_FORMAT = GET_USER_FORMAT


@authentication_routes.route("/api/create-account", methods=["POST"])
@validate_json(CREATE_ACCOUNT_FORMAT)
def create_account():
    """Create an account for the user if one is not created"""
    user_id = request.json.get("userID")
    name = request.json.get("displayName")
    id_token = request.json.get("idToken")
    access_token = request.json.get("accessToken")
    raw_access_token = request.json.get("rawAccessToken")

    if db.verify_id_token(id_token, user_id) is False:
        return (
            jsonify({"success": False, "error": "User ID does not match token."}),
            403,
        )

    if access_token != hash_to_numeric(raw_access_token):
        return (
            jsonify(
                {
                    "error": f"Access Token '{access_token}' does not match raw access token '{raw_access_token}'"
                }
            ),
            403,
        )

    date = Date()
    today = date.get_current_date().replace("/", "-")

    db.users.create_user(user_id, name)
    db.statistics.create_new_user_stats(user_id, today)

    jwt_handler = JwtHandler()

    try:
        token = jwt_handler.encode(user_id, raw_access_token, access_token)
    except Exception as e:
        return jsonify({"error": str(e)}, 500)

    return jsonify({"success": True, "token": token}, 200)


@authentication_routes.route("/api/sign-in", methods=["POST"])
@validate_json(SIGN_IN_FORMAT)
def sign_in():
    """Sign in a user if they exist"""
    user_id = request.json.get("userID")
    id_token = request.json.get("idToken")
    access_token = request.json.get("accessToken")
    raw_access_token = request.json.get("rawAccessToken")

    if db.verify_id_token(id_token, user_id) is False:
        return (
            jsonify({"success": False, "error": "User ID does not match token."}),
            403,
        )

    if access_token != hash_to_numeric(raw_access_token):
        return (
            jsonify(
                {
                    "error": f"Access Token '{access_token}' does not match raw access token '{raw_access_token}'"
                }
            ),
            403,
        )

    if db.users.get_user(user_id) is None:
        return jsonify({"success": False, "error": "User does not exist."}), 403

    jwt_handler = JwtHandler()

    try:
        token = jwt_handler.encode(user_id, raw_access_token, access_token)
    except Exception as e:
        return jsonify({"error": str(e)}, 500)

    return jsonify({"success": True, "token": token}, 200)


@authentication_routes.route("/api/get-user", methods=["GET", "POST"])
def get_user():
    """Get the data for a user"""
    user_id = request.json.get("userID")
    try:
        user = db.users.get_user(user_id)
        return jsonify(user, 200)
    except Exception as e:
        return jsonify({"error": str(e)}, 400)

@authentication_routes.route("/api/get-user-from-jwt", methods=["GET", "POST"])
@validate_json(GET_USER_FORMAT)
def get_user_from_jwt():
    """Get the user from the JWT"""
    user_id = request.json.get("userID")
    try:
        user = db.users.get_user(user_id)
        return jsonify(user, 200)
    except Exception as e:
        return jsonify({"error": str(e)}, 400)

@authentication_routes.route("/api/get-user-stats", methods=["GET", "POST"])
@validate_json(GET_USER_STATS_FORMAT)
def get_user_stats():
    """Get the statistics for a user"""
    user_id = request.json.get("userID")
    try:
        stats = db.statistics.get_stats(user_id)
        return jsonify(stats, 200)
    except Exception as e:
        return jsonify({"error": str(e)}, 400)
