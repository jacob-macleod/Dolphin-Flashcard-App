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

headers = {
    'Content-Type': 'application/json'
}


class TestApi(unittest.TestCase):

    def get_api(self, route: str, ) -> dict:
        """
        Simple get method to not repeat "get" everytime
        """

        response = get(f'http://localhost:{server_addr[1]}{route}',
                       headers=headers)

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
            "name": "",
            "age": r'\d+',
            "email": r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        }

        request_data = {
            "name": "John Doe",
            "age": "30",
            "email": "john@example.com",
        }
        result = check_request_json(expected_format, request_data)
        self.assertTrue(result, msg='Invalid regex pattern')

        # Test with invalid regex pattern
        expected_format = {
            "name": "",
            "age": r'\d{3}',
            "email": r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        }

        result = check_request_json(expected_format, request_data)
        self.assertEqual(result, "Value for '\\d{3}' does not match the expected pattern '30'",
                         msg="Value for '\\d{3}' does not match the expected pattern '30'")

        expected_format = {
            "name": "",
            "age": "",
            "email": "",
            "address": {
                "street": "",
                "city": "",
                "postcode": ""
            }
        }

        request_data = {
            "name": "",
            "age": "",
            "email": "",
            "address": {
                "street": "",
                "city": "",
                "postcode": ""
            }
        }

        result = check_request_json(expected_format, request_data)
        self.assertTrue(result, 'Invalid json format for keys and sub keys.')

    # Authentication

    def test_create_account(self) -> None:
        dummy = {
            "userID": "1",
            "displayName": "Dummy"
        }

        response = self.post_api('/api/create-account', dummy)
        response_json = response[0]
        self.assertTrue(response_json['success'], 'Invalid return for "create_account" method.'
                                                  f'Should be True but was {response_json['success']}')

    def test_serve_credentials(self) -> None:
        # TODO: Must test serve_credentials endpoint
        # I need to setup a firebase locally
        pass

    # Card Management

    def test_create_flashcard(self) -> None:
        data = {
            "userID": "1",
            "flashcardName": "My new set",
            "flashcardDescription": "This is\nmy description",
            "cards": [
                {
                    "front": "Front 1",
                    "back": "Back 1",
                    "reviewStatus": "0.0",
                    "lastReview": "01/01/1969"
                },
                {
                    "front": "Front 2",
                    "back": "Back 2",
                    "reviewStatus": "0.0",
                    "lastReview": "01/01/1969"
                }
            ]
        }

        response = self.post_api('/api/create-flashcard', data=data)
        response_json = response[0]
        self.assertTrue(response_json['success'], 'Invalid return for "create_flashcard" method.'
                                                  f'Should be True but was {response_json['success']}')

    def test_get_flashcard(self) -> None:
        # TODO: Must test get_flashcard endpoint
        pass

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
