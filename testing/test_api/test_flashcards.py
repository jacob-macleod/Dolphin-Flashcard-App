import sys
import os
import unittest
import pytest

from api_routes import Routes
from builders.flashcards import create_flashcard, create_flashcard_no_db
from test_api.base import BaseApiActionsMixin

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "..", "backend")
sys.path.append(src_path)

from classes.date import Date
from database.jwt_handler import JwtHandler
from routes.api.card_management import hash_to_numeric

date = Date()


class TestFlashcards(BaseApiActionsMixin):
    def test_create_folder(self, user):
        """
        Test to create a folder
        """
        # Create the user (relies on previous tests to ensure it is working)
        User1_jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        get_today_cards = {"jwtToken": User1_jwt_token}
        # Test case 1: Valid folder
        request_data = {"jwtToken": User1_jwt_token, "folder": "my_folder/folder1"}
        response = self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], request_data)
        assert response == {"success": "Folder my_folder/folder1 created"}

        # Check the folder has been created
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], get_today_cards)
        assert response == {"my_folder": {"folder1": {}}}

        # Test case 2: Create a folder with parent folder that contains data
        request_data = {"jwtToken": User1_jwt_token, "folder": "my_folder/folder2"}
        response = self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], request_data)
        assert response == {"success": "Folder my_folder/folder2 created"}

        # Check the folder has been created
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], get_today_cards)
        assert response == {"my_folder": {"folder1": {}, "folder2": {}}}

        # Test case 3: Folder which exists
        request_data = {"jwtToken": User1_jwt_token, "folder": "my_folder/folder1"}
        response = self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], request_data)
        assert response == {"success": "Folder my_folder/folder1 created"}

        # Check the folder has been created
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], get_today_cards)
        assert response == {"my_folder": {"folder1": {}, "folder2": {}}}
        # Test case 4: Invalid folder name
        request_data = {"jwtToken": User1_jwt_token, "folder": "//my_fol/der/folder2/"}
        try:
            # This should fail
            response = self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], request_data)
            assert False, "response should return error"
        except Exception:
            assert True

    def test_create_flashcard_set(self, user):
        flashcard_data = {
            "jwtToken": self.jwt_handler.encode(
                user["user_id"], user["rawToken"], user["accessToken"]
            ),
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
                user["user_id"]
                + flashcard_data["folder"]
                + flashcard_data["flashcardName"]
            ),
        }

    def test_get_flashcard_set(self, user):
        """Get the flashcard set that has been created"""
        user_1_jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )
        flashcard = create_flashcard(user["user_id"])

        flashcard_set_data = {
            "jwtToken": user_1_jwt_token,
            "flashcardID": flashcard["flashcard_id"],
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD["url"], flashcard_set_data)
        response_json = response[0]
        assert response_json == {
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
            "flashcard_id": flashcard["flashcard_id"],
        }

    def test_get_invalid_flashcard_set(self, user):
        """Get a flashcard set that does not exist"""
        flashcard_set_data = {
            "jwtToken": self.jwt_handler.encode("-1", "test", "any"),
            "flashcardID": "321123",
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD["url"], flashcard_set_data)
        response_json = response
        assert response_json == {
            "error": f"Invalid JWT token '{flashcard_set_data['jwtToken']}'"
        }

    def test_get_valid_cards(self, user):
        """Get the cards that have just been created"""
        flashcard = create_flashcard(user["user_id"])

        card_ids = [card["card_id"] for card in flashcard["cards"]]
        card_datas = [
            {"front": card["front"], "back": card["back"]}
            for card in flashcard["cards"]
        ]

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

        user_1_jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": user_1_jwt_token}
        )

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

    def test_get_all_cards_invalid_user(self, user):
        """Get the cards for a user that does not exist"""
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"],
            {
                "jwtToken": self.jwt_handler.encode(
                    user["user_id"], user["rawToken"], user["accessToken"]
                )
            },
        )
        assert response == ["User has no flashcards"]

    def test_create_set_with_no_folder(self, user):
        """
        Test to create a flashcard set where no folder needs to be created
        """
        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )
        flashcard = create_flashcard_no_db(user["user_id"], folder="")

        flashcard_data = {
            "jwtToken": jwt_token,
            "flashcardName": flashcard["flashcardName"],
            "flashcardDescription": flashcard["flashcardDescription"],
            "folder": flashcard["folder"],
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

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD["url"], flashcard_data)
        response_json = response[0]
        assert response_json == {"flashcardID": flashcard["flashcard_id"]}

        # Test the received data is as expected
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": jwt_token}
        )
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

    def test_create_set_with_no_folder_again(self, user):
        """
        Test to create a flashcard set where no folder needs to be created
        but root node already has a flashcard set.
        """
        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )
        flashcard_1 = create_flashcard(
            user["user_id"],
            folder="",
            flashcardName="My first set",
            flashcardDescription="This is my first description",
        )

        flashcard_2 = create_flashcard_no_db(
            user["user_id"],
            folder="",
            flashcardName="My second set",
            flashcardDescription="This is my second description",
        )

        # Create the flashcard set
        flashcard_data = {
            "jwtToken": jwt_token,
            "flashcardName": flashcard_2["flashcardName"],
            "flashcardDescription": flashcard_2["flashcardDescription"],
            "folder": flashcard_2["folder"],
            "cards": [
                {
                    "front": flashcard_2["cards"][0]["front"],
                    "back": flashcard_2["cards"][0]["back"],
                    "reviewStatus": flashcard_2["cards"][0]["reviewStatus"],
                    "lastReview": flashcard_2["cards"][0]["lastReview"],
                },
                {
                    "front": flashcard_2["cards"][1]["front"],
                    "back": flashcard_2["cards"][1]["back"],
                    "reviewStatus": flashcard_2["cards"][1]["reviewStatus"],
                    "lastReview": flashcard_2["cards"][1]["lastReview"],
                },
            ],
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD["url"], flashcard_data)
        response_json = response[0]
        assert response_json == {"flashcardID": flashcard_2["flashcard_id"]}

        # Test the received data is as expected
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": jwt_token}
        )
        assert response == {
            flashcard_1["flashcardName"]: {
                "cards": {
                    flashcard_1["cards"][0]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    flashcard_1["cards"][1]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": flashcard_1["flashcard_id"],
                "flashcardName": flashcard_1["flashcardName"],
            },
            flashcard_2["flashcardName"]: {
                "cards": {
                    flashcard_2["cards"][0]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    flashcard_2["cards"][1]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": flashcard_2["flashcard_id"],
                "flashcardName": flashcard_2["flashcardName"],
            },
        }

    def test_create_set_with_two_folders(self, user):
        """
        Test to create a flashcard set where 2 folders need to be created.
        Note that the userID is still 2 - this makes sure it works, even when
        there's multiple random cards in the root folder
        """
        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )
        flashcard_1 = create_flashcard(
            user["user_id"],
            folder="",
        )
        flashcard_2 = create_flashcard(
            user["user_id"],
            folder="",
        )

        flashcard_3 = create_flashcard_no_db(
            user["user_id"],
            flashcardName="Set with two folders",
            flashcardDescription="This set is within two folders",
            folder="my_folder1/my_second_folder",
        )
        # Create the flashcard set
        flashcard_data = {
            "jwtToken": jwt_token,
            "flashcardName": "Set with two folders",
            "flashcardDescription": "This set is within two folders",
            "folder": "my_folder1/my_second_folder",
            "cards": [
                {
                    "front": flashcard_3["cards"][0]["front"],
                    "back": flashcard_3["cards"][0]["back"],
                    "reviewStatus": "0.0",
                    "lastReview": "27/04/2024",
                },
                {
                    "front": flashcard_3["cards"][1]["front"],
                    "back": flashcard_3["cards"][1]["back"],
                    "reviewStatus": "0.0",
                    "lastReview": "27/04/2024",
                },
            ],
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD["url"], flashcard_data)
        response_json = response[0]
        assert response_json == {"flashcardID": flashcard_3["flashcard_id"]}

        # Test the received data is as expected
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": jwt_token}
        )
        assert response == {
            flashcard_1["flashcardName"]: {
                "cards": {
                    flashcard_1["cards"][0]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    flashcard_1["cards"][1]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": flashcard_1["flashcard_id"],
                "flashcardName": flashcard_1["flashcardName"],
            },
            flashcard_2["flashcardName"]: {
                "cards": {
                    flashcard_2["cards"][0]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    flashcard_2["cards"][1]["card_id"]: {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": flashcard_2["flashcard_id"],
                "flashcardName": flashcard_2["flashcardName"],
            },
            flashcard_3["folder"].split("/")[0]: {
                flashcard_3["folder"].split("/")[1]: {
                    flashcard_3["flashcardName"]: {
                        "cards": {
                            flashcard_3["cards"][0]["card_id"]: {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                            flashcard_3["cards"][1]["card_id"]: {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                        },
                        "flashcardID": flashcard_3["flashcard_id"],
                        "flashcardName": flashcard_3["flashcardName"],
                    }
                }
            },
        }

    def test_move_card_to_location_that_exists(self, user):
        """
        Test to move flashcard set to a new location that exists and stores folders and sets
        """
        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )
        flashcard_1 = create_flashcard(
            user["user_id"],
            folder="",
        )

        request_data = {
            "jwtToken": jwt_token,
            "currentLocation": "",
            "flashcardName": flashcard_1["flashcardName"],
            "moveLocation": "my_folder1",
        }
        response = self.post_api(Routes.ROUTE_MOVE_FLASHCARD["url"], request_data)
        assert response == {
            "success": f"The flashcard set at /users/{user['user_id']}/flashcards//{flashcard_1['flashcardName']} "
            f"has been moved to my_folder1"
        }

        # Test the received data is as expected
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": jwt_token}
        )
        assert response == {
            "my_folder1": {
                flashcard_1["flashcardName"]: {
                    "cards": {
                        flashcard_1["cards"][0]["card_id"]: {
                            "last_review": date.get_current_date(),
                            "review_status": "0.0",
                        },
                        flashcard_1["cards"][1]["card_id"]: {
                            "last_review": date.get_current_date(),
                            "review_status": "0.0",
                        },
                    },
                    "flashcardID": flashcard_1["flashcard_id"],
                    "flashcardName": flashcard_1["flashcardName"],
                },
            },
        }

    def test_move_card_to_new_location(self, user):
        """
        Test to move flashcard set to a new location that does not exist
        """
        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )
        flashcard_1 = create_flashcard(
            user["user_id"],
            folder="my_folder1",
        )

        request_data = {
            "jwtToken": jwt_token,
            "currentLocation": "my_folder1",
            "flashcardName": flashcard_1["flashcardName"],
            "moveLocation": "languages/spanish",
        }
        response = self.post_api(Routes.ROUTE_MOVE_FLASHCARD["url"], request_data)
        assert response == {
            "success": f"""The flashcard set at /users/{user['user_id']}/flashcards/my_folder1/{flashcard_1['flashcardName']} has been moved to languages/spanish"""
        }

        # Test the received data is as expected
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": jwt_token}
        )
        assert response == {
            "my_folder1": {},
            "languages": {
                "spanish": {
                    flashcard_1["flashcardName"]: {
                        "cards": {
                            flashcard_1["cards"][0]["card_id"]: {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                            flashcard_1["cards"][1]["card_id"]: {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                        },
                        "flashcardID": flashcard_1["flashcard_id"],
                        "flashcardName": flashcard_1["flashcardName"],
                    },
                },
            },
        }

    def test_move_non_existant_set(self, user):
        """
        Test to move a flashcard set that does not exist
        """
        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        request_data = {
            "jwtToken": jwt_token,
            "currentLocation": "my_invalid_folder",
            "flashcardID": "My non existant set",
            "moveLocation": "my_new_folder",
        }
        try:
            # This should return an error
            self.post_api(Routes.ROUTE_MOVE_FLASHCARD["url"], request_data)
            assert False
        except Exception:
            assert True
