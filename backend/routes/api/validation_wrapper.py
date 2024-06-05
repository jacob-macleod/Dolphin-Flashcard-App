"""Provides a wrapper function to validate the json of a request
"""
from functools import wraps
from flask import request, jsonify
from verification.api_error_checking import check_request_json

def validate_json(expected_format):
    """Wrapper function to validate the json of a request

    Args:
        expected_format (dict): The expected json format
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            result = check_request_json(expected_format, request.json)
            if result is not True:
                return jsonify(
                    {
                        "error": result
                        + ". The request should be in the format: "
                        + str(expected_format)
                    }), 400
            return func(*args, **kwargs)
        return wrapper
    return decorator
