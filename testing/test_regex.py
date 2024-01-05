import re
import sys
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, '..', 'src')
sys.path.append(src_path)
from routes.api.regex_patterns import REVIEW_STATUS_REGEX, DATE_REGEX

def test_review_status() :
    """ Test the review status regex pattern """

    # Valid date
    assert re.match(DATE_REGEX, "31/01/2023") is not None

    # Invalid day
    assert re.match(DATE_REGEX, "35/01/2023") is None

    # Invalid month
    assert re.match(DATE_REGEX, "12/13/2022") is None

    # Invalid year format
    assert re.match(DATE_REGEX, "12/12/22") is None

    # Invalid separator
    assert re.match(DATE_REGEX, "31-01-2023") is None

    # Invalid format
    assert re.match(DATE_REGEX, "1/1/2022") is None
