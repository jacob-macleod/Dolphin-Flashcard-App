import os
import random
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "../..", "backend")
sys.path.append(src_path)

from database.database import database as db
from routes.api.card_management import hash_to_numeric


def create_flashcard_no_db(
    user_id,
    **kwargs,
):
    flashcard_dict = {
        "userID": user_id,
        "flashcardName": kwargs.get(
            "flashcardName", f"flashcardName {random.randint(-100000, 10000000)}"
        ),
        "flashcardDescription": kwargs.get(
            "flashcardDescription",
            f"flashcardDescription {random.randint(-100000, 10000000)}",
        ),
        "folder": kwargs.get(
            "folder", f"flashcardDescription {random.randint(-100000, 10000000)}"
        ),
        "cards": [
            {
                "front": f"front {random.randint(-100000, 10000000)}",
                "back": f"back {random.randint(-100000, 10000000)}",
                "reviewStatus": "0.0",
                "lastReview": "27/04/2024",
            },
            {
                "front": f"front {random.randint(-100000, 10000000)}",
                "back": f"back {random.randint(-100000, 10000000)}",
                "reviewStatus": "0.0",
                "lastReview": "27/04/2024",
            },
        ],
    }

    flashcard_id = hash_to_numeric(
        user_id + flashcard_dict["folder"] + flashcard_dict["flashcardName"]
    )
    flashcard_dict["flashcard_id"] = flashcard_id

    card_ids = []

    for card in flashcard_dict["cards"]:
        id_ = hash_to_numeric(
            user_id
            + flashcard_dict["folder"]
            + flashcard_dict["flashcardName"]
            + card["front"]
        )
        card_ids.append(id_)
        card["card_id"] = id_

    return flashcard_dict


def create_flashcard(user_id, **kwargs):
    flashcard_dict = create_flashcard_no_db(user_id, **kwargs)

    db.flashcard_set.create_flashcard_set(
        flashcard_id=flashcard_dict["flashcard_id"],
        flashcard_name=flashcard_dict["flashcardName"],
        flashcard_description=flashcard_dict["flashcardDescription"],
        card_ids=[card["card_id"] for card in flashcard_dict["cards"]],
    )

    db.flashcards.create_flashcards(
        [card["card_id"] for card in flashcard_dict["cards"]], flashcard_dict["cards"]
    )

    db.folders.add_flashcard_to_folder(
        user_id=user_id,
        folder=flashcard_dict["folder"],
        flashcard_id=flashcard_dict["flashcard_id"],
        flashcard_name=flashcard_dict["flashcardName"],
        card_ids=[card["card_id"] for card in flashcard_dict["cards"]],
    )

    # Give the user read and write access
    db.read_write_access.give_user_access(user_id, flashcard_dict["flashcard_id"])

    return flashcard_dict
