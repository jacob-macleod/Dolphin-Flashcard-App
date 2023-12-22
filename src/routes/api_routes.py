from flask import render_template, Blueprint, abort, jsonify, request
import os
import json
import hashlib
from database.database import database as db
api_routes = Blueprint('api_routes', __name__)

# Check if the request is coming from local traffic
def is_local_request():
    """ Check if the requets is from local traffic """
    # Get the client's IP address from the request
    client_ip = request.remote_addr
    # Check if the client's IP address is localhost (127.0.0.1 or ::1) or the docker network
    return client_ip in ('127.0.0.1', '172.17.0.1', '::1')

def hash_to_numeric(input_string):
    """ Hash a string, convert it to a number, then return a string version of the number
        Importantly, this is deterministic - the same value will be returned every time it is hashed"""
    # Convert the input string to its hash using SHA-256
    hashed_string = hashlib.sha256(input_string.encode()).hexdigest()

    # Convert the hexadecimal hash to an integer (base 16)
    hashed_numeric = int(hashed_string, 16)

    # Return the numeric representation of the hash
    return str(hashed_numeric)

@api_routes.route("/api/create-account", methods=["POST"])
def create_account():
    """ Create an account for the user if one is not created """
    user_id = request.json.get("userID")
    name = request.json.get("displayName")
    print (name)

    if db.get("/users/" + user_id) is None:
        db.save("/users/" + user_id,
            {
                "userID": user_id,
                "name": name,
                "statistics": {
                    "streak": "0",
                    "totalXP": "0",
                    "weeklyXP": "0",
                },
                "heatmapData": {}
            }
        )

    return jsonify({"success": True}, 200)

# Route to serve credentials.json for local traffic only
@api_routes.route('/api/firebase-config', methods=['GET'])
def serve_credentials():
    """ Return the firebase_config file if the request is from local traffic"""
    if not is_local_request():
        # If the request is not from local traffic, return 403 Forbidden
        abort(403)

    # Get the path to credentials.json in the same directory as the script
    script_dir = os.path.dirname(os.path.realpath(__file__))
    credentials_path = os.path.join(script_dir, 'firebase_config.json')

    # Check if credentials.json exists and is a file
    if os.path.isfile("firebase_config.json"):
        # Read credentials.json file and return its contents as JSON
        with open("firebase_config.json", 'r') as f:
            credentials_data = json.load(f)
        return credentials_data, 200, {'Content-Type': 'application/json'}
    else:
        # Return an error response if credentials.json doesn't exist or is inaccessible
        return "Credentials file not found", 404
    
@api_routes.route("/api/create-flashcard", methods=["POST"])
def create_flashcard() :
    """ Create or edit a flashcard set for the user. Flashcards have a front, back, review status and last review date
        Example request:
        {
            "userID": "my-id",
            "flashcardName": "My new set",
            "flashcardDescription": "This is\nmy description",
            "cards": [
                {
                    "front":"Front 1",
                    "back": "Back 1",
                    "reviewStatus":"0",
                    "lastReview": "dd/mm/yyyy"
                },
                {
                    "front":"Front 2",
                    "back": "Back 2",
                    "reviewStatus":"0",
                    "lastReview": "dd/mm/yyyy"
                }
            ]
        }
    """
    try :
        user_id = request.json.get("userID")
        flashcard_name = request.json.get("flashcardName")
        flashcard_description = request.json.get("flashcardDescription")
        cards = request.json.get("cards")
        # A hashed version of the userID and flashcard name
        flashcard_id = hash_to_numeric(user_id + flashcard_name)

        if db.get("/users/" + user_id + "/flashcards/" + flashcard_id) is None:
            db.save("/users/" + user_id + "/flashcards/" + flashcard_id,
                {
                    "flashcardID": flashcard_id,
                    "flashcardName": flashcard_name,
                    "flashcardDescription": flashcard_description,
                    "cards": cards
                }
            )

        return jsonify({"success": True}, 200)
    except Exception as e:
        # Return the error as a json object
        return jsonify(e), 500
