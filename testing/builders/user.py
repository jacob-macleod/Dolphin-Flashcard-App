import random

from backend.database.database import database as db


def create_user() -> dict:
    return db.users.create_user(name=f"Name {random.randint(-1000, 1000)}")
