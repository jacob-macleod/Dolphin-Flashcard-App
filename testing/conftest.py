import pytest
import os

from builders.user import create_user


@pytest.fixture
def user():
    return create_user()

@pytest.fixture
def flash_card():
    return
