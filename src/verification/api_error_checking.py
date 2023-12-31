""" Contains functions for checking API requests are valid """
import json

def check_request_json(expected_format, request) :
    """Checks if the keys in the request match the keys in the expected format"""
    try:
        # Load the expected format JSON string to compare keys
        expected_format_json = json.loads(expected_format)

        # Extract keys from the expected format
        expected_keys = set(expected_format_json.keys())

        # Extract keys from the request dictionary
        request_keys = set(request.keys())

        # Compare the keys
        if expected_keys == request_keys:
            return True
        else:
            return False
    except json.JSONDecodeError as e:
        print(f"JSON decoding error: {e}")
        return False
    except Exception as ex:
        print(f"An error occurred: {ex}")
        return False
