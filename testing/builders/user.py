import random

from backend.database.database import database as db

_AUTO_ID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"


def create_user() -> dict:
    user_dict = {
        "user_id": "".join(random.choice(_AUTO_ID_CHARS) for _ in range(20)),  # random id,
        "name": f"Name {random.randint(-1000, 1000)}"
    }
    db.users.create_user(**user_dict)
    return
