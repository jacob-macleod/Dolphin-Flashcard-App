import pytest

from builders.user import create_user


@pytest.fixture
def user():
    return create_user()
