"""Provides a wrapper function to validate the json of a request
"""
from functools import wraps
from flask import request, jsonify
from verification.api_error_checking import check_request_json
from database.jwt_handler import JwtHandler

def validate_json(expected_format):
    """Wrapper function to validate the json of a request

    Args:
        expected_format (dict): The expected json format
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            result = check_request_json(expected_format, request.json)
            # Check the json
            if result is not True:
                return jsonify(
                    {
                        "error": result
                        + ". The request should be in the format: "
                        + str(expected_format)
                    }), 400
            # If the request needs authenticating (if it has jwtToken in the format)
            if "jwtToken" in expected_format:
                #return jsonify({"error": "Invalid JWT token"}), 403
                # Get the user ID from the jwt wrapper
                jwt = JwtHandler()
                jwt_token = request.json.get("jwtToken")
                decoded_token = jwt.decode(jwt_token)

                if decoded_token is None:
                    return jsonify({"error": f"Invalid JWT token '{jwt_token}'"}), 403

                user_id = decoded_token["userID"]

                # Add the user ID to request.json
                request.json["userID"] = user_id
            return func(*args, **kwargs)
        return wrapper
    return decorator
