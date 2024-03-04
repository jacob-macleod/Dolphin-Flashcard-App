""" Includes all tests for the project """
import sys
import os
import unittest

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, '..', 'backend')
sys.path.append(src_path)
from verification.api_error_checking import check_request_json
from routes.api.authentication import create_account, serve_credentials
from json import loads, dumps
from requests import get, post
from main import server_addr
from api_routes import Routes

headers = {
    'Content-Type': 'application/json'
}


class TestApi(unittest.TestCase):

    def get_api(self, route: str, data: dict = None) -> dict:
        """
        Simple get method to not repeat "get" everytime
        """

        response = get(f'http://localhost:{server_addr[1]}{route}',
                       headers=headers,
                       data=dumps(data))

        self.assertNotEqual(response.status_code, 500,
                            f"An unhandled exception caused an Internal Server Error ({response.status_code}) in "
                            f"{route}")

        return loads(response.text)

    def post_api(self, route: str, data: dict) -> dict:
        """
        Simple get method to not repeat "post" everytime
        """

        response = post(f'http://localhost:{server_addr[1]}{route}',
                        data=dumps(data),
                        headers=headers)

        self.assertNotEqual(response.status_code, 500,
                            f"An unhandled exception caused an Internal Server Error ({response.status_code}) in "
                            f"{route}")

        return loads(response.text)

    def test_check_request_json(self) -> None:
        # Check the check_request_json function works as expected

        # Test with a valid request
        result = check_request_json(
                {
                    "key1": "",
                    "key2": ""},
                {
                    "key1": "",
                    "key2": ""}
        )

        self.assertTrue(result)

        # Test with a valid request but keys have different values
        result = check_request_json(
                {
                    "key1": "val1",
                    "key2": "value2"},
                {
                    "key1": "",
                    "key2": ""}
        )

        self.assertEqual(result, "Value for 'val1' does not match the expected pattern ''",
                         "Unexpected pattern.")

        # Test with a valid request but keys are in different order
        result = check_request_json(
                {
                    "key2": "",
                    "key1": ""},
                {
                    "key1": "",
                    "key2": ""}
        )
        self.assertEqual(result, 'Your supplied json keys do not match the expected format',
                         'Your supplied json keys do not match the expected format')

        # Test with valid keys and some extra ones
        result = check_request_json(
                {
                    "key1": "",
                    "key2": "",
                    "key3": ""},
                {
                    "key1": "",
                    "key2": ""}
        )
        self.assertEqual(result, 'Your supplied json keys do not match the expected format',
                         'Your supplied json keys do not match the expected format')

        # Test with invalid keys
        result = check_request_json(
                {
                    "key3": "",
                    "key4": ""},
                {
                    "key1": "",
                    "key2": ""}
        )

        self.assertEqual(result, 'Your supplied json keys do not match the expected format',
                         'Your supplied json keys do not match the expected format')

        # Test with valid regex pattern
        expected_format = {
            "name" : "",
            "age"  : r'\d+',
            "email": r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        }

        request_data = {
            "name" : "John Doe",
            "age"  : "30",
            "email": "john@example.com",
        }
        result = check_request_json(expected_format, request_data)
        self.assertTrue(result, msg='Invalid regex pattern')

        # Test with invalid regex pattern
        expected_format = {
            "name" : "",
            "age"  : r'\d{3}',
            "email": r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        }

        result = check_request_json(expected_format, request_data)
        self.assertEqual(result, "Value for '\\d{3}' does not match the expected pattern '30'",
                         msg="Value for '\\d{3}' does not match the expected pattern '30'")

        expected_format = {
            "name"   : "",
            "age"    : "",
            "email"  : "",
            "address": {
                "street"  : "",
                "city"    : "",
                "postcode": ""
            }
        }

        request_data = {
            "name"   : "",
            "age"    : "",
            "email"  : "",
            "address": {
                "street"  : "",
                "city"    : "",
                "postcode": ""
            }
        }

        result = check_request_json(expected_format, request_data)
        self.assertTrue(result, 'Invalid json format for keys and sub keys.')

    # Authentication
    def test_create_account_valid(self) -> None:
        """
        Valid account
        """
        valid_dummy = {
            "userID"     : "1",
            "displayName": "Dummy"
        }

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT['url'], valid_dummy)
        response_json = response[0]
        self.assertTrue(expr=response_json['success'],
                        msg='Dummy account creation should be successful.')

    def test_create_account_empty(self) -> None:
        """
        Empty userID / displayName
        """
        error_dummy = {
            "userID"     : "",
            "displayName": ""
        }

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT['url'], error_dummy)
        response_json = response[0]
        self.assertFalse(expr=response_json['success'],
                         msg='Should not create a nameless user.')

    def test_create_account_invalid(self) -> None:
        """
        Empty json data
        """
        empty_dummy = {}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT['url'], empty_dummy)
        self.assertEqual(first=response['error'],
                         second="Your supplied json keys do not match the expected format. "
                                "The request should be in the format: {'userID': '', 'displayName': ''}",
                         msg='Should not create an empty user.')

    # Card Management
    def test_create_flashcard_valid(self) -> None:
        """
        Valid flashcard
        """
        valid_data = {
            "userID"              : "1",
            "flashcardName"       : "My new set",
            "flashcardDescription": "This is\nmy description",
            "cards"               : [
                {
                    "front"       : "Front 1",
                    "back"        : "Back 1",
                    "reviewStatus": "0.0",
                    "lastReview"  : "01/01/1969"
                },
                {
                    "front"       : "Front 2",
                    "back"        : "Back 2",
                    "reviewStatus": "0.0",
                    "lastReview"  : "01/01/1969"
                }
            ]
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], data=valid_data)
        response_json = response[0]
        self.assertTrue(expr=response_json['success'],
                        msg=f'Should be True but was {response_json['success']}')

    def test_create_flashcard_non_existent_userid(self) -> None:
        """
        Non-existent userID
        """
        invalid_data = {
            "userID"              : "-1",
            "flashcardName"       : "My new set",
            "flashcardDescription": "This is\nmy description",
            "cards"               : [
                {
                    "front"       : "Front 1",
                    "back"        : "Back 1",
                    "reviewStatus": "0.0",
                    "lastReview"  : "01/01/1969"
                },
                {
                    "front"       : "Front 2",
                    "back"        : "Back 2",
                    "reviewStatus": "0.0",
                    "lastReview"  : "01/01/1969"
                }
            ]
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], data=invalid_data)
        response_json = response[0]
        self.assertFalse(response_json['success'],
                         msg='Should not create a flashcard for an user that does not exist.')

    def test_create_flashcard_empty_userid(self) -> None:
        """
        Empty userID
        """
        invalid_data = {
            "userID"              : "",
            "flashcardName"       : "My new set",
            "flashcardDescription": "This is\nmy description",
            "cards"               : [
                {
                    "front"       : "Front 1",
                    "back"        : "Back 1",
                    "reviewStatus": "0.0",
                    "lastReview"  : "01/01/1969"
                },
                {
                    "front"       : "Front 2",
                    "back"        : "Back 2",
                    "reviewStatus": "0.0",
                    "lastReview"  : "01/01/1969"
                }
            ]
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], data=invalid_data)
        response_json = response[0]
        self.assertFalse(response_json['success'],
                         msg='Should not create a flashcard for an user that does not exist.')

    def test_create_flashcard_empty_cards(self) -> None:
        """
        Empty cards field
        """
        invalid_data = {
            "userID"              : "-1",
            "flashcardName"       : "My new set",
            "flashcardDescription": "This is\nmy description",
            "cards"               : []
        }

        # TODO: Should this be possible?

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], data=invalid_data)
        response_json = response[0]
        self.assertFalse(response_json['success'],
                         msg='Should not create a flashcard for an user that does not exist.')

    def test_get_flashcard_valid(self) -> None:
        data = {
            "userID"       : "1",
            "flashcardName": "My new set"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD['url'], data=data)
        self.assertIsInstance(response, dict, f"Should return a dict flashcard, but returned {type(response)}")

    def test_get_flashcard_non_existent_userid(self) -> None:
        data = {
            "userID"       : "-2",
            "flashcardName": "My new set"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD['url'], data=data)
        self.assertIsNone(response, "Should return nothing for a non-existent userID.")

    def test_get_flashcard_invalid_data(self) -> None:
        """
        Invalid 'user' key, should be 'userID'
        """
        data = {
            "user"         : "1",
            "flashcardName": "My new set"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD['url'], data=data)
        self.assertIsInstance(response, dict, f"Should be a dict, but was {response}")

        self.assertEqual(response['error'],
                         "Your supplied json keys do not match the expected format."
                         " The request should be in the format: {'userID': '', 'flashcardName': ''}",
                         "Invalid return from get-flashcard endpoint, json keys must be valid.")

    def test_get_today_cards(self) -> None:
        # TODO: Must test get_today_cards endpoint
        pass

    # Statistics

    def test_calculate_card_stats(self) -> None:
        # TODO: Must test calculate_card_stats endpoint
        pass

    def test_update_heatmap(self) -> None:
        # TODO: Must test update_heatmap endpoint
        pass

    def test_get_heatmap(self) -> None:
        # TODO: Must test get_heatmap endpoint
        pass

    def test_(self) -> None:
        # TODO: Must test calculate_streak endpoint
        pass
