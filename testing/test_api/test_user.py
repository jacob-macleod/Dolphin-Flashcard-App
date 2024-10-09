import sys
import os
import unittest
import pytest

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "../..", "backend")
sys.path.append(src_path)

from classes.date import Date
from database.jwt_handler import JwtHandler

from testing.api_routes import Routes
from testing.builders.user import create_user
from testing.test_api.base import BaseApiActionsMixin

date = Date()


class TestUser(unittest.TestCase, BaseApiActionsMixin):

    @property
    def jwt_handler(self):
        return JwtHandler()

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
        self.assertTrue(
            expr=response_json["success"],
            msg=f"Dummy account creation should be successful. Actual response is {response_json}",
        )

    def test_get_user(self, user) -> None:
        """Get the newly created user"""
        token = self.jwt_handler.encode(user["user_id"], "test", "any")

        response = self.get_api(Routes.ROUTE_GET_USER["url"], {"jwtToken": token})
        response_json = response[0]
        assert response_json == {"name": user["name"]}

    def test_get_invalid_user(self):
        """Get a user that does not exist"""

        response = self.get_api(
            Routes.ROUTE_GET_USER["url"],
            {"jwtToken": self.jwt_handler.encode("-1", "test", "any")},
        )
        response_json = response[0]
        assert response_json is None

    def test_get_user_stats(self, user):
        """Get the statistics for the user that has been created"""

        # Test case 1: Get the user stats
        token = {"jwtToken": self.jwt_handler.encode(user["user_id"], "test", "any")}

        response = self.get_api(Routes.ROUTE_GET_USER_STATS["url"], token)
        response_json = response[0]
        assert response_json == {
            "lastStreak": date.get_current_date(),
            "streak": 0,
            "weeklyXP": 0,
            "totalXP": 0,
            "heatmap_data": {date.get_current_date().replace("/", "-"): "1"},
        }

        # Test case 2: Update the heatmap

    def test_get_invalid_user_stats(self):
        """Get the statistics for a user that does not exist"""
        invalid_dummy = {
            "jwtToken": self.jwt_handler.encode("-1", "test", "any")
        }

        response = self.get_api(Routes.ROUTE_GET_USER_STATS["url"], invalid_dummy)
        response_json = response[0]
        assert response_json is None
