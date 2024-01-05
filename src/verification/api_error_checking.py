""" Contains functions for checking API requests are valid """
import json
import re

def check_request_json(expected_format, request):
    """Checks if the keys in the request match the keys in the expected format"""
    try:
        # Load the expected format JSON string to compare keys
        expected_format_json = json.loads(expected_format)

        # Extract keys from the expected format
        expected_keys = set(expected_format_json.keys())

        # Extract keys from the request dictionary
        request_keys = set(request.keys())

        # Check each key in the expected format
        for key, value in expected_format_json.items():
            if key not in request:
                if value == "":
                    continue  # Accept any value if the expected value is a blank string
                else:
                    return f"Key '{key}' not found in the request"

            # If expected value is a blank string, accept any value in request
            if value == "":
                continue

            # Parse value in expected format as a regex pattern and check against the request value
            pattern = re.compile(value)
            if not pattern.match(str(request[key])):
                return f"Value for key '{key}' does not match the expected pattern"

        # Check if there are any extra keys in the request that were not in the expected format
        if not request_keys.issubset(expected_keys):
            extra_keys = request_keys - expected_keys
            return f"Extra keys found in request: {', '.join(extra_keys)}"

        return True  # All checks passed

    except json.JSONDecodeError as e:
        return f"JSON decoding error: {e}"
    
    except Exception as ex:
        return f"An error occurred: {ex}"
