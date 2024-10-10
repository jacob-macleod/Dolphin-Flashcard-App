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
from database.database_config import type

from test_api.base import BaseApiActionsMixin

# Check the database is set to local
if type != "local":
    raise ValueError(
        f"The database type in src/database/database_config.py is set to '{type}', not 'local'!"
    )

headers = {"Content-Type": "application/json"}

date = Date()


class TestBasicApi(unittest.TestCase, BaseApiActionsMixin):
    def test_update_heatmap(self,user):
        """
        Test the update-heatmap method
        """
        user_jwt_token = self.jwt_handler.encode(user["user_id"], "test", "any")

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
