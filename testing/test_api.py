""" Includes all tests for the project """
import sys
import os
import unittest

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, '..', 'backend')
sys.path.append(src_path)
from backend.verification.api_error_checking import check_request_json


class TestCheckRequestJson(unittest.TestCase):
    def test_check_request_json(self):
        """ Check the check_request_json function works as expected """

        # Test with a valid request
        result = check_request_json(
                {
                    "key1": "",
                    "key2": ""},
                {
                    "key1": "",
                    "key2": ""}
        )

        # assert result is True
        self.assertIs(result,
                      True,
                      'Result must be True')

        # Test with a valid request but keys have different values
        result = check_request_json(
                {
                    "key1": "val1",
                    "key2": "value2"},
                {
                    "key1": "",
                    "key2": ""}
        )

        # assert result == "Value for 'val1' does not match the expected pattern ''"
        self.assertEqual(result,
                         "Value for 'val1' does not match the expected pattern ''",
                         'Keys with different values.')

        # Test with a valid request but keys are in different order
        result = check_request_json(
                {
                    "key2": "",
                    "key1": ""},
                {
                    "key1": "",
                    "key2": ""}
        )
        # assert result == 'Your supplied json keys do not match the expected format'
        self.assertEqual(result,
                         'Your supplied json keys do not match the expected format',
                         'Unexpected json keys format.')

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
        # assert result == "Your supplied json keys do not match the expected format"
        self.assertEqual(result,
                         "Your supplied json keys do not match the expected format",
                         'Unexpected json keys format.')

        # Test with invalid keys
        result = check_request_json(
                {
                    "key3": "",
                    "key4": ""},
                {
                    "key1": "",
                    "key2": ""}
        )
        # assert result == "Your supplied json keys do not match the expected format"
        self.assertEqual(result,
                         "Your supplied json keys do not match the expected format",
                         'Unexpected json keys format.')

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

        # assert result is True
        self.assertIs(result, True, 'Wrong format for request data.')

        # Test with invalid regex pattern
        expected_format = {
            "name" : "",
            "age"  : r'\d{3}',
            "email": r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        }

        result = check_request_json(expected_format, request_data)
        assert result == "Value for '\\d{3}' does not match the expected pattern '30'"

        # Test with keys and sub keys
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
        assert result is True


if __name__ == '__main__':
    test_check_request_json()
