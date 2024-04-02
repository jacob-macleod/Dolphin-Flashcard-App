""" Contains functions for checking API requests are valid """
import json
import re

def dict_to_array(input_dict):
    """Convert a dictionary to an array of key-value pairs"""
    output_array = []
    # For each key in the dictionary
    for key in input_dict:
        # If the value is a dictionary
        if isinstance(input_dict[key], dict) :
            # Call the function recursively
            output_array.append([key, dict_to_array(input_dict[key])])
        else :
            # Otherwise, add the key-value pair to the array
            output_array.append([key])

    return output_array

def append_items_to_array(dictionary, result=[]):
    """ Append all values of dictionary to an array """

    for key, value in enumerate(dictionary):
        if isinstance(value, dict) or isinstance(value, list):
            append_items_to_array(value, result)
        else:
            result.append(value)
    return result

def check_request_json(expected_format, request):
    """Checks if the keys in the request match the keys in the expected format"""
    # Make an array of the expected keys and actual keys
    expected_format_arr = dict_to_array(expected_format)
    request_arr = dict_to_array(request)
    keys_correct = expected_format_arr == request_arr

    # If the keys of both match
    if keys_correct:
        expected_values = append_items_to_array(expected_format, result = [])
        request_values = append_items_to_array(request, result = [])

        # Check if the values match the expected format
        for i, expected_value in enumerate(expected_values):
            if not re.match(expected_value, request_values[i]):
                return "Value for '" + expected_values[i] + "' does not match the expected pattern '" + request_values[i] + "'"
    else:
        return "Your supplied json keys do not match the expected format"

    return True
