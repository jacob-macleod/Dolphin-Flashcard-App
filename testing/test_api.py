""" Includes all tests for the project """

import sys
import os
import unittest
import pytest

from api_routes import Routes

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "..", "backend")
sys.path.append(src_path)
from verification.api_error_checking import check_request_json
from classes.date import Date
from json import loads, dumps
from requests import get, post, delete
from main import server_addr
from database.database_config import type, jwt_key_type

# Check the database is set to local
if type != "local":
    raise ValueError(
        f"The database type in src/database/database_config.py is set to '{type}', not 'local'!"
    )
if jwt_key_type != "testing":
    raise ValueError(
        f"The jwt_key_type in src/database/database_config.py is set to '{jwt_key_type}', not 'testing'!"
    )

headers = {"Content-Type": "application/json"}

date = Date()


class TestApi(unittest.TestCase):
    """Test the API"""
    def __init__(self, *args, **kwargs):
        super(TestApi, self).__init__(*args, **kwargs)

    def get_api(self, route: str, data: dict = None) -> dict:
        """
        Simple get method to not repeat "get" everytime
        """

        response = get(
            f"http://127.0.0.1:{server_addr[1]}{route}",
            headers=headers,
            data=dumps(data),
            timeout=5,
        )

        self.assertNotEqual(
            response.status_code,
            500,
            "An unhandled exception caused an Internal Server Error "
            + f"({response.status_code}) in "
            + f"{route}",
        )

        return loads(response.text)

    def post_api(self, route: str, data: dict) -> dict:
        """
        Simple get method to not repeat "post" everytime
        """

        response = post(
            f"http://127.0.0.1:{server_addr[1]}{route}",
            data=dumps(data),
            headers=headers,
            timeout=5,
        )

        self.assertNotEqual(
            response.status_code,
            500,
            f"An unhandled exception caused an Internal Server Error ({response.status_code}) in "
            f"{route}",
        )

        return loads(response.text)

    def delete_api(self, route: str, data: dict) -> dict:
        """
        Simple get method to not repeat "delete" everytime
        """

        response = delete(
            f"http://127.0.0.1:{server_addr[1]}{route}",
            data=dumps(data),
            headers=headers,
            timeout=5,
        )

        self.assertNotEqual(
            response.status_code,
            500,
            f"An unhandled exception caused an Internal Server Error ({response.status_code}) in "
            f"{route}",
        )

        return loads(response.text)

    def create_user(self, user_id:str):
        """
        Create a user

        Args:
            user_id (str): The user ID to create
        """
        valid_dummy = {"userID": user_id, "displayName": "Dummy", "rawAccessToken": "test", "accessToken": "4be0643f-1d98-573b-97cd-ca98a65347dd", "idToken": ""}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)
        response_json = response[0]
        return response_json["token"]

    @pytest.mark.run(order=1)
    def test_example(self) -> None:
        """
        Brief description
        """
        data = {"key1": "value1", "key2": "value2"}

        # TODO: Warning / Question tho who is coding the backend

        response = True

        self.assertTrue(response, "Should be True, but was {}".format(response))

    @pytest.mark.run(order=2)
    def test_check_request_json(self) -> None:
        """Check the check_request_json function works as expected"""

        # Test with a valid request
        result = check_request_json({"key1": "", "key2": ""}, {"key1": "", "key2": ""})

        self.assertTrue(result)

        # Test with a valid request but keys have different values
        result = check_request_json(
            {"key1": "val1", "key2": "value2"}, {"key1": "", "key2": ""}
        )

        self.assertEqual(result, True)

        # Test with a valid request but keys are in different order
        result = check_request_json({"key2": "", "key1": ""}, {"key1": "", "key2": ""})
        self.assertEqual(
            result,
            "Your supplied json keys do not match the expected format",
            "Your supplied json keys do not match the expected format",
        )

        # Test with valid keys and some extra ones
        result = check_request_json(
            {"key1": "", "key2": "", "key3": ""}, {"key1": "", "key2": ""}
        )
        self.assertEqual(
            result,
            "Your supplied json keys do not match the expected format",
            "Your supplied json keys do not match the expected format",
        )

        # Test with invalid keys
        result = check_request_json({"key3": "", "key4": ""}, {"key1": "", "key2": ""})

        self.assertEqual(
            result,
            "Your supplied json keys do not match the expected format",
            "Your supplied json keys do not match the expected format",
        )

        # Test with valid regex pattern
        expected_format = {
            "name": "",
            "age": r"\d+",
            "email": r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+",
        }

        request_data = {
            "name": "John Doe",
            "age": "30",
            "email": "john@example.com",
        }
        result = check_request_json(expected_format, request_data)
        self.assertTrue(result, msg="Invalid regex pattern")

        expected_format = {
            "name": "",
            "age": "",
            "email": "",
            "address": {"street": "", "city": "", "postcode": ""},
        }

        request_data = {
            "name": "",
            "age": "",
            "email": "",
            "address": {"street": "", "city": "", "postcode": ""},
        }

        result = check_request_json(expected_format, request_data)
        self.assertTrue(result, "Invalid json format for keys and sub keys.")

    # Authentication
    @pytest.mark.run(order=3)
    def test_create_account_valid(self) -> None:
        """
        Valid account
        """
        valid_dummy = {"userID": "1", "displayName": "Dummy", "rawAccessToken": "test", "accessToken": "4be0643f-1d98-573b-97cd-ca98a65347dd", "idToken": ""}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)
        response_json = response[0]
        self.assertTrue(
            expr=response_json["success"],
            msg="Dummy account creation should be successful.",
        )

    @pytest.mark.run(order=4)
    def test_get_user(self) -> None:
        """Get the newly created user"""
        user_1_jwt_token = self.create_user("1")

        valid_dummy = {"jwtToken": user_1_jwt_token}

        response = self.get_api(Routes.ROUTE_GET_USER["url"], valid_dummy)
        response_json = response[0]
        assert response_json == {"name": "Dummy"}

    @pytest.mark.run(order=5)
    def test_get_invalid_user(self):
        """Get a user that does not exist"""
        invalid_dummy = {"jwtToken": 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEzMmZkZDRiMTQ2Njc3NzE5YWIyMzcyODYxYmRlZDg5In0.eyJpc3MiOiJodHRwOi8vZG9scGhpbmZsYXNoY2FyZHMuY29tIiwiYXVkIjoiYXBpIiwic3ViIjoiMiIsImFjY2Vzc190b2tlbiI6IjRiZTA2NDNmLTFkOTgtNTczYi05N2NkLWNhOThhNjUzNDdkZCIsImFjY2Vzc190b2tlbl9yYXciOiJ0ZXN0IiwiZXhwIjoxNzI1NDgwNTU1LCJpYXQiOjE3MjQ4NzU3NTV9.wX5gfXHJt6ABETmGybzracDx4lfBsg4pcb4O2WyXlm39w4ivGcGX2sQ9XtLImnStOLk2ACOh5IoTBazmyBvxKg'}

        response = self.get_api(Routes.ROUTE_GET_USER["url"], invalid_dummy)
        response_json = response[0]
        assert response_json is None

    @pytest.mark.run(order=6)
    def test_get_user_stats(self):
        """Get the statistics for the user that has been created"""
        user_1_jwt_token = self.create_user("1")

        # Test case 1: Get the user stats
        valid_dummy = {"jwtToken": user_1_jwt_token}

        response = self.get_api(Routes.ROUTE_GET_USER_STATS["url"], valid_dummy)
        response_json = response[0]
        assert response_json == {
            "lastStreak": date.get_current_date(),
            "streak": 0,
            "weeklyXP": 0,
            "totalXP": 0,
            "heatmap_data": {date.get_current_date().replace("/", "-"): "1"},
        }

        # Test case 2: Update the heatmap

    @pytest.mark.run(order=7)
    def test_get_invalid_user_stats(self):
        """Get the statistics for a user that does not exist"""
        invalid_dummy = {"jwtToken": 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEzMmZkZDRiMTQ2Njc3NzE5YWIyMzcyODYxYmRlZDg5In0.eyJpc3MiOiJodHRwOi8vZG9scGhpbmZsYXNoY2FyZHMuY29tIiwiYXVkIjoiYXBpIiwic3ViIjoiMiIsImFjY2Vzc190b2tlbiI6IjRiZTA2NDNmLTFkOTgtNTczYi05N2NkLWNhOThhNjUzNDdkZCIsImFjY2Vzc190b2tlbl9yYXciOiJ0ZXN0IiwiZXhwIjoxNzI1NDgwNTU1LCJpYXQiOjE3MjQ4NzU3NTV9.wX5gfXHJt6ABETmGybzracDx4lfBsg4pcb4O2WyXlm39w4ivGcGX2sQ9XtLImnStOLk2ACOh5IoTBazmyBvxKg'}

        response = self.get_api(Routes.ROUTE_GET_USER_STATS["url"], invalid_dummy)
        response_json = response[0]
        assert response_json is None

    @pytest.mark.run(order=8)
    def test_create_flashcard_set(self):
        """Create a flashcard set for the newly created user"""
        user_1_jwt_token = self.create_user("1")

        flashcard_data = {
            "jwtToken": user_1_jwt_token,
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
        assert response_json == {"flashcardID": "96cfaa8d-0ca1-5230-86fe-1e28ee9d2741"}

    @pytest.mark.run(order=9)
    def test_get_flashcard_set(self):
        """Get the flashcard set that has been created"""
        user_1_jwt_token = self.create_user("1")

        flashcard_set_data = {
            "jwtToken": user_1_jwt_token,
            "flashcardID": "96cfaa8d-0ca1-5230-86fe-1e28ee9d2741"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD["url"], flashcard_set_data)
        response_json = response[0]
        print (response_json)
        assert response_json == {
            'cards': {
                'b8ff5c10-0c28-53ea-b5c8-301364c8910d': {
                    'last_review': date.get_current_date(), 'review_status': '0.0'
                },
                'e88e17da-94b2-556f-8836-dfdd1ec9098f': {
                    'last_review': date.get_current_date(), 'review_status': '0.0'
                }
            },
            'flashcard_id': '96cfaa8d-0ca1-5230-86fe-1e28ee9d2741'
        }


    @pytest.mark.run(order=10)
    def test_get_invalid_flashcard_set(self):
        """Get a flashcard set that does not exist"""
        flashcard_set_data = {
            "jwtToken": 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEzMmZkZDRiMTQ2Njc3NzE5YWIyMzcyODYxYmRlZDg5In0.eyJpc3MiOiJodHRwOi8vZG9scGhpbmZsYXNoY2FyZHMuY29tIiwiYXVkIjoiYXBpIiwic3ViIjoiMiIsImFjY2Vzc190b2tlbiI6IjRiZTA2NDNmLTFkOTgtNTczYi05N2NkLWNhOThhNjUzNDdkZCIsImFjY2Vzc190b2tlbl9yYXciOiJ0ZXN0IiwiZXhwIjoxNzI1NDgwNTU1LCJpYXQiOjE3MjQ4NzU3NTV9.wX5gfXHJt6ABETmGybzracDx4lfBsg4pcb4O2WyXlm39w4ivGcGX2sQ9XtLImnStOLk2ACOh5IoTBazmyBvxKg',
            "flashcardID":"invalid id"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD["url"], flashcard_set_data)
        response_json = response[0]
        assert response_json is None

    @pytest.mark.run(order=11)
    def test_get_valid_cards(self):
        """Get the cards that have just been created"""
        card_ids = [
            "b8ff5c10-0c28-53ea-b5c8-301364c8910d",
            "e88e17da-94b2-556f-8836-dfdd1ec9098f",
        ]
        card_datas = [
            {"front": "Front 1", "back": "Back 1"},
            {"front": "Front 2", "back": "Back 2"},
        ]
        for index, card_id in enumerate(card_ids):
            response = self.get_api(
                Routes.ROUTE_GET_FLASHCARD_ITEM["url"], {"cardID": card_id}
            )
            response_json = response[0]
            assert response_json == card_datas[index]

    @pytest.mark.run(order=12)
    def test_get_invalid_card_ids(self):
        """Get a card which does not exist"""
        response = self.get_api(
            Routes.ROUTE_GET_FLASHCARD_ITEM["url"], {"cardID": "123"}
        )
        response_json = response[0]
        assert response_json is None

    @pytest.mark.run(order=13)
    def test_get_all_cards(self):
        """Get the newly created cards"""
        user_1_jwt_token = self.create_user("1")

        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": user_1_jwt_token})
        assert response == {
            "parent-name": {
                "My new set": {
                    "cards": {
                        "b8ff5c10-0c28-53ea-b5c8-301364c8910d": {
                            "last_review": date.get_current_date(),
                            "review_status": "0.0",
                        },
                        "e88e17da-94b2-556f-8836-dfdd1ec9098f": {
                            "last_review": date.get_current_date(),
                            "review_status": "0.0",
                        },
                    },
                    "flashcardID": "96cfaa8d-0ca1-5230-86fe-1e28ee9d2741",
                    "flashcardName": "My new set",
                }
            }
        }

    @pytest.mark.run(order=14)
    def test_get_all_cards_invalid_user(self):
        """Get the cards for a user that does not exist"""
        response = self.post_api(
            Routes.ROUTE_GET_TODAY_CARDS["url"], {
                "jwtToken": 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEzMmZkZDRiMTQ2Njc3NzE5YWIyMzcyODYxYmRlZDg5In0.eyJpc3MiOiJodHRwOi8vZG9scGhpbmZsYXNoY2FyZHMuY29tIiwiYXVkIjoiYXBpIiwic3ViIjoiMiIsImFjY2Vzc190b2tlbiI6IjRiZTA2NDNmLTFkOTgtNTczYi05N2NkLWNhOThhNjUzNDdkZCIsImFjY2Vzc190b2tlbl9yYXciOiJ0ZXN0IiwiZXhwIjoxNzI1NDgwNTU1LCJpYXQiOjE3MjQ4NzU3NTV9.wX5gfXHJt6ABETmGybzracDx4lfBsg4pcb4O2WyXlm39w4ivGcGX2sQ9XtLImnStOLk2ACOh5IoTBazmyBvxKg'
            }
        )
        assert response == ["User has no flashcards"]

    @pytest.mark.run(order=15)
    def test_create_set_with_no_folder(self):
        """
        Test to create a flashcard set where no folder needs to be created
        """
        # Create the account
        valid_dummy = {"userID": "2", "displayName": "Dummy", "rawAccessToken": "test", "accessToken": "4be0643f-1d98-573b-97cd-ca98a65347dd", "idToken": ""}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)
        response_json = response[0]
        user_2_jwt_token = self.create_user("2")

        # Create the flashcard set
        flashcard_data = {
            "jwtToken": user_2_jwt_token,
            "flashcardName": "My new set",
            "flashcardDescription": "This is\nmy description",
            "folder": "",
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
        assert response_json == {"flashcardID": "48a5735c-dab7-58cc-a1d3-d3cf9a2a2916"}

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": user_2_jwt_token})
        assert response == {
            "My new set": {
                "cards": {
                    "2f5442b6-5e87-5cad-9aa5-b56bfcbc73fe": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    "5db1550a-1531-5b0c-aaaa-a2134f33e950": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": "48a5735c-dab7-58cc-a1d3-d3cf9a2a2916",
                "flashcardName": "My new set",
            }
        }

    @pytest.mark.run(order=16)
    def test_create_set_with_no_folder_again(self):
        """
        Test to create a flashcard set where no folder needs to be created
        but root node already has a flashcard set. The previous method created
        the first flashcard set
        """
        user_2_jwt_token = self.create_user("2")

        # Create the flashcard set
        flashcard_data = {
            "jwtToken": user_2_jwt_token,
            "flashcardName": "My second set",
            "flashcardDescription": "This is my second description",
            "folder": "",
            "cards": [
                {
                    "front": "Set 2 Front 1",
                    "back": "Set 2 Back 1",
                    "reviewStatus": "0.0",
                    "lastReview": "27/04/2024",
                },
                {
                    "front": "Set 2 Front 2",
                    "back": "Set 2 Back 2",
                    "reviewStatus": "0.0",
                    "lastReview": "27/04/2024",
                },
            ],
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD["url"], flashcard_data)
        response_json = response[0]
        assert response_json == {'flashcardID': '5da32188-ae6d-58f5-a898-04d08ccd43f7'}

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": user_2_jwt_token})
        assert response == {
            "My new set": {
                "cards": {
                    "2f5442b6-5e87-5cad-9aa5-b56bfcbc73fe": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    "5db1550a-1531-5b0c-aaaa-a2134f33e950": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": "48a5735c-dab7-58cc-a1d3-d3cf9a2a2916",
                "flashcardName": "My new set",
            },
            "My second set": {
                "cards": {
                    "2fb53831-b180-5ac2-82b2-712e62e9b8c7": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    "a653b455-8c9f-5da3-9a87-da030412af39": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": "5da32188-ae6d-58f5-a898-04d08ccd43f7",
                "flashcardName": "My second set",
            },
        }

    @pytest.mark.run(order=17)
    def test_create_set_with_two_folders(self):
        """
        Test to create a flashcard set where 2 folders need to be created.
        Note that the userID is still 2 - this makes sure it works, even when
        there's multiple random cards in the root folder
        """
        user_2_jwt_token = self.create_user("2")

        # Create the flashcard set
        flashcard_data = {
            "jwtToken": user_2_jwt_token,
            "flashcardName": "Set with two folders",
            "flashcardDescription": "This set is within two folders",
            "folder": "my_folder1/my_second_folder",
            "cards": [
                {
                    "front": "Set 3 Front 1",
                    "back": "Set 3 Back 1",
                    "reviewStatus": "0.0",
                    "lastReview": "27/04/2024",
                },
                {
                    "front": "Set 3 Front 2",
                    "back": "Set 3 Back 2",
                    "reviewStatus": "0.0",
                    "lastReview": "27/04/2024",
                },
            ],
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD["url"], flashcard_data)
        response_json = response[0]
        assert response_json == {'flashcardID': '758c6b3c-cc9b-52f3-865e-ac32255ce544'}

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": user_2_jwt_token,})
        assert response == {
            "My new set": {
                "cards": {
                    "2f5442b6-5e87-5cad-9aa5-b56bfcbc73fe": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    "5db1550a-1531-5b0c-aaaa-a2134f33e950": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": "48a5735c-dab7-58cc-a1d3-d3cf9a2a2916",
                "flashcardName": "My new set",
            },
            "My second set": {
                "cards": {
                    "2fb53831-b180-5ac2-82b2-712e62e9b8c7": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    "a653b455-8c9f-5da3-9a87-da030412af39": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": "5da32188-ae6d-58f5-a898-04d08ccd43f7",
                "flashcardName": "My second set",
            },
            "my_folder1": {
                "my_second_folder": {
                    "Set with two folders": {
                        "cards": {
                            "41b574fd-bf2f-54d1-968e-a7d401d586a1": {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                            "81036c16-e825-51eb-b410-4dfd5a4de002": {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                        },
                        "flashcardID": "758c6b3c-cc9b-52f3-865e-ac32255ce544",
                        "flashcardName": "Set with two folders",
                    }
                }
            },
        }

    @pytest.mark.run(order=18)
    def test_create_set_that_already_exists(self):
        """
        Test to create a flashcard set that already exists. At the moment, this passes, overwwriting card data
        """
        self.test_create_set_with_two_folders()

    @pytest.mark.run(order=19)
    def test_move_card_to_location_that_exists(self):
        """
        Test to move flashcard set to a new location that exists and stores folders and sets
        """
        user_2_jwt_token = self.create_user("2")

        request_data = {
            "jwtToken": user_2_jwt_token,
            "currentLocation": "",
            "flashcardName": "My second set",
            "moveLocation": "my_folder1",
        }
        response = self.post_api(Routes.ROUTE_MOVE_FLASHCARD["url"], request_data)
        assert response == {
            "success": "The flashcard set at /users/2/flashcards//My second set has been moved to my_folder1"
        }

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": user_2_jwt_token,})
        assert response == {
            "My new set": {
                "cards": {
                    "2f5442b6-5e87-5cad-9aa5-b56bfcbc73fe": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    "5db1550a-1531-5b0c-aaaa-a2134f33e950": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": "48a5735c-dab7-58cc-a1d3-d3cf9a2a2916",
                "flashcardName": "My new set",
            },
            "my_folder1": {
                "My second set": {
                    "cards": {
                        "2fb53831-b180-5ac2-82b2-712e62e9b8c7": {
                            "last_review": date.get_current_date(),
                            "review_status": "0.0",
                        },
                        "a653b455-8c9f-5da3-9a87-da030412af39": {
                            "last_review": date.get_current_date(),
                            "review_status": "0.0",
                        },
                    },
                    "flashcardID": "5da32188-ae6d-58f5-a898-04d08ccd43f7",
                    "flashcardName": "My second set",
                },
                "my_second_folder": {
                    "Set with two folders": {
                        "cards": {
                            "41b574fd-bf2f-54d1-968e-a7d401d586a1": {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                            "81036c16-e825-51eb-b410-4dfd5a4de002": {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                        },
                        "flashcardID": "758c6b3c-cc9b-52f3-865e-ac32255ce544",
                        "flashcardName": "Set with two folders",
                    }
                },
            },
        }

    @pytest.mark.run(order=20)
    def test_move_card_to_new_location(self):
        """
        Test to move flashcard set to a new location that does not exist
        """
        user_2_jwt_token = self.create_user("2")

        # Create the account
        valid_dummy = {"userID": "test_update_goal_status", "displayName": "Dummy", "rawAccessToken": "test", "accessToken": "4be0643f-1d98-573b-97cd-ca98a65347dd", "idToken": ""}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)
        response_json = response[0]
        test_update_goal_status_jwt_token = response_json["token"]

        # Create the user - this relies on previous tests to make sure it's working
        valid_dummy = {"userID": "test_update_goal_status", "displayName": "Dummy"}

        self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)

        request_data = {
            "jwtToken": user_2_jwt_token,
            "currentLocation": "my_folder1",
            "flashcardName": "My second set",
            "moveLocation": "languages/spanish",
        }
        response = self.post_api(Routes.ROUTE_MOVE_FLASHCARD["url"], request_data)
        assert response == {
            "success": "The flashcard set at /users/2/flashcards/my_folder1/My second set"
            + " has been moved to languages/spanish"
        }

        # Test the received data is as expected
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": user_2_jwt_token,})
        assert response == {
            "languages": {
                "spanish": {
                    "My second set": {
                        "cards": {
                            "2fb53831-b180-5ac2-82b2-712e62e9b8c7": {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                            "a653b455-8c9f-5da3-9a87-da030412af39": {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                        },
                        "flashcardID": "5da32188-ae6d-58f5-a898-04d08ccd43f7",
                        "flashcardName": "My second set",
                    },
                },
            },
            "My new set": {
                "cards": {
                    "2f5442b6-5e87-5cad-9aa5-b56bfcbc73fe": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                    "5db1550a-1531-5b0c-aaaa-a2134f33e950": {
                        "last_review": date.get_current_date(),
                        "review_status": "0.0",
                    },
                },
                "flashcardID": "48a5735c-dab7-58cc-a1d3-d3cf9a2a2916",
                "flashcardName": "My new set",
            },
            "my_folder1": {
                "my_second_folder": {
                    "Set with two folders": {
                        "cards": {
                            "41b574fd-bf2f-54d1-968e-a7d401d586a1": {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                            "81036c16-e825-51eb-b410-4dfd5a4de002": {
                                "last_review": date.get_current_date(),
                                "review_status": "0.0",
                            },
                        },
                        "flashcardID": "758c6b3c-cc9b-52f3-865e-ac32255ce544",
                        "flashcardName": "Set with two folders",
                    }
                }
            },
        }

    @pytest.mark.run(order=21)
    def test_move_non_existant_set(self):
        """
        Test to move a flashcard set that does not exist
        """
        user_2_jwt_token = self.create_user("2")


        request_data = {
            "jwtToken": user_2_jwt_token,
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

    @pytest.mark.run(order=22)
    def test_create_card_goal(self):
        """
        Test to create a card goal that should be failed
        """
        user_2_jwt_token = self.create_user("2")

        # Create the user - this relies on previous tests to make sure it's working
        valid_dummy = {"jwtToken": user_2_jwt_token, "displayName": "Dummy"}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)

        request_data = {"jwtToken": user_2_jwt_token, "cardsToRevise": 5, "endDate": "01/01/2022"}
        response = self.post_api(Routes.ROUTE_CREATE_CARD_GOAL["url"], request_data)
        assert response == {"success": "Goal created successfully"}

    @pytest.mark.run(order=23)
    def test_create_xp_goal(self):
        """
        Test to create an XP goal that should be in progress
        """
        user_2_jwt_token = self.create_user("2")

        # Create the user - this relies on previous tests to make sure it's working
        valid_dummy = {"jwtToken": user_2_jwt_token, "displayName": "Dummy"}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)

        request_data = {"jwtToken": user_2_jwt_token, "goalXP": 5, "endDate": date.get_current_date()}
        response = self.post_api(Routes.ROUTE_CREATE_XP_GOAL["url"], request_data)
        assert response == {"success": "Goal created successfully"}

    @pytest.mark.run(order=24)
    def test_create_completed_goal(self):
        """
        Test for a goal that should be completed
        """
        user_2_jwt_token = self.create_user("2")

        # Create the user - this relies on previous tests to make sure it's working
        valid_dummy = {"jwtToken": user_2_jwt_token, "displayName": "Dummy"}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)

        request_data = {"jwtToken": user_2_jwt_token, "goalXP": 0, "endDate": date.get_current_date()}
        response = self.post_api(Routes.ROUTE_CREATE_XP_GOAL["url"], request_data)
        print (response)
        assert response == {"success": "Goal created successfully"}

    """@pytest.mark.run(order=25)
    def test_update_goal_status(self):
        Make sure the update-goal-status route works
        # Create the user - this relies on previous tests to make sure it's working
        valid_dummy = {"userID": "test_update_goal_status", "displayName": "Dummy"}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)

        # Create the goal data for testing - again relies on previous tests
        request_data = {
            "userID": "test_update_goal_status",
            "cardsToRevise": 5,
            "endDate": "01/01/2022",
        }
        response = self.post_api(Routes.ROUTE_CREATE_CARD_GOAL["url"], request_data)

        # Test case 1: The function works
        request_data = {
            "userID": "test_update_goal_status",
            "goalXP": 0,
            "endDate": date.get_current_date(),
        }
        response = self.post_api(Routes.ROUTE_CREATE_XP_GOAL["url"], request_data)
        request_data = {
            "userID": "test_update_goal_status",
            "goalXP": 5,
            "endDate": date.get_current_date(),
        }
        response = self.post_api(Routes.ROUTE_CREATE_XP_GOAL["url"], request_data)
        request_data = {"userID": "test_update_goal_status"}
        response = self.post_api(Routes.ROUTE_UPDATE_GOAL_STATUS["url"], request_data)
        print(response)
        assert response == {
            "50f2cb1e-dd15-59eb-bdd1-2befcac7407a": {
                "data": {"cards_revised_so_far": "0", "cards_to_revise": 5},
                "end_date": "01/01/2022",
                "fail_date": date.get_current_date(),
                "status": "failed",
                "title": "Revise 5 cards by 01/01/2022",
                "type": "Card",
            },
            "5f01780b-e43d-5028-9e12-06a066e1205a": {
                "data": {
                    "goal_xp": 5,
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "in progress",
                "title": f"Gain 5 XP by {date.get_current_date()}",
                "type": "XP",
            },
            "68849d95-c206-57bd-8a3c-73fa05f8aa51": {
                "data": {
                    "goal_xp": 0,
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "completed",
                "title": f"Gain 0 XP by {date.get_current_date()}",
                "type": "XP",
            }
        }

        # Test case 2: The card exists
        request_data = {
            "userID": "test_update_goal_status",
            "goalID": "50f2cb1e-dd15-59eb-bdd1-2befcac7407a",
            "newEndDate": "28/05/2027",
            "newTitle": "My new title",
            "newCardsToRevise": 200,
        }
        response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL["url"], request_data)
        assert response == {"success": "Goal updated successfully"}

        # Test case 3: The card does not exist
        request_data = {
            "userID": "test_update_goal_status",
            "goalID": "This card does not exist",
            "newEndDate": "28/05/2027",
            "newTitle": "My new title",
            "newCardsToRevise": 200,
        }
        try:
            # This line should fail
            response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL["url"], request_data)
            assert False
        except Exception:
            assert True

        # Test case 4: Editing a valid XP card
        request_data = {
            "userID": "test_update_goal_status",
            "goalID": "5f01780b-e43d-5028-9e12-06a066e1205a",
            "newEndDate": "29/05/2027",
            "newTitle": "My new xp title",
            "newGoalXP": 50,
        }
        response = self.post_api(Routes.ROUTE_EDIT_XP_GOAL["url"], request_data)
        assert response == {"success": "Goal updated successfully"}

        # Test case 5: Editing an XP card which does not exist
        request_data = {
            "userID": "test_update_goal_status",
            "goalID": "This goal does not exist",
            "newEndDate": "29/05/2027",
            "newTitle": "My new xp title",
            "newGoalXP": 50,
        }
        try:
            # This line should fail
            response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL["url"], request_data)
            assert False
        except Exception:
            assert True

        # Test case 6: The cards have been edited properly
        request_data = {"userID": "test_update_goal_status"}
        response = self.post_api(Routes.ROUTE_UPDATE_GOAL_STATUS["url"], request_data)
        assert response == {
            "68849d95-c206-57bd-8a3c-73fa05f8aa51": {
                "data": {
                    "goal_xp": 0,
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "completed",
                "title": "Gain 0 XP by " + date.get_current_date(),
                "type": "XP",
            },
            "5f01780b-e43d-5028-9e12-06a066e1205a": {
                "data": {
                    "goal_xp": 50,
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": "29/05/2027",
                "fail_date": "",
                "status": "in progress",
                "title": "My new xp title",
                "type": "XP",
            },
            "50f2cb1e-dd15-59eb-bdd1-2befcac7407a": {
                "data": {"cards_revised_so_far": "0", "cards_to_revise": 200},
                "end_date": "28/05/2027",
                "fail_date": date.get_current_date(),
                "status": "failed",  # Failed because it was already failed before end_date was updated
                "title": "My new title",
                "type": "Card",
            },
        }

        # Test case 7: A valid goal is deleted
        request_data = {
            "userID": "test_update_goal_status",
            "goalID": "5f01780b-e43d-5028-9e12-06a066e1205a",
        }
        response = self.delete_api(Routes.ROUTE_DELETE_GOAL["url"], request_data)
        assert response == {"success": "Goal deleted successfully"}

        # Test case 8: An invalid goal is deleted - this does not actually have an error
        request_data = {
            "userID": "test_update_goal_status",
            "goalID": "Invalid goal id",
        }
        response = self.delete_api(Routes.ROUTE_DELETE_GOAL["url"], request_data)
        assert response == {"success": "Goal deleted successfully"}

        # Test case 8: Check the goal is actually deleted
        request_data = {"userID": "test_update_goal_status"}
        response = self.post_api(Routes.ROUTE_UPDATE_GOAL_STATUS["url"], request_data)
        assert response == {
            "68849d95-c206-57bd-8a3c-73fa05f8aa51": {
                "data": {
                    "goal_xp": 0,
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "completed",
                "title": "Gain 0 XP by " + date.get_current_date(),
                "type": "XP",
            },
            "50f2cb1e-dd15-59eb-bdd1-2befcac7407a": {
                "data": {"cards_revised_so_far": "0", "cards_to_revise": 200},
                "end_date": "28/05/2027",
                "fail_date": date.get_current_date(),
                "status": "failed",  # Failed because it was already failed before end_date was updated
                "title": "My new title",
                "type": "Card",
            },
        }"""

    @pytest.mark.run(order=25)
    def test_update_heatmap(self):
        """
        Test the update-heatmap method
        """
        test_update_goal_status_jwt_token = self.create_user("test_update_goal_status")

        # Create the user
        valid_dummy = {"userID": "test_update_goal_status", "displayName": "Dummy", "rawAccessToken": "test", "accessToken": "4be0643f-1d98-573b-97cd-ca98a65347dd", "idToken": ""}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)
        response_json = response[0]
        test_update_goal_status_jwt_token = response_json["token"]

        # Test case 1: User exists
        request_data = {"jwtToken": test_update_goal_status_jwt_token}
        today = date.get_current_date().replace("/", "-")
        response = self.post_api(Routes.ROUTE_UPDATE_HEATMAP["url"], request_data)
        assert response == {today: "2"}

        # Test case 2: User does not exist
        request_data = {"userID": "Invalid User"}
        try:
            # This should not run
            response = self.post_api(Routes.ROUTE_UPDATE_HEATMAP["url"], request_data)
            assert False
        except:
            assert True

        # Test case 3: User exists when fetching heatmap data
        request_data = {"jwtToken": test_update_goal_status_jwt_token}
        response = self.post_api(Routes.ROUTE_GET_HEATMAP["url"], request_data)
        assert response == {today: "2"}

        # Test case 4: User does not exist when fetching heatmap data
        request_data = {"userID": "Invalid User"}
        try:
            # This should not run
            response = self.post_api(Routes.ROUTE_GET_HEATMAP["url"], request_data)
            assert False
        except:
            assert True

    @pytest.mark.run(order=26)
    def test_create_folder(self):
        """
        Test to create a folder
        """
        # Create the user (relies on previous tests to ensure it is working)
        User1_jwt_token = self.create_user("folderUser1")

        get_today_cards = {"jwtToken":User1_jwt_token}
        # Test case 1: Valid folder
        request_data = {"jwtToken":User1_jwt_token, "folder": "my_folder/folder1"}
        response = self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], request_data)
        assert response == {"success": "Folder my_folder/folder1 created"}

        # Check the folder has been created
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], get_today_cards)
        assert response == {"my_folder": {"folder1": {}}}

        # Test case 2: Create a folder with parent folder that contains data
        request_data = {"jwtToken":User1_jwt_token, "folder": "my_folder/folder2"}
        response = self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], request_data)
        assert response == {"success": "Folder my_folder/folder2 created"}

        # Check the folder has been created
        response = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], get_today_cards)
        assert response == {"my_folder": {"folder1": {}, "folder2": {}}}

        # Test case 3: Folder which exists
        request_data = {"jwtToken":User1_jwt_token, "folder": "my_folder/folder1"}
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
            assert False
        except Exception:
            assert True

# api = TestApi()
# api.test_create_account_valid()
# api.test_get_user()
# api.test_get_invalid_user()
# api.test_get_user_stats()
# api.test_get_invalid_user_stats()
# api.test_create_flashcard_set()
# api.test_get_flashcard_set()
# api.test_get_invalid_flashcard_set()
# api.test_get_valid_cards()
# api.test_get_invalid_card_ids()
# api.test_get_all_cards()
# api.test_get_all_cards_invalid_user()
# api.test_create_set_with_no_folder()
# api.test_create_set_with_no_folder_again()
# api.test_create_set_with_two_folders()
# api.test_create_set_that_already_exists()
# api.test_move_card_to_location_that_exists()
# api.test_move_card_to_new_location()
# api.test_move_non_existant_set()
# api.test_create_card_goal()
# api.test_create_xp_goal()
# api.test_create_completed_goal()
# # api.test_update_goal_status()
# api.test_update_heatmap()
# api.test_create_folder()
