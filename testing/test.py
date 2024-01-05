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
    assert result == 'Extra keys found in request: key1, key2' or result == 'Extra keys found in request: key2, key1'

    # Test with valid regex pattern
    expected_format = '''
        {
            "name": "",
            "age": "\\\\d+",
            "email": "[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\\\.[a-zA-Z0-9-.]+"
        }
    '''
    request_data = {
        "name": "John Doe",
        "age": "30",
        "email": "john@example.com",
    }
    result = check_request_json(expected_format, request_data)
    assert result is True

    # Test with invalid regex pattern
    expected_format = '''
    {
        "name": "",
        "age": "\\\\d{3}",
        "email": "[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\\\.[a-zA-Z0-9-.]+"
    }
    '''
    result = check_request_json(expected_format, request_data)
    assert result == "Value for key 'age' does not match the expected pattern"
