import sys
import os
import unittest
import pytest

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "../..", "backend")
sys.path.append(src_path)

# Import api_routes.py if running file directly
current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "../")
sys.path.append(src_path)

from classes.date import Date
from database.jwt_handler import JwtHandler

from api_routes import Routes
from builders.user import create_user
from test_api.base import BaseApiActionsMixin

date = Date()


class TestUser(BaseApiActionsMixin):
    def test_create_account_valid(self) -> None:
        """
        Valid account
        """
        valid_dummy = {
            "userID": "1",
            "displayName": "Dummy",
            "rawAccessToken": "test",
            "accessToken": "4be0643f-1d98-573b-97cd-ca98a65347dd",
            "idToken": "",
        }

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)
        response_json = response[0]
        assert response_json[
            "success"
        ], f"Dummy account creation should be successful. Actual response is {response_json}"

    def test_get_user(self, user) -> None:
        """Get the newly created user"""
        print("USER IS")
        print(user)
        token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.get_api(
            Routes.ROUTE_GET_USER_FROM_JWT["url"], {"jwtToken": token}
        )
        response_json = response[0]
        assert response_json == {"name": user["name"]}

    def test_get_invalid_user(self):
        """Get a user that does not exist"""

        invalid_dummy = {"jwtToken": self.jwt_handler.encode("-1", "test", "any")}
        response = self.get_api(
            Routes.ROUTE_GET_USER_FROM_JWT["url"],
            invalid_dummy,
        )
        response_json = response
        assert response_json == {
            "error": f"Invalid JWT token '{invalid_dummy['jwtToken']}'"
        }

    def test_get_user_stats(self, user):
        """Get the statistics for the user that has been created"""

        # Test case 1: Get the user stats
        token = {
            "jwtToken": self.jwt_handler.encode(
                user["user_id"], user["rawToken"], user["accessToken"]
            )
        }

        response = self.get_api(Routes.ROUTE_GET_USER_STATS["url"], token)
        response_json = response[0]
        assert response_json == {
            "lastStreak": date.get_current_date(),
            "streak": 0,
            "weeklyXP": 0,
            "totalXP": 0,
            "heatmap_data": {date.get_current_date().replace("/", "-"): "1"},
            "lastXPReset": date.get_week_start_date(),
        }

        # Test case 2: Update the heatmap

    def test_get_invalid_user_stats(self):
        """Get the statistics for a user that does not exist"""
        invalid_dummy = {"jwtToken": self.jwt_handler.encode("-1", "test", "any")}

        response = self.get_api(Routes.ROUTE_GET_USER_STATS["url"], invalid_dummy)
        response_json = response
        assert response_json == {
            "error": f"Invalid JWT token '{invalid_dummy['jwtToken']}'"
        }
