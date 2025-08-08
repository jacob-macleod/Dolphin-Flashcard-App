"""Provides utility classes for interacting with the quests database
"""

from database.handlers.database_handler import DatabaseHandler
from werkzeug.exceptions import BadRequest, Conflict, Forbidden, NotFound, Unauthorized, UnprocessableEntity
from datetime import datetime


class Quests(DatabaseHandler):
    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="quests")

    def _get_quests_and_participants(self, quest_document):
        """Local function to manage the quest return 

        Args:
            quest_document (dataclass): A quest dataclass where is participants collection

        Returns:
            dict: Quest data and participants from the quest
        """
        return {
            "quest_id": quest_document.id,
            **quest_document.get().to_dict(),
            "participants": [participant.to_dict() for participant in quest_document.collection("participants").stream()]
        }

    def get_quests(
        self,
        user_id,
        quest_type,
        quest_sub_type,
        quest_status
    ):
        """Class to get quest and your participants based in filters

        Args:
            user_id (str): The ID from the login user
            quest_type (str): Quest type to filter the quests.
                If is None filter all quest types or filter based in the following options: cards_revised|xp_gained|time_spent
            quest_sub_type (str): The quest sub type, that is another type to filter quests.
                If is None filter all quest types or filter based in the following options: monthly|friend
            quest_status (str): Field to filter the quest status based in deadline db field.
                If is None filter all quest types or filter based in the following options: active|finished
                Active to the quests that not passed from the deadline.
                Finished to quests that passed from deadline.

        Returns: 
            list: All quests from the user id and your participants
        """
        user_quests =  self._context.collection_group('participants').where("user_id", "==", user_id).stream()

        quests = []
        for user_quest in user_quests:
            quest_document = user_quest.reference.parent.parent

            quest = quest_document.get().to_dict()
            validate_status = "active" if datetime.fromisoformat(quest["deadline"]) > datetime.now() else "finished"

            quest_type_filter = not quest_type or quest["quest_type"] == quest_type
            quest_sub_type_filter = not quest_sub_type or quest["quest_sub_type"] == quest_sub_type
            quest_status_filter = not quest_status or quest_status == validate_status

            if quest_type_filter and quest_sub_type_filter and quest_status_filter:
                quests.append(self._get_quests_and_participants(quest_document))

        return quests

    def create_quest(
        self,
        user_id,
        deadline,
        quest_type,
        quest_sub_type,
        quantity,
    ):
        """Create quests and add the user as participant from the quest 

        Args:
            user_id (str): The ID from the login user
            deadline (str): The deadline date quests in isoformat
            quest_type (str): Quest type to filter the quests.
                If is None filter all quest types or filter based in the following options: cards_revised|xp_gained|time_spent
                Field that define the title from the quest
            quest_sub_type (str): The quest sub type, that is another type to filter quests.
                If is None filter all quest types or filter based in the following options: monthly|friend
            quantity (int): The quantity from a given type

        Returns:
            dict: Created quest and the created participant
        """
        if quest_type == 'cards_revised':
            title = f"Revise {quantity} flashcards"
        elif quest_type == 'xp_gained':
            title = f"Gain {quantity} XP"
        elif quest_type == 'time_spent':
            title = f"Spend {quantity} minutes in dolphin flashcards"
        else:
            raise UnprocessableEntity(f'quest_type: "{quest_type}" is not accepted')

        try:
            deadline_datetime = datetime.fromisoformat(deadline)
        except ValueError as err:
            raise UnprocessableEntity(f'deadline: "{deadline}" is not a valid ISO format') from err

        if deadline_datetime < datetime.now():
            raise BadRequest("Deadline datetime must not be in the past")


        created_quest = self._context.collection("quests").add({
            "title": title,
            "deadline": deadline,
            "quest_type": quest_type,
            "quest_sub_type": quest_sub_type,
            "quantity": quantity,
            "progress": 0,
        })[1]

        created_quest.collection("participants").document(user_id).set({
            "isOwner": True,
            "user_id": user_id,
            "status": "accepted",
            "progress": 0
        })

        return self._get_quests_and_participants(created_quest)

    def delete_quest(
        self,
        user_id,
        quest_id
    ):
        """Delete a quest
        
        Args:
            user_id (str): The ID from the login user
            quest_id (str): The ID from quest
        """
        quest_document = self._context.collection("quests").document(quest_id)
        user_is_quest_owner = quest_document.collection("participants").document(user_id).get().to_dict()["isOwner"]

        if not user_is_quest_owner:
            raise Unauthorized("User can not delete this quest")

        participants = quest_document.collection("participants").list_documents()

        for participant in participants:
            participant.delete()

        quest_document.delete()

    def quest_progress(
        self,
        user_id,
        quest_id,
        progress,

    ):
        """Add the progress from a quest and to the user who contributed to this quest

        Args:
            user_id (str): The ID from the login user
            quest_id (str): The ID from quest
            progress (int): The plus progress to the quest

        Returns:
            dict: The quest with the updated progress
        """
        quest = self._context.collection("quests").document(quest_id)
        user_progress = quest.collection("participants").document(user_id)

        if not user_progress.get().to_dict():
            raise Forbidden("User not in this quest to update progress")

        if user_progress.get().to_dict()["status"] != "accepted":
            raise Forbidden("User not accept the invite to this quest")

        quest.update({"progress": quest.get().to_dict()["progress"] + progress})
        user_progress.update({"progress": user_progress.get().to_dict()["progress"] + progress})

        return self._get_quests_and_participants(quest)

    def quest_invite(
        self,
        user_id,
        invited_id,
        quest_id
    ):
        """Invite a user from a quest

        Args:
            user_id (str): The ID from the login user, who invited
            invited_id (str): The ID from the user witch was invited
            quest_id (str): The ID from quest
        """
        if not self._context.collection("users").document(invited_id).get().to_dict():
            raise NotFound("User that you trying to invite not exist")

        quest = self._context.collection("quests").document(quest_id)

        if not quest.collection("participants").document(user_id).get().to_dict():
            raise Conflict("User is not in this quest to invite someone")

        if quest.collection("participants").document(invited_id).get().to_dict():
            raise Conflict("Invited user already in this quest")

        quest.collection("participants").document(invited_id).set({
            "invited_by": user_id,
            "user_id": invited_id,
            "status": "pending",
            "progress": 0
        })

    def quest_update_invite(
        self,
        user_id,
        quest_id,
        status
    ):
        """Update the status from invite

        Args:
            user_id (str): The ID from the login user, who accepted or declined the invite
            quest_id (str): The ID from quest
            status (str): The status from invite.
                Valid options from status: accepted|pending|declined
        """
        quest = self._context.collection("quests").document(quest_id)

        if not quest.collection("participants").document(user_id).get().to_dict():
            raise Forbidden("User not invited to this quest")

        quest.collection("participants").document(user_id).update({
            "status": status,
        })
