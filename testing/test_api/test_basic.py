import sys
import os
import unittest
import pytest

from testing.api_routes import Routes

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "..", "backend")
sys.path.append(src_path)
from backend.verification.api_error_checking import check_request_json
from backend.classes.date import Date
from backend.database.database_config import type

from base import BaseApiActionsMixin


class TestBasicApi(unittest.TestCase, BaseApiActionsMixin):
    """Test the API"""

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
