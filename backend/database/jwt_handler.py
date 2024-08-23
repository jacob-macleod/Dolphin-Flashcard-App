"""
Handle the JWT token
"""

import time
from authlib.jose import jwt
from authlib.jose.errors import InvalidClaimError

class JwtHandler:
    """
    Package values using JWT
    """
    def __init__(self):
        self._private_key = {
            "crv": "P-256",
            "kty": "EC",
            "alg": "ES256",
            "use": "sig",
            "kid": "a32fdd4b146677719ab2372861bded89",
            "d": "5nYhggWQzfPFMkXb7cX2Qv-Kwpyxot1KFwUJeHsLG_o",
            "x": "-uTmTQCbfm2jcQjwEa4cO7cunz5xmWZWIlzHZODEbwk",
            "y": "MwetqNLq70yDUnw-QxirIYqrL-Bpyfh4Z0vWVs_hWCM",
        }
        self._public_key = {
            "crv": "P-256",
            "kty": "EC",
            "alg": "ES256",
            "use": "sig",
            "kid": "a32fdd4b146677719ab2372861bded89",
            "x": "-uTmTQCbfm2jcQjwEa4cO7cunz5xmWZWIlzHZODEbwk",
            "y": "MwetqNLq70yDUnw-QxirIYqrL-Bpyfh4Z0vWVs_hWCM"
        }
        self._aud = "api"
        self._iss = "http://dolphinflashcards.com"
        self._header = {"alg": "ES256"}

    def encode(
        self,
        user_id: str,
        access_token: str,
        iat=int(time.time()),
        exp=int(time.time()) + 604800,
    ):
        """
        Package a json payload using a Json Web Token

        Args:
            user_id (str): The user ID to package
            access_token (str): The access token to package
            iat (int, optional): The time the token was issued at. Defaults to int(time.time()).
            exp (int, optional): The time the token expires. Defaults to int(time.time())+604800 - 7 days in the future.
        """
        payload = {
            "iss": self._iss,
            "aud": self._aud,
            "sub": user_id,
            "access_token": access_token,
            "exp": exp,
            "iat": iat
        }
        return str(jwt.encode(self._header, payload, self._private_key), encoding="utf-8")

    def decode(self, token:bytes):
        """
        Decode a JWT token

        Args:
            token (bytes): The jwt token
        """
        token = bytes(token, "utf-8")
        claims_options = {
            "iss": { "essential": True, "value": self._iss },
            "aud": { "essential": True, "value": self._aud }
        }
        claims = jwt.decode(token, self._public_key, claims_options=claims_options)
        try:
            claims.validate()
            return {
                "userID": claims["sub"],
                "accessToken": claims["access_token"]
            }
        except InvalidClaimError:
            return None
