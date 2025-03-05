import requests
import json

from main import server_addr
from database.jwt_handler import JwtHandler
from api_routes import Routes

HEADERS = {"Content-Type": "application/json"}


class BaseApiActionsMixin:
    @property
    def jwt_handler(self):
        return JwtHandler()

    def get_api(self, route: str, data: dict = None) -> dict:
        """
        Simple get method to not repeat "get" everytime
        """

        response = requests.get(
            f"http://127.0.0.1:{server_addr[1]}{route}",
            headers=HEADERS,
            data=json.dumps(data),
            timeout=5,
        )

        assert response.status_code != 500, f"""An unhandled exception caused an Internal Server Error ({response.status_code}) in {route}"""

        return json.loads(response.text)

    def post_api(self, route: str, data: dict) -> dict:
        """
        Simple post method to not repeat "post" everytime
        """

        response = requests.post(
            f"http://127.0.0.1:{server_addr[1]}{route}",
            data=json.dumps(data),
            headers=HEADERS,
            timeout=5,
        )

        assert response.status_code != 500, f"""An unhandled exception caused an Internal Server Error ({response.status_code}) in {route}"""

        return json.loads(response.text)

    def delete_api(self, route: str, data: dict) -> dict:
        """
        Simple delete method to not repeat "delete" everytime
        """

        response = requests.delete(
            f"http://127.0.0.1:{server_addr[1]}{route}",
            data=json.dumps(data),
            headers=HEADERS,
            timeout=5,
        )

        assert response.status_code != 500, f"""An unhandled exception caused an Internal Server Error ({response.status_code}) in {route}"""

        return json.loads(response.text)

    def create_user(self, user_id: str):
        """
        Create a user

        Args:
            user_id (str): The user ID to create
        """
        valid_dummy = {"userID": user_id, "displayName": "Dummy", "rawAccessToken": "test",
                       "accessToken": "4be0643f-1d98-573b-97cd-ca98a65347dd", "idToken": ""}

        response = self.post_api(Routes.ROUTE_CREATE_ACCOUNT["url"], valid_dummy)
        response_json = response[0]
        return response_json["token"]
