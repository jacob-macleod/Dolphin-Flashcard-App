""" Includes all tests for the project """
import sys
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, '..', 'src')
sys.path.append(src_path)
from verification.api_error_checking import check_request_json

def test_check_request_json() :
    """ Check the check_request_json function works as expected """

    # Test with a valid request
    result = check_request_json(
        '{"key1": "", "key2": ""}',
        {"key1": "", "key2": ""}
    )

    assert result is True

    # Test with a valid request but keys have different values
    result = check_request_json(
        '{"key1": "val1", "key2": "value2"}',
        {"key1": "", "key2": ""}
    )

    assert result == "Value for key 'key1' does not match the expected pattern"

    # Test with a valid request but keys are in different order
    result = check_request_json(
        '{"key2": "", "key1": ""}',
        {"key1": "", "key2": ""}
    )
    assert result is True

    # Test with valid keys and some extra ones
    result = check_request_json(
        '{"key1": "", "key2": "", "key3": ""}',
        {"key1": "", "key2": ""}
    )
    assert result is True

    # Test with invalid keys
    result = check_request_json(
        '{"key3": "", "key4": ""}',
        {"key1": "", "key2": ""}
    )
    print (result)
    print ('Extra keys found in request: key1, key2')
    assert result == 'Extra keys found in request: key1, key2'
