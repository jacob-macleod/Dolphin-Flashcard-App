""" Routes relating to general card management """
import hashlib
import json
from flask import Blueprint, request, jsonify
from database.database import database as db
from classes.date import Date
from verification.api_error_checking import check_request_json
from routes.api.regex_patterns import REVIEW_STATUS_REGEX, DATE_REGEX
from classes.card_collection import FlashcardCollection

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
def create_flashcard():
    """ Create or edit a flashcard set for the user.
        Flashcards have a front, back, review status and last review date
        Set folder to none to set as a top level flashcard, otherwise set it to the parent folder name.
        If you want to set multiple parent folders, you can add the folder name seperated by 1.
        So for example, top-level-parent-name/parent-name-2/parent-name-3
        Example request:
        {
            "userID": "my-id",
            "flashcardName": "My new set",
            "flashcardDescription": "This is\nmy description",
            "folder": "parent-name",
            "cards": [
                {
                    "front":"Front 1",
                    "back": "Back 1",
                    "reviewStatus":"0.0",
                    "lastReview": "dd/mm/yyyy"
                },
                {
                    "front":"Front 2",
                    "back": "Back 2",
                    "reviewStatus":"0.0",
                    "lastReview": "dd/mm/yyyy"
                }
            ]
        }
    """
    # Check the request json
    expected_format = {
        "userID": "",
        "flashcardName": "",
        "flashcardDescription": "",
        "folder": "",
        "cards": [
            {
                "front": "",
                "back": "",
                "reviewStatus": REVIEW_STATUS_REGEX,
                "lastReview": DATE_REGEX
            }
        ]
    }

    result = check_request_json(
        expected_format,
        request.json
    )
    if result is not True:
        return jsonify(
            {
                "error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    try:
        user_id = request.json.get("userID")
        flashcard_name = request.json.get("flashcardName")
        flashcard_description = request.json.get("flashcardDescription")
        cards = request.json.get("cards")
        folder = request.json.get("folder")
        # Add "/" to folder if it does not end with if
        if folder.endswith("/") is False:
            folder += "/"
        # A hashed version of the userID and flashcard name
        flashcard_id = hash_to_numeric(user_id + folder + flashcard_name)

        # If the flashcard does not exist, create it
        if db.get("/users/" + user_id + "/flashcards/" + folder  + flashcard_id) is None:
            db.save("/users/" + user_id + "/flashcards/" + folder  + flashcard_id,
                    {
                        "flashcardID": flashcard_id,
                        "flashcardName": flashcard_name,
                        "flashcardDescription": flashcard_description,
                        "cards": cards
                    }
                    )

        return jsonify({
            "success": True}, 200)
    except Exception as e:
        # Return the error as a json object
        return jsonify(e), 500


@card_management_routes.route("/api/get-flashcard", methods=["GET"])
def get_flashcard():
    """ Get a flashcard based on the name and user ID
        Add json to request as in:
        {
            "userID": "my-id",
            "flashcardName": "My new set"
        }
    """
    # Check the request json
    expected_format = {
        "userID": "",
        "flashcardName": ""
    }
    result = check_request_json(
        expected_format,
        request.json
    )
    if result is not True:
        return jsonify(
            {
                "error": result + ". The request should be in the format: " + str(expected_format)}
        ), 400

    try:
        user_id = request.json.get("userID")
        flashcard_name = request.json.get("flashcardName")
        flashcard_id = hash_to_numeric(user_id + flashcard_name)

        return jsonify(db.get("/users/" + user_id + "/flashcards/" + flashcard_id))

    except Exception as e:
        # Return the error as a json object
        return jsonify(e), 500


@card_management_routes.route("/api/get-today-cards", methods=["GET"])
def get_today_cards():
    """ Get all the flashcards to be learned today for a user
        Requests include soley a json including userID
        Example request:
        {
            "userID": "my-id"
        }

        If a card review status is 0.0, it is not started.
        If it is 0.x, it is actively studying
        If it is >= 1.x, it is learned
    """
    # Check the request json
    expected_format = {
        "userID": ""
    }
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

    # Get all flashcards
    flashcards = db.get("/users/" + user_id + "/flashcards")
    if flashcards is None:
        return jsonify(["User has no flashcards"])

    cards_to_return = FlashcardCollection(flashcards).today_card_list
    return jsonify(cards_to_return)
