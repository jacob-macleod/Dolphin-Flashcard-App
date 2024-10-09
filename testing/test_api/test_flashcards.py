import sys
import os
import unittest
import pytest

from testing.api_routes import Routes
from testing.builders.flashcards import create_flashcard, create_flashcard_no_db
from testing.test_api.base import BaseApiActionsMixin

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "..", "backend")
sys.path.append(src_path)

from classes.date import Date
from database.jwt_handler import JwtHandler
from routes.api.card_management import hash_to_numeric

date = Date()


class TestFlashcards(unittest.TestCase, BaseApiActionsMixin):
    @property
    def jwt_handler(self):
        return JwtHandler()

    def test_create_flashcard_set(self, user):
        flashcard_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], "test", "any"),
            "flashcardName": "My new set",
            "flashcardDescription": "This is\nmy description",
            "folder": "parent-name",
            "cards": [
                {
                    "front": "Front 1",
                    "back": "Back 1",
                    "reviewStatus": "0.0",
                    "lastReview": "27/04/2024",
                },
                {
                    "front": "Front 2",
                    "back": "Back 2",
                    "reviewStatus": "0.0",
                    "lastReview": "27/04/2024",
                },
            ],
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD["url"], flashcard_data)
        response_json = response[0]
        assert response_json == {
            "flashcardID": hash_to_numeric(
                user["user_id"] + flashcard_data["folder"] + flashcard_data["flashcardName"]),
        }

    def test_get_flashcard_set(self, user):
        """Get the flashcard set that has been created"""
        user_1_jwt_token = self.jwt_handler.encode(user["user_id"], "test", "any")
        flashcard = create_flashcard(user["user_id"])

        flashcard_set_data = {
            "jwtToken": user_1_jwt_token,
            "flashcardID": flashcard["flashcard_id"]
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD["url"], flashcard_set_data)
        response_json = response[0]
        assert response_json == {
            'cards': {
                flashcard["cards"][0]["card_id"]: {
                    'last_review': date.get_current_date(), 'review_status': '0.0'
                },
                flashcard["cards"][1]["card_id"]: {
                    'last_review': date.get_current_date(), 'review_status': '0.0'
                }
            },
            'flashcard_id': flashcard["flashcard_id"]
        }

    def test_get_invalid_flashcard_set(self, user):
        """Get a flashcard set that does not exist"""
        flashcard_set_data = {
            "jwtToken": self.jwt_handler.encode("-1", "test", "any"),
            "flashcardID": "321123"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD["url"], flashcard_set_data)
        response_json = response[0]
        assert response_json is None

    def test_get_valid_cards(self, user):
        """Get the cards that have just been created"""
        flashcard = create_flashcard(user["user_id"])

        card_ids = [card["card_id"] for card in flashcard["cards"]]
        card_datas = [{"front": card["front"], "back": card["back"]} for card in flashcard["cards"]]

        for index, card_id in enumerate(card_ids):
            response = self.get_api(
                Routes.ROUTE_GET_FLASHCARD_ITEM["url"], {"cardID": card_id}
            )
            response_json = response[0]
            assert response_json == card_datas[index]

    def test_get_invalid_card_ids(self, user):
        """Get a card which does not exist"""
        response = self.get_api(
            Routes.ROUTE_GET_FLASHCARD_ITEM["url"], {"cardID": "-1"}
        )
        response_json = response[0]
        assert response_json is None

    def test_get_all_cards(self, user):
        """Get the newly created cards"""
        flashcard = create_flashcard(user["user_id"])

        user_1_jwt_token = self.jwt_handler.encode(user["user_id"], "test", "any")
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": user_1_jwt_token})


        assert response == {
            flashcard["folder"]: {
                flashcard["flashcardName"]: {
                    "cards": {
                        flashcard["cards"][0]["card_id"]: {
                            "last_review": date.get_current_date(),
                            "review_status": "0.0",
                        },
                        flashcard["cards"][1]["card_id"]: {
                            "last_review": date.get_current_date(),
                            "review_status": "0.0",
                        },
                    },
                    "flashcardID": flashcard["flashcard_id"],
                    "flashcardName": flashcard["flashcardName"],
                }
            }
        }

    def test_get_all_cards_invalid_user(self):
        """Get the cards for a user that does not exist"""
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"], {
                "jwtToken": self.jwt_handler.encode("-1", "test", "any")
            }
        )
        assert response == ["User has no flashcards"]

    def test_create_set_with_no_folder(self, user):
        """
        Test to create a flashcard set where no folder needs to be created
        """
        jwt_token = self.jwt_handler.encode(user["user_id"], "test", "any"),
        flashcard = create_flashcard_no_db(user["user_id"])

        # Create the flashcard set
        flashcard_data = {
            "jwtToken": jwt_token,
            "flashcardName": flashcard["flashcardName"],
            "flashcardDescription": flashcard["flashcardDescription"],
            "folder": "",
            "cards": [
                {
                    "front": flashcard["cards"][0]["front"],
                    "back": flashcard["cards"][0]["back"],
                    "reviewStatus": flashcard["cards"][0]["reviewStatus"],
                    "lastReview": flashcard["cards"][0]["lastReview"],
                },
                {
                    "front": flashcard["cards"][1]["front"],
                    "back": flashcard["cards"][1]["back"],
                    "reviewStatus": flashcard["cards"][1]["reviewStatus"],
                    "lastReview": flashcard["cards"][1]["lastReview"],
                },
            ],
        }

        flashcard["flashcard_id"] = hash_to_numeric(
            user["user_id"] + flashcard_data["folder"] + flashcard_data["flashcardName"]
        )

        for card in flashcard["cards"]:
            card["card_id"] = hash_to_numeric(
                user["user_id"] + flashcard_data["folder"] + flashcard_data["flashcardName"] + card["front"]
            )

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD["url"], flashcard_data)
        response_json = response[0]
        assert response_json == {"flashcardID": flashcard["flashcard_id"]}

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": jwt_token})
        assert response == {
            flashcard["flashcardName"]: {
                "cards": {
                    flashcard["cards"][0]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    flashcard["cards"][1]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": flashcard["flashcard_id"],
                "flashcardName": flashcard["flashcardName"],
            },
        }