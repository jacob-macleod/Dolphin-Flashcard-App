import json
import os
import hashlib
import threading
from flask import Blueprint, abort, jsonify, request
from classes.card import Card
from database.database import database as db
from classes.date import Date
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


def increase_xp(user_id, increment_amount) :
    """ Increase the user's XP by 10 """
    db.increment("/users/" + user_id + "/statistics/totalXP", increment_amount)
    db.increment("/users/" + user_id + "/statistics/weeklyXP", increment_amount)

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

@api_routes.route("/api/get-flashcard", methods=["GET"])
def get_flashcard() :
    """ Get a flashcard based on the name and user ID
        Add json to request as in:
        {
            "userID": "my-id",
            "flashcardName": "My new set"
        }
    """
    try :
        user_id = request.json.get("userID")
        flashcard_name = request.json.get("flashcardName")
        flashcard_id = hash_to_numeric(user_id + flashcard_name)

        return jsonify(db.get("/users/" + user_id + "/flashcards/" + flashcard_id))

    except Exception as e:
        # Return the error as a json object
        return jsonify(e), 500

@api_routes.route("/api/calculate-card-stats", methods=["POST"])
def calculate_card_stats() :
    """ Used when a user is revising a set of cards.
        For each card, calculate the next card to look at,
        And the new card review times and review statuses

        Example request:
        {
            "userID": "my-id",
            "cardStatus": "right",
            "cardStreak": "3",
            "currentIndex": "4",
            "lastReview": "09/01/2024",
            "maxIndex": "20",
            "reviewStatus": "8.0"
        }
    """
    user_id = request.json.get("userID")
    # The current card being looked at
    current_index = request.json.get("currentIndex")
    # The max num of cards
    max_index = request.json.get("maxIndex")
    # Whether the card was right, wrong, or easy
    card_status = request.json.get("cardStatus")
    last_review = request.json.get("lastReview")
    review_status = request.json.get("reviewStatus")
    # How many cards have been looked at in the set this session before getting one wrong
    streak = request.json.get("cardStreak")

    card = Card(
        current_index,
        max_index,
        card_status,
        last_review,
        review_status,
        streak
    )

    # If the user got the card right
    if card_status == "right":
        card.increment_index()
        card.increment_review_status()
    elif card.status == "easy" :
        card.increment_index()
        card.easy_button()
    else:
        card.reset_card()

    # When review_status is small, it's close to 10. The bigger it is, the smaller xp_increase is
    xp_increase = round(10 - (1-(int(float(review_status)) / 100)))
    thread = threading.Thread(target=increase_xp, args=(user_id, xp_increase))
    thread.start()

    # Return the updated card details
    return jsonify({
        "currentIndex": card.current_index,
        "maxIndex": card.max_index,
        "cardStatus": card.status,
        "lastReview": card.last_review,
        "reviewStatus": card.review_status,
        "cardStreak": card.streak
    })

@api_routes.route("/api/get-today-cards", methods=["GET"])
def get_today_cards() :
    """ Get all the flashcards to be learned today for a user
        Requests include soley a json including userID
        Example request:
        {
            "userID": "my-id"
        }
    """
    user_id = request.json.get("userID")
    cards_to_return = []
    date = Date()

    # Get all flashcards
    flashcards = db.get("/users/" + user_id + "/flashcards")
    # Select only the cards due today or previous days
    for flashcard_id, flashcard_data in flashcards.items():
        # Access the "cards" list within each flashcard
        cards_list = flashcard_data.get("cards", [])
        # Iterate through each card in the "cards" list
        for card in cards_list:
            if card["lastReview"] <= date.get_current_date():
                card["flashcardName"] = flashcard_data["flashcardName"]
                cards_to_return.append(card)

    return jsonify(cards_to_return)
