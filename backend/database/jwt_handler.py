import time
import json
import uuid
from authlib.jose import jwt
from authlib.jose.errors import InvalidClaimError, DecodeError
from database.database_config import jwt_key_type

class JwtHandler:
    """
    Singleton class to handle JWT tokens.
    """
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(JwtHandler, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, '_initialized'):
            if jwt_key_type=="testing":
                # Set the default private key
                print ("Using default JWT key")
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
            elif jwt_key_type=="production":
                # Read the private key from jwt_key.json
                print ("Reading JWT key from jwt_key.json")
                with open("jwt_key.json", "r", encoding="utf-8") as jwt_file:
                    self._private_key = json.load(jwt_file)

                self._public_key = {
                    "crv": "P-256",
                    "key_ops": [
                        "verify"
                    ],
                    "kty": "EC",
                    "x": "wyNJvi0HZA4-qC0gf4HGGw2J3J5AlzeAwXwQ09oEotU",
                    "y": "Kksz1z_y9jUDVSZ7HiOZqEdTY4c_xbcHSUYr5-P7FI4",
                    "alg": "ES256",
                    "use": "sig",
                    "kid": "6d7b8cab4d5b8c4cfd9f214a53924b00"
                }
            else:
                raise ValueError(f"Invalid jwt_key_type {jwt_key_type} in database_config.py")
            self._aud = "api"
            self._iss = "http://dolphinflashcards.com"
            self._header = {"alg": "ES256"}

            self._initialized = True

    def encode(
        self,
        user_id: str,
        access_token_raw:str,
        access_token: str,
        iat=int(time.time()),
        exp=int(time.time()) + 604800,
    ):
        """
        Package a json payload using a Json Web Token

        Args:
            user_id (str): The user ID to package
            access_token_raw (str): The raw (unhashed) access token to package
            access_token (str): The (hashed) access token to package
            iat (int, optional): The time the token was issued at. Defaults to int(time.time()).
            exp (int, optional): The time the token expires. Defaults to int(time.time())+604800 - 7 days in the future.
        """
        payload = {
            "iss": self._iss,
            "aud": self._aud,
            "sub": user_id,
            "access_token": access_token,
            "access_token_raw": access_token_raw,
            "exp": exp,
            "iat": iat
        }
        return str(jwt.encode(self._header, payload, self._private_key), encoding="utf-8")

    def decode(self, token: str):
        """
        Decode a JWT token

        Args:
            token (str): The jwt token
        """
        token = bytes(token, "utf-8")
        claims_options = {
            "iss": {"essential": True, "value": self._iss},
            "aud": {"essential": True, "value": self._aud}
        }
        try:
            claims = jwt.decode(token, self._public_key, claims_options=claims_options)
            claims.validate()
            if claims["access_token"] != str(uuid.uuid5(uuid.NAMESPACE_DNS, claims["access_token_raw"])):
                return None
            return {
                "userID": claims["sub"],
                "accessTokenRaw": claims["access_token_raw"],
                "accessToken": claims["access_token"]
            }
        except (InvalidClaimError, DecodeError):
            return None
