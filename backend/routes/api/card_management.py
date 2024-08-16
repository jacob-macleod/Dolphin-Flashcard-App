""" Routes relating to general card management """
import uuid
from flask import Blueprint, request, jsonify
from database.database import database as db
from routes.api.validation_wrapper import validate_json
from routes.api.regex_patterns import REVIEW_STATUS_REGEX, DATE_REGEX
from classes.card_collection import FlashcardCollection

card_management_routes = Blueprint('card_management_routes', __name__)

def hash_to_numeric(input_string):
    """ Hash a string, convert it to a number, then return a string version of the number
        Importantly, this is deterministic - the same value will be returned
        every time it is hashed"""
    # Convert the input string to its
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, input_string))

CREATE_FLASHCARD_FORMAT = {
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

CREATE_FOLDER_FORMAT = {
    "userID": "",
    "folder": ""
}

GET_FLASHCARD_FORMAT = {
    "flashcardID": ""
}

GET_FLASHCARD_ITEM = {
    "cardID": ""
}

GET_TODAY_CARDS = {
    "userID": ""
}
GET_ALL_CARDS = GET_TODAY_CARDS

MOVE_FLASHCARD_SET = {
    "userID": "",
    "currentLocation": "",
    "flashcardName": "",
    "moveLocation": ""
}

UPDATE_CARD_PROGRESS = {
    "userID": "",
    "cardData": []
}

DELETE_FLASHCARD_FORMAT = {
    "userID": "",
    "flashcardID": ""
}

RENAME_FLASHCARD_FORMAT = {
    "userID": "",
    "flashcardID": "",
    "newName": ""
}

@card_management_routes.route("/api/create-flashcard", methods=["POST"])
@validate_json(CREATE_FLASHCARD_FORMAT)
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
    try:
        user_id = request.json.get("userID")
        flashcard_name = request.json.get("flashcardName")
        flashcard_description = request.json.get("flashcardDescription")
        cards = request.json.get("cards")
        folder = request.json.get("folder")

        # A hashed version of the userID and flashcard name
        flashcard_id = hash_to_numeric(user_id + folder + flashcard_name)

        # Generate the card_ids
        card_ids = [
            hash_to_numeric(user_id + folder + flashcard_name + card["front"])
            for card in cards
        ]

        # Create the flashcard set
        db.flashcard_set.create_flashcard_set(
            flashcard_id=flashcard_id,
            flashcard_name=flashcard_name,
            flashcard_description=flashcard_description,
            card_ids=card_ids
        )

        # Create each individual flashcard
        db.flashcards.create_flashcards(card_ids, cards)

        # Assign the set to the user in the folder structure
        db.folders.add_flashcard_to_folder(
            user_id=user_id,
            folder=folder,
            flashcard_id=flashcard_id,
            flashcard_name=flashcard_name,
            card_ids=card_ids
        )

        # Give the user read and write access
        db.read_write_access.give_user_access(user_id, flashcard_id)

        return jsonify({"flashcardID": flashcard_id}, 200)
    except Exception as e:
        # Return the error as a json object
        return jsonify(str(e)), 500

@card_management_routes.route("/api/create-folder", methods=["POST"])
@validate_json(CREATE_FOLDER_FORMAT)
def create_folder():
    """ Create a folder for the user
    Example request:
    {
        "userID": "my-id",
        "folder": "parent-name"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder = request.json.get("folder")

        db.folders.create_folder(user_id, folder)

        return jsonify({
            "success": "Folder " + folder + " created"
        }), 200
    except Exception as e:
        return jsonify(str(e)), 500

@card_management_routes.route("/api/get-flashcard", methods=["GET", "POST"])
@validate_json(GET_FLASHCARD_FORMAT)
def get_flashcard():
    """ Get a flashcard set based on the name and user ID
        Add json to request as in:
        {
            "flashcardID": "my-flashcard-id"
        }
    """
    try:
        flashcard_id = request.json.get("flashcardID")
        flashcard_data = db.flashcard_set.get_flashcard_set(flashcard_id)

        return jsonify(
            flashcard_data, 200
        )

    except Exception as e:
        # Return the error as a json object
        return jsonify(str(e)), 500

@card_management_routes.route("/api/get-flashcard-item", methods=["GET", "POST"])
@validate_json(GET_FLASHCARD_ITEM)
def get_flashcard_item():
    """ Get a flashcard item based on the card ID. Flashcard sets store
    multiple flashcard items, which are the individual flashcards
        Add json to request as in:
        {
            "cardID": "my-id"
        }
    """
    try:
        card_id = request.json.get("cardID")

        return jsonify(
            db.flashcards.get_flashcard(card_id), 200
        )

    except Exception as e:
        # Return the error as a json object
        return jsonify(str(e)), 500

@card_management_routes.route("/api/get-today-cards", methods=["POST"])
@validate_json(GET_TODAY_CARDS)
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
    try:
        user_id = request.json.get("userID")

        # Get all flashcards
        flashcards = db.folders.get_user_data(user_id)

        if flashcards is None:
            return jsonify(["User has no flashcards"])

        cards_to_return = FlashcardCollection(flashcards).today_card_list
        return jsonify(cards_to_return)
    except Exception as e:
        # Return the error as a json object
        return jsonify(str(e)), 500

@card_management_routes.route("/api/get-all-cards", methods=["POST"])
@validate_json(GET_ALL_CARDS)
def get_all_cards():
    """Get all the flashcards created by a user

        Example request:
        {
            "userID": "my-id"
        }
    """
    try:
        user_id = request.json.get("userID")

        # Get all flashcards
        flashcards = db.folders.get_user_data(user_id)

        if flashcards is None:
            return jsonify(["User has no flashcards"])

        return jsonify(flashcards)
    except Exception as e:
        # Return the error as a json object
        return jsonify(str(e)), 500

@card_management_routes.route("/api/move-flashcard-set", methods=["POST"])
@validate_json(MOVE_FLASHCARD_SET)
def move_flashcard_set():
    """Move a flashcard set to a new location
    Example request:
    {
        "userID": "my-id",
        "currentLocation": "the current folder path",
        "flashcardName": "the flashcard set name",
        "moveLocation": "the folder path to move to"
    }
    """
    try:
        # Get the supplied variables
        user_id = request.json.get("userID")
        flashcard_name = request.json.get("flashcardName")
        move_location = request.json.get("moveLocation")
        current_location = request.json.get("currentLocation")

        db.folders.move_flashcard_set(user_id, flashcard_name, current_location, move_location)

        return jsonify(
            {
                "success": "The flashcard set at "
                + "/users/" + user_id
                + "/flashcards/" + current_location + "/" + flashcard_name
                + " has been moved to " + move_location}
        ), 200
    except Exception as e:
        return jsonify(str(e)), 500

@card_management_routes.route("/api/update-card-progress", methods=["POST"])
@validate_json(UPDATE_CARD_PROGRESS)
def update_card_progress():
    """
    Update the progress (last review, date studied) for multiple cards
    Example request:
    {
        "userID": "my-id",
        "cardData": [
            {
                "cardID": "my-card-id",
                "reviewStatus": "0.0",
                "lastReview": "dd/mm/yyyy"
            }
        ]
    }
    """
    try:
        user_id = request.json.get("userID")
        card_data = request.json.get("cardData")

        db.folders.update_card_progress(user_id, card_data)

        return jsonify({"success": "Card progress updated"}), 200
    except Exception as e:
        return jsonify(str(e)), 500

@card_management_routes.route("/api/delete-flashcard", methods=["DELETE"])
@validate_json(DELETE_FLASHCARD_FORMAT)
def delete_flashcard():
    """
    Delete a flashcard set
    Example request:
    {
        "userID": "my-id",
        "flashcardID": "my-flashcard-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        flashcard_id = request.json.get("flashcardID")

        result = db.folders.delete_flashcard(user_id, flashcard_id)

        if result is not None:
            return jsonify({"success": f"Flashcard {flashcard_id} deleted"}), 200
        else:
            return jsonify({"error": f"Flashcard {flashcard_id} does not exist"}), 404

    except Exception as e:
        return jsonify(str(e)), 500

@card_management_routes.route("/api/rename-flashcard", methods=["POST"])
@validate_json(RENAME_FLASHCARD_FORMAT)
def rename_flashcard():
    """
    Rename a flashcard set
    Example request:
    {
        "userID": "my-id",
        "flashcardID": "my-flashcard-id",
        "newName": "new-name"
    }
    """
    try:
        user_id = request.json.get("userID")
        flashcard_id = request.json.get("flashcardID")
        new_name = request.json.get("newName")

        result = db.folders.rename_flashcard(user_id, flashcard_id, new_name)

        if result is not None:
            return jsonify({"success": f"Flashcard {flashcard_id} renamed to {new_name}"}), 200
        else:
            return jsonify({"error": f"Flashcard {flashcard_id} does not exist"}), 404
    except Exception as e:
        return jsonify(str(e)), 500
