""" Includes all tests for the project """
import sys
import os
import unittest

from api_routes import Routes

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, '..', 'backend')
sys.path.append(src_path)
from verification.api_error_checking import check_request_json
from classes.date import Date
from json import loads, dumps
from requests import get, post
from main import server_addr

headers = {
    'Content-Type': 'application/json'
}

date = Date()

class TestApi(unittest.TestCase):
    """Test the API
    """
    def get_api(self, route: str, data: dict = None) -> dict:
        """
        Simple get method to not repeat "get" everytime
        """

        response = get(
            f'http://127.0.0.1:{server_addr[1]}{route}',
            headers=headers,
            data=dumps(data),
            timeout=5
        )

        self.assertNotEqual(
            response.status_code, 500,
            "An unhandled exception caused an Internal Server Error " +
            f"({response.status_code}) in " +
            f"{route}"
        )

        return loads(response.text)

    def post_api(self, route: str, data: dict) -> dict:
        """
        Simple get method to not repeat "post" everytime
        """

        response = post(
            f'http://127.0.0.1:{server_addr[1]}{route}',
            data=dumps(data),
            headers=headers,
            timeout=5
        )

        self.assertNotEqual(
            response.status_code, 500,
            f"An unhandled exception caused an Internal Server Error ({response.status_code}) in "
            f"{route}"
        )

        return loads(response.text)

    def test_example(self) -> None:
        """
        Brief description
        """
        data = {
            "key1": "value1",
            "key2": "value2"
        }

        # TODO: Warning / Question tho who is coding the backend

        response = True

        self.assertTrue(response, 'Should be True, but was {}'.format(response))

    def test_check_request_json(self) -> None:
        """Check the check_request_json function works as expected
        """

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

        self.assertEqual(result, True)

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
            "userID": "1",
            "displayName": "Dummy"
        }

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT['url'], valid_dummy)
        response_json = response[0]
        print (response_json)
        self.assertTrue(expr=response_json['success'],
                        msg='Dummy account creation should be successful.')

    def test_get_user(self) -> None:
        """Get the newly created user
        """
        valid_dummy = {
            "userID": "1"
        }

        response = self.get_api(Routes.ROUTE_GET_USER['url'], valid_dummy)
        response_json = response[0]
        assert response_json == {'name': 'Dummy'}

    def test_get_invalid_user(self):
        """Get a user that does not exist
        """
        invalid_dummy = {
            "userID": "2"
        }

        response = self.get_api(Routes.ROUTE_GET_USER['url'], invalid_dummy)
        response_json = response[0]
        assert response_json is None

    def test_get_user_stats(self):
        """Get the statistics for the user that has been created
        """
        valid_dummy = {
            "userID": "1"
        }

        response = self.get_api(Routes.ROUTE_GET_USER_STATS['url'], valid_dummy)
        response_json = response[0]
        assert response_json == {
            'lastStreak': date.get_current_date(),
            'streak': 0,
            'weeklyXP': 0,
            'totalXP': 0
        }

    def test_get_invalid_user_stats(self):
        """Get the statistics for a user that does not exist
        """
        invalid_dummy = {
            "userID": "2"
        }

        response = self.get_api(Routes.ROUTE_GET_USER_STATS['url'], invalid_dummy)
        response_json = response[0]
        assert response_json is None

    def test_create_flashcard_set(self):
        """Create a flashcard set for the newly created user
        """
        flashcard_data ={
            "userID": "1",
            "flashcardName": "My new set",
            "flashcardDescription": "This is\nmy description",
            "folder": "parent-name",
            "cards": [
                {
                    "front":"Front 1",
                    "back": "Back 1",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                },
                {
                    "front":"Front 2",
                    "back": "Back 2",
                    "reviewStatus":"0.0",
                    "lastReview": "27/04/2024"
                }
            ]
        }

        response = self.post_api(Routes.ROUTE_CREATE_FLASHCARD['url'], flashcard_data)
        response_json = response[0]
        assert response_json['success']

    def test_get_flashcard_set(self):
        """Get the flashcard set that has been created
        """
        flashcard_set_data = {
            "userID": "1",
            "folder": "parent-name",
            "flashcardName": "My new set"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD['url'], flashcard_set_data)
        response_json = response[0]
        assert response_json == {
            'cards': [
                '111197372349526489549352770627451434124951736187783527272260257031167665344330',
                '105807173781801679610690871524240887702929777887954072430940584241217379438024'
            ],
            'description': 'This is\nmy description',
            'name': 'My new set'
        }

    def test_get_invalid_flashcard_set(self):
        """Get a flashcard set that does not exist
        """
        flashcard_set_data = {
            "userID": "1",
            "folder": "parent-name",
            "flashcardName": "My new set 2"
        }

        response = self.get_api(Routes.ROUTE_GET_FLASHCARD['url'], flashcard_set_data)
        response_json = response[0]
        assert response_json is None

    def test_get_valid_cards(self):
        """Get the cards that have just been created
        """
        card_ids = [
            '111197372349526489549352770627451434124951736187783527272260257031167665344330',
            '105807173781801679610690871524240887702929777887954072430940584241217379438024'
        ]
        card_datas = [
            {
                "front": "Front 1",
                "back": "Back 1"
            },
            {
                "front": "Front 2",
                "back": "Back 2"
            }
        ]
        for index, card_id in enumerate(card_ids):
            response = self.get_api(Routes.ROUTE_GET_FLASHCARD_ITEM['url'], {"cardID": card_id})
            response_json = response[0]
            assert response_json == card_datas[index]
