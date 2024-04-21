from flask_cors import CORS
from flask import Blueprint, jsonify, request
from database.database import database as db
from classes.date import Date
from routes.api.validation_wrapper import validate_json

authentication_routes = Blueprint('api_routes', __name__)
CORS(authentication_routes)

CREATE_ACCOUNT_FORMAT = {
    "userID": "",
    "displayName": ""
}

@authentication_routes.route("/api/create-account", methods=["POST"])
@validate_json(CREATE_ACCOUNT_FORMAT)
def create_account():
    """ Create an account for the user if one is not created """
    user_id = request.json.get("userID")
    name = request.json.get("displayName")
    date = Date()

    user = db.collection("users").document(user_id)
    user.set({"name": name})
    stats = db.collection("statistics").document(user_id)
    stats.set(
        {
            "lastStreak": date.get_current_date(),
            "streak": 0,
            "weeklyXP": 0,
            "totalXP": 0
        }
    )
    return jsonify({"success": True}, 200)
