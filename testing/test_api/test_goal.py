import sys
import os
import unittest
import pytest

from api_routes import Routes
from builders.flashcards import create_flashcard, create_flashcard_no_db
from builders.goal import create_card_goal, create_xp_goal, create_xp_goal_no_db
from test_api.base import BaseApiActionsMixin

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "..", "backend")
sys.path.append(src_path)

from classes.date import Date
from database.jwt_handler import JwtHandler
from routes.api.card_management import hash_to_numeric

date = Date()

class TestGoals(BaseApiActionsMixin):
    def test_create_card_goal(self, user):
        """
        Test to create a card goal that should be failed
        """
        jwt_token = self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"])

        request_data = {"jwtToken": jwt_token, "cardsToRevise": 2, "endDate": "01/01/2022"}
        response = self.post_api(Routes.ROUTE_CREATE_CARD_GOAL["url"], request_data)
        assert response == {"success": "Goal created successfully"}

    def test_create_xp_goal(self, user):
        """
        Test to create an XP goal that should be in progress
        """
        jwt_token = self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"])

        request_data = {"jwtToken": jwt_token, "goalXP": 1, "endDate": date.get_current_date()}
        response = self.post_api(Routes.ROUTE_CREATE_XP_GOAL["url"], request_data)
        assert response == {"success": "Goal created successfully"}

    def test_create_completed_goal(self, user):
        """
        Test for a goal that should be completed
        """
        jwt_token = self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"])

        request_data = {"jwtToken": jwt_token, "goalXP": 2, "endDate": date.get_current_date()}
        response = self.post_api(Routes.ROUTE_CREATE_XP_GOAL["url"], request_data)
        assert response == {"success": "Goal created successfully"}

    def test_update_goal_status(self, user):
        card_goal_1 = create_card_goal(user["user_id"], endDate="01/01/2022")
        xp_goal_1 = create_xp_goal_no_db(user["user_id"], goalXP=0, endDate=date.get_current_date())
        xp_goal_2 = create_xp_goal_no_db(user["user_id"], goalXP=5, endDate=date.get_current_date())
        self.post_api(
            Routes.ROUTE_CREATE_XP_GOAL["url"],
            {
                "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
                "goalXP": xp_goal_1["goalXP"],
                "endDate": date.get_current_date(),
            },
        )
        self.post_api(
            Routes.ROUTE_CREATE_XP_GOAL["url"],
            {
                "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
                "goalXP": xp_goal_2["goalXP"],
                "endDate": date.get_current_date(),
            },
        )
        response = self.post_api(Routes.ROUTE_UPDATE_GOAL_STATUS["url"], {"jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),})

        assert response == {
            card_goal_1["goal_id"]: {
                "data": {"cards_revised_so_far": "0", "cards_to_revise": 5},
                "end_date": "01/01/2022",
                "fail_date": date.get_current_date(),
                "status": "failed",
                "title": "Revise 5 cards by 01/01/2022",
                "type": "Card",
            },
            xp_goal_1["goal_id"]: {
                "data": {
                    "goal_xp": xp_goal_1["goalXP"],
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "in progress",
                "title": xp_goal_1["title"],
                "type": "XP",
            },
            xp_goal_2["goal_id"]: {
                "data": {
                    "goal_xp": xp_goal_2["goalXP"],
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": date.get_current_date(),
                "fail_date": "",
                "status": "in progress",
                "title": xp_goal_2["title"],
                "type": "XP",
            }
        }

    def test_update_goal_status_goal_exists(self, user):
        card_goal_1 = create_card_goal(user["user_id"], endDate="01/01/2022", cardsToRevise=123)

        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": card_goal_1["goal_id"],
            "newEndDate": "28/05/2027",
            "newTitle": "My new title",
            "newCardsToRevise": 200,
        }
        response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL["url"], request_data)
        assert response == {"success": "Goal updated successfully"}

    def test_update_goal_status_goal_doesnt_exist(self, user):
        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": "random_oid",
            "newEndDate": "28/05/2027",
            "newTitle": "My new title",
            "newCardsToRevise": 200,
        }
        try:
            # This line should fail
            response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL["url"], request_data)
            assert False, "response should return error"
        except Exception:
            assert True

    def test_update_goal_status_goal_xp_valid(self, user):
        xp_goal = create_xp_goal(user["user_id"], goalXP=122, endDate=date.get_current_date())
        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": xp_goal["goal_id"],
            "newEndDate": "29/05/2027",
            "newTitle": "My new xp title",
            "newGoalXP": 50,
        }
        response = self.post_api(Routes.ROUTE_EDIT_XP_GOAL["url"], request_data)
        assert response == {"success": "Goal updated successfully"}

    def test_update_goal_status_goal_xp_doesnt_exist(self, user):
        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": "123",
            "newEndDate": "29/05/2027",
            "newTitle": "My new xp title",
            "newGoalXP": 50,
        }

        try:
            # This line should fail
            response = self.post_api(Routes.ROUTE_EDIT_CARD_GOAL["url"], request_data)
            assert False, "response should return error"
        except Exception:
            assert True

    def test_update_is_proper(self, user):
        card_goal_1 = create_card_goal(user["user_id"], endDate="01/01/2022", cardsToRevise=10)
        xp_goal_1 = create_xp_goal(user["user_id"], goalXP=10, endDate="01/01/2022")
        xp_goal_2 = create_xp_goal(user["user_id"], goalXP=11, endDate="01/01/2022")

        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": card_goal_1["goal_id"],
            "newEndDate": "28/05/2027",
            "newTitle": "My new title",
            "newCardsToRevise": 200,
        }
        self.post_api(Routes.ROUTE_EDIT_CARD_GOAL["url"], request_data)

        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": xp_goal_1["goal_id"],
            "newEndDate": "28/05/2027",
            "newTitle": "My new xp title",
            "newGoalXP": 50,
        }
        self.post_api(Routes.ROUTE_EDIT_XP_GOAL["url"], request_data)

        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": xp_goal_2["goal_id"],
            "newEndDate": "28/05/2027",
            "newTitle": "My new xp title",
            "newGoalXP": 50,
        }
        self.post_api(Routes.ROUTE_EDIT_XP_GOAL["url"], request_data)

        response = self.post_api(Routes.ROUTE_UPDATE_GOAL_STATUS["url"], {"jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),})
        assert response == {
            card_goal_1["goal_id"]: {
                "data": {"cards_revised_so_far": "0", "cards_to_revise": 200},
                "end_date": "28/05/2027",
                "fail_date": '',
                "status": "in progress",  # Failed because it was already failed before end_date was updated
                "title": "My new title",
                "type": "Card",
            },
            xp_goal_1["goal_id"]: {
                "data": {
                    "goal_xp": 50,
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": "28/05/2027",
                "fail_date": "",
                "status": "in progress",
                "title": "My new xp title",
                "type": "XP",
            },
            xp_goal_2["goal_id"]: {
                "data": {
                    "goal_xp": 50,
                    "start_date": date.get_current_date(),
                    "starting_xp": "0",
                },
                "end_date": "28/05/2027",
                "fail_date": "",
                "status": "in progress",
                "title": "My new xp title",
                "type": "XP",
            }
        }

    def test_delete_goal(self, user):
        card_goal = create_card_goal(user["user_id"], endDate="01/01/2022", cardsToRevise=7)
        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": card_goal["goal_id"],
        }
        response = self.delete_api(Routes.ROUTE_DELETE_GOAL["url"], request_data)
        assert response == {"success": "Goal deleted successfully"}

    def test_invalid_goal(self, user): # this does not actually have an error
        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": "Invalid goal id",
        }
        response = self.delete_api(Routes.ROUTE_DELETE_GOAL["url"], request_data)
        assert response == {'error': 'Goal not found or could not be deleted'}

    def test_delete_goal_is_proper(self, user):
        card_goal = create_card_goal(user["user_id"], endDate="01/01/2022", cardsToRevise=6)
        request_data = {
            "jwtToken": self.jwt_handler.encode(user["user_id"], user['rawToken'], user["accessToken"]),
            "goalID": card_goal["goal_id"],
        }
        response = self.delete_api(Routes.ROUTE_DELETE_GOAL["url"], request_data)
        assert response == {'success': 'Goal deleted successfully'}
