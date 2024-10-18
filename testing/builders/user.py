import os
import random
import sys
import uuid

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "../..", "backend")
sys.path.append(src_path)

from classes.date import Date
from database.database import database as db

_AUTO_ID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

date = Date()
def create_user() -> dict:
    user_dict = {
        "user_id": "".join(random.choice(_AUTO_ID_CHARS) for _ in range(20)),  # random id,
        "name": f"Name {random.randint(-1000, 1000)}"
    }
    db.users.create_user(**user_dict)
    db.statistics.create_new_user_stats(user_dict["user_id"], date.get_current_date().replace('/', '-'))
    user_dict['rawToken'] = "access_token_raw"
    user_dict['accessToken'] = str(uuid.uuid5(uuid.NAMESPACE_DNS, "access_token_raw"))
    return user_dict
