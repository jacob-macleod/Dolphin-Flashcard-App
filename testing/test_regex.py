import re
import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "..", "backend")
sys.path.append(src_path)
from routes.api.regex_patterns import (
    REVIEW_STATUS_REGEX,
    DATE_REGEX,
    NUMBER,
    CARD_STATUS,
)


def test_review_status():
    """Test the review status regex pattern"""

    # Valid review status
    assert re.match(REVIEW_STATUS_REGEX, "3.14") is not None

    # Valid review status
    assert re.match(REVIEW_STATUS_REGEX, "0.5") is not None

    # Valid review status
    assert re.match(REVIEW_STATUS_REGEX, "123.456") is not None

    # Invalid review status
    assert re.match(REVIEW_STATUS_REGEX, ".789") is None

    # Invalid review status
    assert re.match(REVIEW_STATUS_REGEX, "42.") is None

    # Invalid review status
    assert re.match(REVIEW_STATUS_REGEX, "123") is None

    # Invalid review status
    assert re.match(REVIEW_STATUS_REGEX, "abc") is None


def test_date():
    """Test the date regex pattern"""

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


def test_positive_integer_pattern():
    """Test the positive integer regex pattern"""

    # Valid positive integer
    assert re.match(NUMBER, "123") is not None

    # Valid positive integer with leading zeros
    assert re.match(NUMBER, "00123") is not None

    # Valid positive integer as a string
    assert re.match(NUMBER, "456789") is not None

    # Invalid: Decimal point is present
    assert re.match(NUMBER, "12.34") is None

    # Invalid: Negative integer
    assert re.match(NUMBER, "-42") is None

    # Invalid: String with alphabetic characters
    assert re.match(NUMBER, "abc") is None

    # Invalid: Empty string
    assert re.match(NUMBER, "") is None

    # Invalid: String with special characters
    assert re.match(NUMBER, "!@#$%^") is None


def test_card_status_pattern():
    """Test the card status regex pattern"""

    # Valid card status: "right"
    assert re.match(CARD_STATUS, "right") is not None

    # Valid card status: "wrong"
    assert re.match(CARD_STATUS, "wrong") is not None

    # Valid card status: "easy"
    assert re.match(CARD_STATUS, "easy") is not None

    # Invalid: Mixed case
    assert re.match(CARD_STATUS, "Right") is None

    # Invalid: Extra characters
    assert re.match(CARD_STATUS, "right123") is None

    # Invalid: Empty string
    assert re.match(CARD_STATUS, "") is None

    # Invalid: Different word
    assert re.match(CARD_STATUS, "difficult") is None
