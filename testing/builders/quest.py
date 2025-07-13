import os, sys
from datetime import date, timedelta

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "../..", "backend")
sys.path.append(src_path)

from database.database import database as db

def create_new_quest(
        user_id=None,
        deadline = date.today() + timedelta(weeks=4),
        quest_type='cards_revised',
        quest_sub_type='friend',
        quantity=100,
        bunch=1
    ):

    quests = []
    for _ in range(bunch):
        quest = db.quests.create_quest(
            user_id,
            deadline.isoformat(),
            quest_type,
            quest_sub_type,
            quantity,
        )
        quests.append(quest)

    return quests