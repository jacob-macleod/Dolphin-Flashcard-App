import json
import os
from flask_cors import CORS
from flask import Blueprint, abort, jsonify, request
from database.database import database as db
from classes.date import Date
from verification.api_error_checking import check_request_json

authentication_routes = Blueprint('api_routes', __name__)
CORS(authentication_routes)


# Check if the request is coming from local traffic
def is_local_request():
    """ Check if the requets is from local traffic """
    # Get the client's IP address from the request
    client_ip = request.remote_addr
    # Check if the client's IP address is localhost (127.0.0.1 or ::1) or the docker network
    return client_ip in ('127.0.0.1', '172.17.0.1', '::1', 'localhost', '192.168.0.111')


@authentication_routes.route("/api/create-account", methods=["POST"])
def create_account():
    """ Create an account for the user if one is not created """
    # Check the request json
    expected_format = {
        "userID": "",
        "displayName": ""}
    result = check_request_json(
        expected_format,
        request.json
    )
    if result is not True:
        return jsonify(
            {
                "error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    user_id = request.json.get("userID")
    name = request.json.get("displayName")
    date = Date()

    if db.get("/users/" + user_id) is None:
        db.save("/users/" + user_id,
                {
                    "userID": user_id,
                    "name": name,
                    "statistics": {
                        "streak": "0",
                        "totalXP": "0",
                        "weeklyXP": "0",
                        "lastStreak": date.get_current_date()
                    },
                    "heatmapData": {}
                }
                )

    return jsonify({
                       "success": True}, 200)


# Route to serve credentials.json for local traffic only
@authentication_routes.route('/api/firebase-config', methods=['GET'])
def serve_credentials():
    """ Return the firebase_config file if the request is from local traffic"""
    print("Serving")
    if not is_local_request():
        # If the request is not from local traffic, return 403 Forbidden
        print("Abort")
        abort(403)

    # Get the path to credentials.json in the same directory as the script
    script_dir = os.path.dirname(os.path.realpath(__file__))
    credentials_path = os.path.join(script_dir, 'firebase_config.json')

    # Check if credentials.json exists and is a file
    if os.path.isfile("firebase_config.json"):
        # Read credentials.json file and return its contents as JSON
        with open("firebase_config.json", 'r') as f:
            credentials_data = json.load(f)
        print("Returning" + str(credentials_data))
        return credentials_data, 200, {
            'Content-Type': 'application/json'}
    else:
        # Return an error response if credentials.json doesn't exist or is inaccessible
        print("File not found")
        return "Credentials file not found", 404
