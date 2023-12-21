from flask import render_template, Blueprint, abort, jsonify, request
import os
import json
from database.database import database as db
api_routes = Blueprint('api_routes', __name__)

# Check if the request is coming from local traffic
def is_local_request():
    """ Check if the requets is from local traffic """
    # Get the client's IP address from the request
    client_ip = request.remote_addr
    print ("CLIENT IP IS " + request.remote_addr)
    # Check if the client's IP address is localhost (127.0.0.1 or ::1) or the docker network
    return client_ip in ('127.0.0.1', '172.17.0.1', '::1')

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
    print ("SERVING REQUEST!!!\n\n")
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
    """ Create a flashcard set for the user. Flashcards have a front, back, review status and last review date"""
    user_id = request.json.get("userID")
    flashcard_name = request.json.get("flashcardName")
    flashcard_description = request.json.get("flashcardDescription")
    cards = request.json.get("cards")
    print (cards)
    """flashcard_id = request.json.get("flashcardID")
    front = request.json.get("front")
    back = request.json.get("back")
    review_status = request.json.get("reviewStatus")
    last_review_date = request.json.get("lastReviewDate")

    if db.get("/users/" + user_id + "/flashcards/" + flashcard_id) is None:
        db.save("/users/" + user_id + "/flashcards/" + flashcard_id,
            {
                "flashcardID": flashcard_id,
                "front": front,
                "back": back,
                "reviewStatus": review_status,
                "lastReviewDate": last_review_date
            }
        )

    return jsonify({"success": True}, 200)"""