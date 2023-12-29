""" Routes relating to general card management """
import hashlib
from flask import Blueprint, request, jsonify
from database.database import database as db
from classes.date import Date

card_management_routes = Blueprint('card_management_routes', __name__)

def hash_to_numeric(input_string):
    """ Hash a string, convert it to a number, then return a string version of the number
        Importantly, this is deterministic - the same value will be returned
        every time it is hashed"""
    # Convert the input string to its hash using SHA-256
    hashed_string = hashlib.sha256(input_string.encode()).hexdigest()

    # Convert the hexadecimal hash to an integer (base 16)
    hashed_numeric = int(hashed_string, 16)

    # Return the numeric representation of the hash
    return str(hashed_numeric)


@card_management_routes.route("/api/create-flashcard", methods=["POST"])
def create_flashcard() :
    """ Create or edit a flashcard set for the user.
        Flashcards have a front, back, review status and last review date
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

@card_management_routes.route("/api/get-flashcard", methods=["GET"])
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

@card_management_routes.route("/api/get-today-cards", methods=["GET"])
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
