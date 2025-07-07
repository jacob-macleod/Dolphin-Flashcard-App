from test_api.base import BaseApiActionsMixin
from builders.quest import create_new_quest
from datetime import datetime, date, timedelta

class TestQuest(BaseApiActionsMixin):
    def test_get_quests_from_specifics_type(self, user):
        quests = create_new_quest(user_id=user['user_id'], quest_type='cards_revised')

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.get_api(
            route='/api/get-quests?questType=cards_revised',
            data={'jwtToken': jwt_token}
        )

        assert response["quests"][0]["quest_type"] == quests[0]["quest_type"]

    def test_get_quests_from_specifics_sub_type(self, user):
        quests = create_new_quest(user_id=user['user_id'], quest_sub_type='friend')

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.get_api(
            route='/api/get-quests?questSubType=friend',
            data={'jwtToken': jwt_token}
        )

        assert response["quests"][0]["quest_sub_type"] == quests[0]["quest_sub_type"]

    def test_get_quests_from_specifics_status(self, user):
        create_new_quest(user_id=user['user_id'])

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.get_api(
            route='/api/get-quests?questStatus=active',
            data={'jwtToken': jwt_token}
        )

        assert datetime.fromisoformat(response["quests"][0]["deadline"]) > datetime.now()

    def test_get_all_quests(self, user):
        bunch_quests = 5
        create_new_quest(user_id=user['user_id'], bunch=bunch_quests)

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.get_api(
            route='/api/get-quests',
            data={'jwtToken': jwt_token}
        )

        assert len(response["quests"]) == bunch_quests

    def test_create_quest(self, user):
        data = {
            "deadline": (date.today() + timedelta(weeks=4)).isoformat(),
            "questType": "xp_gained",
            "questSubType": "friend",
            "quantity": 100,
        }

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.post_api(
            route='/api/create-quest',
            data={'jwtToken': jwt_token, **data}
        )

        assert response["message"] == "Quest created successfully"
        assert response["quest"] == {
            'deadline': data["deadline"],
            'participants': [
                {'isOwner': True, 'progress': 0, 'status': 'accepted', 'user_id': user["user_id"]}
            ],
            'progress': 0, 
            'quantity': data["quantity"],
            'quest_id': response["quest"]["quest_id"],
            'quest_sub_type': data["questSubType"],
            'quest_type': 'xp_gained',
            'title': 'Gain 100 XP'
        }

    def test_delete_quest(self, user):
        quests = create_new_quest(user_id=user['user_id'])

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.delete_api(
            route='/api/delete-quest',
            data={'jwtToken': jwt_token, "questId": quests[0]["quest_id"]}
        )

        assert response["message"] == "Quest deleted successfully"

    def test_update_progress(self, user):
        quests = create_new_quest(user_id=user['user_id'])

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.patch_api(
            route='/api/quest/progress',
            data={'jwtToken': jwt_token, "questId": quests[0]["quest_id"], "progress": 30}
        )

        assert response["message"] == "Progress updated"
        assert response["quest"]["progress"] == 30
        assert response["quest"]["participants"][0]["progress"] == 30

    def test_invite(self, user):
        quests = create_new_quest(user_id=user['user_id'])
        self.create_user("test_user")

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        response = self.post_api(
            route='/api/quest/invite',
            data={
                'jwtToken': jwt_token,
                "questId": quests[0]["quest_id"],
                "invitedId": "test_user"
            }
        )

        assert response["message"] == "User invited"

    def test_update_invite_status(self, user):
        quests = create_new_quest(user_id=user['user_id'])
        jwt_new_user = self.create_user("test_user")

        jwt_token = self.jwt_handler.encode(
            user["user_id"], user["rawToken"], user["accessToken"]
        )

        self.post_api(
            route='/api/quest/invite',
            data={
                'jwtToken': jwt_token,
                "questId": quests[0]["quest_id"],
                "invitedId": "test_user"
            }
        )

        response = self.patch_api(
            route='/api/quest/status-invite',
            data={
                'jwtToken': jwt_new_user,
                "questId": quests[0]["quest_id"],
                "status": "accepted"
            }
        )

        assert response["message"] == "User status updated"
