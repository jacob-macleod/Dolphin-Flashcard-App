""" Routes relating to general card management """

import uuid
from flask import Blueprint, request, jsonify
from database.database import database as db
from curl_cffi import requests
import re
import datetime
from bs4 import BeautifulSoup
from routes.api.validation_wrapper import validate_json
from routes.api.validation_wrapper import validate_form
from routes.api.regex_patterns import REVIEW_STATUS_REGEX, DATE_REGEX, QUIZLET
from classes.card_collection import FlashcardCollection
import csv
import os
import tempfile
import zipfile
import sqlite3
import json
import html
from classes.ai_flashcard_generator import FlashcardGenerator

card_management_routes = Blueprint("card_management_routes", __name__)


def hash_to_numeric(input_string):
    """Hash a string, convert it to a number, then return a string version of the number
    Importantly, this is deterministic - the same value will be returned
    every time it is hashed"""
    # Convert the input string to its
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, input_string))


CREATE_FLASHCARD_FORMAT = {
    "jwtToken": "",
    "flashcardName": "",
    "flashcardDescription": "",
    "folder": "",
    "cards": [
        {
            "front": "",
            "back": "",
            "reviewStatus": REVIEW_STATUS_REGEX,
            "lastReview": DATE_REGEX,
        }
    ],
}

CREATE_FOLDER_FORMAT = {"jwtToken": "", "folder": ""}

GET_FLASHCARD_FORMAT = {"jwtToken": "", "flashcardID": ""}

GET_PUBLIC_FLASHCARD_FORMAT = {"flashcardID": ""}

GET_FLASHCARD_ITEM = {"cardID": ""}

GET_TODAY_CARDS = {"jwtToken": ""}
GET_ALL_CARDS = GET_TODAY_CARDS

MOVE_FLASHCARD_SET = {
    "jwtToken": "",
    "currentLocation": "",
    "flashcardName": "",
    "moveLocation": "",
}

UPDATE_CARD_PROGRESS = {"jwtToken": "", "cardData": []}

DELETE_FLASHCARD_FORMAT = {"jwtToken": "", "flashcardID": ""}

RENAME_FLASHCARD_FORMAT = {"jwtToken": "", "flashcardID": "", "newName": ""}

RENAME_FOLDER_FORMAT = {"jwtToken": "", "currentName": "", "newName": ""}

DELETE_FOLDER_FORMAT = {"jwtToken": "", "folder": ""}

DELETE_CARD_FORMAT = {"jwtToken": "", "flashcardID": "", "cardID": ""}

ADD_PUBLIC_FLASHCARD_TO_FOLDER = {"jwtToken": "", "flashcardID": "", "folder": ""}

FLASHCARD_EXISTS_FORMAT = {"jwtToken": "", "flashcardID": ""}

IMPORT_FROM_CSV_FORMAT = {
    "file": "",
    "jwtToken": "",
    "flashcardName": "",
    "flashcardDescription": "",
    "folder": "",
    "delimiter": "",
    "firstRowOfData": ""
}

IMPORT_FROM_QUIZLET_FORMAT = {
    "jwtToken": "",
    "folder": "",
    "flashcards": "",
    "term_def_separator": "",
    "term_separator": "",
    "flashcard_name": "",
}

IMPORT_ANKI_FLASHCARDS_FORMAT = {
    "jwtToken": "",
    "file": "",
    "folder": "",
    "flashcardName": "",
    "flashcardDescription": "",
    "termField": "",
    "definitionField": "",
    "stripHtml": ""
}

GENERATE_AI_FLASHCARD_FORMAT = {
    "jwtToken": "",
    "flashcardPrompt": "",
    "quantity": ""
}

@card_management_routes.route("/api/create-flashcard", methods=["POST"])
@validate_json(CREATE_FLASHCARD_FORMAT)
def create_flashcard():
    """Create or edit a flashcard set for the user.
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
            card_ids=card_ids,
            user_id=user_id,
        )

        # Create each individual flashcard
        db.flashcards.create_flashcards(card_ids, cards)

        # Assign the set to the user in the folder structure
        db.folders.add_flashcard_to_folder(
            user_id=user_id,
            folder=folder,
            flashcard_id=flashcard_id,
            flashcard_name=flashcard_name,
            card_ids=card_ids,
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
    """Create a folder for the user
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

        return jsonify({"success": "Folder " + folder + " created"}), 200
    except Exception as e:
        return jsonify(str(e)), 500


@card_management_routes.route("/api/get-flashcard", methods=["GET", "POST"])
@validate_json(GET_FLASHCARD_FORMAT)
def get_flashcard():
    """Get a flashcard set based on the name and user ID
    Add json to request as in:
    {
        "userID": "my-id",
        "flashcardID": "my-flashcard-id"
    }
    """
    try:
        flashcard_id = request.json.get("flashcardID")
        user_id = request.json.get("userID")
        flashcard_data = db.folders.get_flashcard(user_id, flashcard_id)

        return jsonify(flashcard_data, 200)

    except Exception as e:
        # Return the error as a json object
        return jsonify(str(e)), 500


@card_management_routes.route("/api/get-public-flashcard", methods=["GET", "POST"])
@validate_json(GET_PUBLIC_FLASHCARD_FORMAT)
def get_public_flashcard():
    """Get a flashcard from the public repository based on the ID
    Add json to request as in:
    {
        "flashcardID": "my-flashcard-id"
    }
    """
    try:
        flashcard_id = request.json.get("flashcardID")
        flashcard_data = db.flashcard_set.get_flashcard_set(flashcard_id)

        return jsonify(flashcard_data, 200)

    except Exception as e:
        # Return the error as a json object
        return jsonify(str(e)), 500


@card_management_routes.route("/api/get-flashcard-item", methods=["GET", "POST"])
@validate_json(GET_FLASHCARD_ITEM)
def get_flashcard_item():
    """Get a flashcard item based on the card ID. Flashcard sets store
    multiple flashcard items, which are the individual flashcards
        Add json to request as in:
        {
            "cardID": "my-id"
        }
    """
    try:
        card_id = request.json.get("cardID")

        return jsonify(db.flashcards.get_flashcard(card_id), 200)

    except Exception as e:
        # Return the error as a json object
        return jsonify(str(e)), 500


@card_management_routes.route("/api/get-today-cards", methods=["POST"])
@validate_json(GET_TODAY_CARDS)
def get_today_cards():
    """Get all the flashcards to be learned today for a user
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

        db.folders.move_flashcard_set(
            user_id, flashcard_name, current_location, move_location
        )

        return (
            jsonify(
                {
                    "success": "The flashcard set at "
                    + "/users/"
                    + user_id
                    + "/flashcards/"
                    + current_location
                    + "/"
                    + flashcard_name
                    + " has been moved to "
                    + move_location
                }
            ),
            200,
        )
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
        db.statistics.increase_xp(user_id, len(card_data) * 10)

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
            return (
                jsonify({"success": f"Flashcard {flashcard_id} renamed to {new_name}"}),
                200,
            )
        else:
            return jsonify({"error": f"Flashcard {flashcard_id} does not exist"}), 404
    except Exception as e:
        return jsonify(str(e)), 500


@card_management_routes.route("/api/rename-folder", methods=["POST"])
@validate_json(RENAME_FOLDER_FORMAT)
def rename_folder():
    """
    Rename a  folder
    Example request:
    {
        "userID": "my-id",
        "currentName": "my-folder",
        "newName": "new-name"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_name = request.json.get("currentName")
        new_name = request.json.get("newName")

        result = db.folders.rename_folder(user_id, folder_name, new_name)

        if result is not None:
            return (
                jsonify({"success": f"Flashcard {folder_name} renamed to {new_name}"}),
                200,
            )
        else:
            return jsonify({"error": f"Flashcard {folder_name} does not exist"}), 404
    except Exception as e:
        return jsonify(str(e)), 500


@card_management_routes.route("/api/delete-folder", methods=["DELETE"])
@validate_json(DELETE_FOLDER_FORMAT)
def delete_folder():
    """
    Delete a folder
    Example request:
    {
        "userID": "my-id",
        "folder": "folder-name"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_name = request.json.get("folder")

        result = db.folders.delete_folder(user_id, folder_name)

        if result is not None:
            return jsonify({"success": f"Folder {folder_name} deleted"}), 200
        else:
            return jsonify({"error": f"Folder {folder_name} does not exist"}), 404
    except Exception as e:
        return jsonify(str(e)), 500


@card_management_routes.route("/api/delete-card", methods=["DELETE"])
@validate_json(DELETE_CARD_FORMAT)
def delete_card():
    """
    Delete a card
    Example request:
    {
        "userID": "my-id",
        "flashcardID": "my-flashcard-id",
        "cardID": "my-card-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        card_id = request.json.get("cardID")
        flashcard_id = request.json.get("flashcardID")

        result = db.folders.delete_individual_card(user_id, card_id)
        db.flashcard_set.delete_inidividual_card(user_id, flashcard_id, card_id)

        if result is not None:
            return jsonify({"success": f"Card {card_id} deleted"}), 200
        else:
            return jsonify({"error": f"Card {card_id} does not exist"}), 404
    except Exception as e:
        return jsonify(str(e)), 500


@card_management_routes.route("/api/search", methods=["POST"])
def search_flashcard():
    """
    Search for a flashcard set by name
    Example request:
    {
        "flashcardName": "my-flashcard-name"
    }
    """
    try:
        flashcard_name = request.args.get("name")

        results = db.flashcard_set.search_flashcard(flashcard_name)

        return jsonify(results), 200
    except Exception as e:
        return jsonify(str(e)), 500


@card_management_routes.route("/api/add-flashcard-to-folder", methods=["POST"])
@validate_json(ADD_PUBLIC_FLASHCARD_TO_FOLDER)
def add_public_flashcard_to_folder():
    """
    Add a public flashcard to a folder
    Example request:
    {
        "userID": "my-id",
        "flashcardID": "my-flashcard-id",
        "folder": "folder-name"
    }
    """
    try:
        user_id = request.json.get("userID")
        flashcard_id = request.json.get("flashcardID")
        folder = request.json.get("folder")

        flashcard_data = db.flashcard_set.get_flashcard_set(flashcard_id)

        if flashcard_data is None:
            return {"error": f"Flashcard {flashcard_id} does not exist!"}, 404

        db.folders.add_flashcard_to_folder(
            user_id,
            folder,
            flashcard_id,
            flashcard_data["name"],
            flashcard_data["cards"],
        )

        return (
            jsonify(
                {
                    "success": f"Flashcard '{flashcard_data['name']}' added to folder {folder}"
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify(str(e)), 500


@card_management_routes.route("/api/flashcard-exists", methods=["POST"])
@validate_json(FLASHCARD_EXISTS_FORMAT)
def flashcard_exists():
    """
    Check if a flashcard exists
    Example request:
    {
        "userID": "my-id",
        "flashcardID": "my-flashcard-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        flashcard_id = request.json.get("flashcardID")

        result = db.folders.flashcard_exists(user_id, flashcard_id)

        return jsonify(result), 200
    except Exception as e:
        return jsonify(str(e)), 500


# @card_management_routes.route("/api/import-from-quizlet", methods=["POST"])
# @validate_json(QUIZLET_IMPORT_FORMAT)
# def import_from_quizlet():
#     """Import flashcards from a Quizlet URL.

#     Expected request format:
#     {
#         "userID": "my-id",
#         "folder": "folder-name",
#         "quizlet_url": "https://quizlet.com/..."
#     }
#     """
#     try:
#         user_id = request.json.get("userID")
#         folder = request.json.get("folder")
#         quizlet_url = request.json.get("quizlet_url")
#         folders =  db.folders.get_user_data(user_id)
#          # Assuming this method exists
#         if not folders:
#             return jsonify({"error": "Folder does not exist" + folder}), 404
#         found = None
#         for folder_name in folders.keys():
#             if folder == folder_name:
#                 found = folder
#                 break
#         if not found:
#             return jsonify({"error": "Folder does not exist" + folder}), 404

#        # Check if URL is valid and accessible
#         try:
#             html_content = requests.get(url=quizlet_url, impersonate="chrome")
#             html_content.raise_for_status()

#             if not html_content.content:
#                 return jsonify({"error": "Invalid or inaccessible Quizlet URL"}), 400

#             soup = BeautifulSoup(html_content.content, features='html.parser')

#             if not soup or not soup.title:
#                 return jsonify({"error": "Invalid or inaccessible Quizlet URL"}), 400

#             flashcard_name = soup.title.text

#             if not flashcard_name:
#                 return jsonify({"error": "Invalid or inaccessible Quizlet URL"}), 400

#             flashcard_description = ""
#             desc_div = soup.find('div', class_='dcgy0px')
#             if desc_div:
#                 flashcard_description = desc_div.get_text()

#         except (requests.exceptions.RequestException, AttributeError) as e:
#             return jsonify({"error": "Invalid or inaccessible Quizlet URL"}), 400

#         #find all term-definition matches from parsed data

#         matches = re.findall(QUIZLET, str(soup), re.DOTALL)
#         flashcards = {}

#         cards = []
#         #create cards based on term-definition data
#         for term, definition in matches:
#             definition = definition.replace('<br/>', '').replace('<br>', '').replace('<br />', '')
#             cards.append({
#                 "front": term,
#                 "back": definition
#             })
#             flashcards[term] = definition

#         flashcard_id = hash_to_numeric(user_id + folder + flashcard_name)

#         flashcard_exists = db.folders.flashcard_exists(user_id, flashcard_id)

#         if flashcard_exists:
#             return jsonify({"error": "Flashcard set name already exists"}), 400

#         # Generate the card_ids
#         card_ids = [
#             hash_to_numeric(user_id + folder + flashcard_name + card["front"])
#             for card in cards
#         ]

#         # Create the flashcard set
#         db.flashcard_set.create_flashcard_set(
#             flashcard_id=flashcard_id,
#             flashcard_name=flashcard_name,
#             flashcard_description=flashcard_description,
#             card_ids=card_ids,
#             user_id=user_id,
#         )

#         # Create each individual flashcard
#         db.flashcards.create_flashcards(card_ids, cards)

#         # Assign the set to the user in the folder structure
#         db.folders.add_flashcard_to_folder(
#             user_id=user_id,
#             folder=folder,
#             flashcard_id=flashcard_id,
#             flashcard_name=flashcard_name,
#             card_ids=card_ids,
#         )

#         # Give the user read and write access
#         db.read_write_access.give_user_access(user_id, flashcard_id)

#         return jsonify({"success": "Flashcards imported from Quizlet"}), 200
#     except Exception as e:
#         return jsonify(str(e)), 500


@card_management_routes.route("/api/import-from-quizlet", methods=["POST"])
@validate_json(IMPORT_FROM_QUIZLET_FORMAT)
def import_from_quizlet():
    """
    Add a copied quizlet flashcard set to a folder.
    Example request:
    {
        "userID": "my-id",
        "folder": "folder-name",
        "flashcards_string": "copied flashcard data from quizlet",
        "term_def_separator": "sperator between term and definition",
        "term_separator": "seperator between terms definition pairs",
        "flashcard_name": "Name of flashcard set"
    }

    """
    try:
        user_id = request.json.get("userID")
        folder = request.json.get("folder")
        flashcards_string = request.json.get("flashcards")
        term_def_separator = request.json.get("term_def_separator")
        term_separator = request.json.get("term_separator")
        flashcard_name = request.json.get("flashcard_name")

        # Split flashcards string into individual cards
        cards = []

        # Check if the flashcards string contains valid flashcards
        if term_separator not in flashcards_string:
            return jsonify({"error": "No valid flashcards found"}), 400

        # parse flashcards into term-definition pairs
        flashcard_pairs = flashcards_string.split(term_separator)

        for pair in flashcard_pairs:
            if term_def_separator in pair:
                term, definition = pair.split(term_def_separator, 1)
                if term and definition:
                    cards.append({"front": term.strip(), "back": definition.strip()})

            elif cards:
                if pair and pair == flashcard_pairs[-1]:
                    return jsonify({"error": "Invalid flashcard format"}), 400
                cards[-1]["back"] += term_separator + pair.strip()

        if not cards:
            return jsonify({"error": "No valid flashcards found"}), 400
        # Generate a unique flashcard set name
        flashcard_id = hash_to_numeric(user_id + folder + flashcard_name)

        # Check if the flashcard set already exists
        flashcard_exists = db.folders.flashcard_exists(user_id, flashcard_id)
        if flashcard_exists:
            return jsonify({"error": "Flashcard set name already exists"}), 400

        # Generate the card_ids
        card_ids = [
            hash_to_numeric(user_id + folder + flashcard_name + card["front"])
            for card in cards
        ]

        # Create the flashcard set
        db.flashcard_set.create_flashcard_set(
            flashcard_id=flashcard_id,
            flashcard_name=flashcard_name,
            flashcard_description="Imported from Quizlet",
            card_ids=card_ids,
            user_id=user_id,
        )

        # Create each individual flashcard
        db.flashcards.create_flashcards(card_ids, cards)

        # Assign the set to the user in the folder structure
        db.folders.add_flashcard_to_folder(
            user_id=user_id,
            folder=folder,
            flashcard_id=flashcard_id,
            flashcard_name=flashcard_name,
            card_ids=card_ids,
        )

        # Give the user read and write access
        db.read_write_access.give_user_access(user_id, flashcard_id)

        return (
            jsonify(
                {
                    "success": "Flashcards imported successfully",
                    "flashcard_id": flashcard_id,
                    "flashcard_name": flashcard_name,
                    "card_count": len(cards),
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@card_management_routes.route("/api/import-flashcards", methods=["POST"])
@validate_form(IMPORT_FROM_CSV_FORMAT)
def import_flashcards(user_id):
    """Import flashcards from a CSV file.

    Expected request format:
    - multipart/form-data with:
        - file: CSV file with columns 'term' and 'definition'
        - userID: my-id
        - folder: Folder path to store flashcards
        - delimiter: CSV delimiter (default: ',')
        - flashcardName: Name for the flashcard set
        - flashcardDescription: Description for the flashcard set (optional)
        - firstRowOfData: Defines the first row that the data is stored on.
    """
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]

        folder = request.form.get("folder")
        delimiter = request.form.get("delimiter")
        flashcard_name = request.form.get("flashcardName")
        flashcard_description = request.form.get("flashcardDescription")
        first_row_of_data = request.form.get("firstRowOfData", 2)

        cards = []
        content = file.stream.read().decode("utf-8")
        reader = csv.reader(content.splitlines(), delimiter=",")

        # Skipping to the row having the data
        for _ in range(int(first_row_of_data) - 1):
            next(reader)

        for row in reader:
            term, definition = row
            cards.append({"front": term, "back": definition})

        # A hashed version of the userID and flashcard name
        flashcard_id = hash_to_numeric(user_id + folder + flashcard_name)

        flashcard_exists = db.folders.flashcard_exists(user_id, flashcard_id)
        if flashcard_exists:
            return jsonify({"error": "Flashcard set name already exists"}), 400

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
            card_ids=card_ids,
            user_id=user_id,
        )

        # Create each individual flashcard
        db.flashcards.create_flashcards(card_ids, cards)

        # Assign the set to the user in the folder structure
        db.folders.add_flashcard_to_folder(
            user_id=user_id,
            folder=folder,
            flashcard_id=flashcard_id,
            flashcard_name=flashcard_name,
            card_ids=card_ids,
        )

        # Give the user read and write access
        db.read_write_access.give_user_access(user_id, flashcard_id)

        return jsonify({"flashcardID": flashcard_id}, 200)
    except Exception as e:
        return jsonify(str(e)), 500

@card_management_routes.route("/api/import-anki-flashcards", methods=["POST"])
@validate_form(IMPORT_ANKI_FLASHCARDS_FORMAT)
def import_anki_flashcards(user_id):
    """Import flashcards from an Anki .apkg file with enhanced parsing"""
    try:
        # Validate file upload
        file = request.files.get("file")
        if not file:
            return jsonify({'error': 'No file uploaded'}, 400)

        # Extract form parameters with default values
        folder = request.form.get("folder", "")
        flashcard_name = request.form.get("flashcardName")
        flashcard_description = request.form.get("flashcardDescription", "")
        term_field = request.form.get("termField", "Front")
        definition_field = request.form.get("definitionField", "Back")
        strip_html = request.form.get("stripHtml", "true").lower() == "true"

        # Validate required parameters
        if not flashcard_name:
            return jsonify({'error': 'Missing flashcard name'}, 400)

        # Regex for cleaning media and HTML content
        media_regex = re.compile(
            r'<.*?>|'          # HTML tags
            r'\[sound:.*?\]|'  # Anki sound references
            r'\[image:.*?\]|'  # Anki image references
            r'\{\{c\d+::.*?\}\}'  # Cloze deletions
        )

        # Create temporary directory for file processing
        with tempfile.TemporaryDirectory() as tmpdir:
            # Save and extract Anki package
            apkg_path = os.path.join(tmpdir, 'deck.apkg')
            file.save(apkg_path)
            
            try:
                with zipfile.ZipFile(apkg_path, 'r') as zip_ref:
                    zip_ref.extractall(tmpdir)
            except zipfile.BadZipFile:
                return jsonify({'error': 'Invalid Anki package file'}, 400)

            # Find newest collection file
            collection_files = sorted(
                [f for f in os.listdir(tmpdir) if f.startswith('collection')],
                reverse=True
            )
            if not collection_files:
                return jsonify({'error': 'Invalid Anki file format'}, 400)
            
            # Connect to SQLite database
            try:
                conn = sqlite3.connect(os.path.join(tmpdir, collection_files[0]))
                cursor = conn.cursor()

                # Get model configuration
                cursor.execute("SELECT models FROM col")
                models_data = cursor.fetchone()
                models = json.loads(models_data[0]) if models_data else {}
                conn.close()
            except (sqlite3.Error, json.JSONDecodeError) as db_error:
                print(f"Database connection error: {db_error}")
                return jsonify({'error': 'Failed to read Anki database'}, 500)

            # Process cards
            cards = []
            try:
                conn = sqlite3.connect(os.path.join(tmpdir, collection_files[0]))
                cursor = conn.cursor()
                cursor.execute('SELECT notes.id, notes.mid, notes.flds, notes.sfld FROM notes')
                
                for note_id, model_id, flds_str, sfld in cursor.fetchall():
                    try:
                        model = models.get(str(model_id), {})
                        field_names = [f['name'] for f in model.get('flds', [])]
                        separator = model.get('separator', '\x1f')
                        fields = flds_str.split(separator) if flds_str else []

                        # Map fields by name or index
                        field_values = {}
                        for i, name in enumerate(field_names):
                            field_values[name] = fields[i] if i < len(fields) else ""
                        
                        # Get term/definition using field names or indices
                        term = field_values.get(term_field) if term_field in field_values else (
                            fields[int(term_field)] if term_field.isdigit() and int(term_field) < len(fields) else sfld or ""
                        )
                        definition = field_values.get(definition_field) if definition_field in field_values else (
                            fields[int(definition_field)] if definition_field.isdigit() and int(definition_field) < len(fields) else ""
                        )

                        # Clean content
                        if strip_html:
                            term = media_regex.sub('', html.unescape(term)).strip()
                            definition = media_regex.sub('', html.unescape(definition)).strip()

                        # Validate required fields
                        if not term and not definition:
                            continue
                        if not term:
                            term = "[Empty Front]"
                        if not definition:
                            definition = "[Empty Back]"

                        cards.append({
                            "front": term,
                            "back": definition
                        })
                    except Exception as card_error:
                        print(f"Error processing individual card: {card_error}")
                        continue

                conn.close()
            except Exception as processing_error:
                print(f"Error during card processing: {processing_error}")
                return jsonify({'error': 'Failed to process Anki cards'}, 500)

            # Validate cards
            if not cards:
                return jsonify({
                    'error': 'No valid flashcards found. Possible reasons:\n'
                             '1. Incorrect field selection\n'
                             '2. All content was removed during HTML stripping\n'
                             '3. Unsupported Anki note type'
                }), 400

            # Prepare database operations
            try:
                # Generate unique flashcard ID
                flashcard_id = hash_to_numeric(user_id + folder + flashcard_name)
                
                # Check if flashcard set already exists
                if db.folders.flashcard_exists(user_id, flashcard_id):
                    return jsonify({"error": "Flashcard set name already exists"}, 400)

                # Generate card IDs
                card_ids = [
                    hash_to_numeric(user_id + folder + flashcard_name + card["front"])
                    for card in cards
                ]

                # Detailed logging of database operations
                print(f"Creating flashcard set: {flashcard_id}")
                db.flashcard_set.create_flashcard_set(
                    flashcard_id=flashcard_id,
                    flashcard_name=flashcard_name,
                    flashcard_description=flashcard_description,
                    card_ids=card_ids,
                    user_id=user_id,
                )

                print(f"Creating {len(cards)} flashcards")
                db.flashcards.create_flashcards(card_ids, cards)

                print(f"Adding flashcards to folder: {folder}")
                db.folders.add_flashcard_to_folder(
                    user_id=user_id,
                    folder=folder,
                    flashcard_id=flashcard_id,
                    flashcard_name=flashcard_name,
                    card_ids=card_ids,
                )

                print("Giving user access")
                db.read_write_access.give_user_access(user_id, flashcard_id)

                # Success response
                print(f"Successfully imported flashcard set: {flashcard_id}")
                return jsonify({"flashcardID": flashcard_id}, 200)

            except Exception as db_operation_error:
                # Comprehensive error logging
                import traceback
                print("Database operation error:")
                print(f"Error type: {type(db_operation_error)}")
                print(f"Error details: {str(db_operation_error)}")
                traceback.print_exc()

                return jsonify({
                    "error": "Anki import processing failed", 
                    "details": str(db_operation_error)
                }, 500)

    except Exception as unexpected_error:
        # Catch any unexpected errors
        import traceback
        print("Unexpected error during Anki import:")
        print(f"Error type: {type(unexpected_error)}")
        print(f"Error details: {str(unexpected_error)}")
        traceback.print_exc()

        return jsonify({
            "error": "Unexpected error during Anki import", 
            "details": str(unexpected_error)
        }, 500)

@card_management_routes.route("/api/generate-ai-flashcard", methods=["POST"])
@validate_json(GENERATE_AI_FLASHCARD_FORMAT)
def generate_ai_flashcard():
    """
    Import flashcards from a CSV file.
    """
    try:
        generator = FlashcardGenerator()
        topic = request.get_json()["flashcardPrompt"]
        num_of_cards = request.get_json()["quantity"]
        flashcard = generator.generate_flashcard(topic, num_of_cards)

        return flashcard
    except Exception as e:
        return jsonify(str(e)), 500
