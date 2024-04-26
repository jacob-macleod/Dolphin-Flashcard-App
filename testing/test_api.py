""" Includes all tests for the project """
import sys
import os
import unittest

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, '..', 'backend')
sys.path.append(src_path)
from verification.api_error_checking import check_request_json
from routes.api.authentication import create_account
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

        response = get(f'http://127.0.0.1:{server_addr[1]}{route}',
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

        response = post(f'http://127.0.0.1:{server_addr[1]}{route}',
                        data=dumps(data),
                        headers=headers)

        self.assertNotEqual(response.status_code, 500,
                            f"An unhandled exception caused an Internal Server Error ({response.status_code}) in "
                            f"{route}")

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
            "userID"     : "1",
            "displayName": "Dummy"
        }

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT['url'], valid_dummy)
        response_json = response[0]
        print (response_json)
        self.assertTrue(expr=response_json['success'],
                        msg='Dummy account creation should be successful.')
