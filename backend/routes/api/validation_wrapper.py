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
            try:
                result = check_request_json(expected_format, request.json)
                # Check the json
                if result is not True:
                    return (
                        jsonify(
                            {
                                "error": result
                                + ". The request should be in the format: "
                                + str(expected_format)
                            }
                        ),
                        400,
                    )
                # If the request needs authenticating (if it has jwtToken in the format)
                if "jwtToken" in expected_format:
                    # Get the user ID from the jwt wrapper
                    jwt = JwtHandler()
                    jwt_token = request.json.get("jwtToken")
                    decoded_token = jwt.decode(jwt_token)

                    if decoded_token is None:
                        return (
                            jsonify({"error": f"Invalid JWT token '{jwt_token}'"}),
                            403,
                        )

                    user_id = decoded_token["userID"]

                    # Add the user ID to request.json
                    request.json["userID"] = user_id
            except Exception as e:
                return jsonify({"error": str(e)}), 500

            return func(*args, **kwargs)

        return wrapper

    return decorator

def validate_form(expected_format):
    """Wrapper function to validate the form data of a request

    Args:
        expected_format (dict): The expected form format
    """

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                if not request.form:
                    return jsonify({"error": "No form data provided"}), 400
                
                for key in expected_format:
                    if key != "file" and key not in request.form and expected_format[key] != "":
                        return jsonify({
                            "error": f"Missing field: {key}. The request should be in the format: {str(expected_format)}"
                        }), 400
                
                if "file" in expected_format and "file" not in request.files:
                    return jsonify({
                        "error": f"Missing file. The request should include a file."
                    }), 400
                
                if "jwtToken" in expected_format:
                    jwt = JwtHandler()
                    jwt_token = request.form.get("jwtToken")
                    decoded_token = jwt.decode(jwt_token)

                    if decoded_token is None:
                        return (
                            jsonify({"error": f"Invalid JWT token '{jwt_token}'"}),
                            403,
                        )

                    user_id = decoded_token["userID"]

                    
                    kwargs["user_id"] = user_id
            except Exception as e:
                return jsonify({"error": str(e)}), 500

            return func(*args, **kwargs)

        return wrapper

    return decorator
