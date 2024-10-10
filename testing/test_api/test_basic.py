import sys
import os
import unittest
import pytest

from api_routes import Routes
from builders.user import create_user
current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "..", "backend")
sys.path.append(src_path)
from verification.api_error_checking import check_request_json
from classes.date import Date
from database.database_config import type

from .base import BaseApiActionsMixin

date = Date()

class TestBasicApi(BaseApiActionsMixin):
    """Test the API"""

    def test_check_request_json(self) -> None:
        """Check the check_request_json function works as expected"""

        # Test with a valid request
        result = check_request_json({"key1": "", "key2": ""}, {"key1": "", "key2": ""})

        assert result

        # Test with a valid request but keys have different values
        result = check_request_json(
            {"key1": "val1", "key2": "value2"}, {"key1": "", "key2": ""}
        )

        assert result

        # Test with a valid request but keys are in different order
        result = check_request_json({"key2": "", "key1": ""}, {"key1": "", "key2": ""})
        assert result == "Your supplied json keys do not match the expected format"

        # Test with valid keys and some extra ones
        result = check_request_json(
            {"key1": "", "key2": "", "key3": ""}, {"key1": "", "key2": ""}
        )
        assert result == "Your supplied json keys do not match the expected format"

        # Test with invalid keys
        result = check_request_json({"key3": "", "key4": ""}, {"key1": "", "key2": ""})

        assert result =="Your supplied json keys do not match the expected format"

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
        assert result, "Invalid regex pattern"

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
        assert result, "Invalid json format for keys and sub keys."

    def test_update_heatmap(self, user):
        """
        Test the update-heatmap method
        """
        user_jwt_token = self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"])

        # Test case 1: User exists
        request_data = {"jwtToken": user_jwt_token}
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
        request_data = {"jwtToken": user_jwt_token}
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
