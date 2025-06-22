from routes.api.regex_patterns import DATE_REGEX, NUMBER, QUEST_TYPE, INVITE_STATUS, QUEST_SUB_TYPE
from flask import Blueprint, request, jsonify
from routes.api.validation_wrapper import validate_json
from database.database import database as db
from werkzeug.exceptions import BadRequest, Conflict, Forbidden, NotFound, Unauthorized, UnprocessableEntity

CREATE_QUEST_FORMAT = {
    "jwtToken": "",
    "deadline": DATE_REGEX,
    "questType": QUEST_TYPE,
    "questSubType": QUEST_SUB_TYPE,
    "quantity": NUMBER,
}

DELETE_QUEST_FORMAT = {
    "jwtToken": "",
    "questId": "",
}

GET_QUEST_FORMAT = {
    "jwtToken": "",
}

UPDATE_PROGRESS_FORMAT = {
    "jwtToken": "",
    "questId": "",
    "progress": NUMBER,
}

STATUS_INVITE_QUEST_FORMAT = {
    "jwtToken": "",
    "questId": "",
    "status": INVITE_STATUS
}

INVITE_TO_QUEST_FORMAT = {
    "jwtToken": "",
    "questId": "",
    "invitedId": "",
}

quest_routes = Blueprint("quest_routes", __name__)

@quest_routes.route('/api/get-quests', methods=['GET'])
@validate_json(GET_QUEST_FORMAT)
def get_quests():
    """Get all quests based in query params questType, questSubType and questStatus"""
    try:
        user_id = request.json.get("userID")
        quest_type = request.args.get("questType")
        quest_sub_type = request.args.get("questSubType")
        quest_status = request.args.get("questStatus")

        data = db.quests.get_quests(
            user_id,
            quest_type,
            quest_sub_type,
            quest_status
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"quests": data}), 200

@quest_routes.route('/api/create-quest', methods=['POST'])
@validate_json(CREATE_QUEST_FORMAT)
def create_quest():
    """Create the quest"""
    try:
        user_id = request.json.get("userID")
        deadline = request.json.get("deadline")
        quest_type = request.json.get("questType")
        quest_sub_type = request.json.get("questSubType")
        quantity = request.json.get("quantity")

        data = db.quests.create_quest(
            user_id,
            deadline,
            quest_type,
            quest_sub_type,
            quantity
        )
    except UnprocessableEntity as e:
        return jsonify({"error": str(e)}), 422

    except BadRequest as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Quest created successfully", "quest": data}), 200

@quest_routes.route('/api/delete-quest', methods=['DELETE'])
@validate_json(DELETE_QUEST_FORMAT)
def delete_quest():
    """Delete a quest"""
    try:
        user_id = request.json.get("userID")
        quest_id = request.json.get("questId")

        db.quests.delete_quest(
            user_id,
            quest_id
        )
    except Unauthorized as e:
        return jsonify({"error": str(e)}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Quest deleted successfully"}), 200

@quest_routes.route('/api/quest/progress', methods=['PATCH'])
@validate_json(UPDATE_PROGRESS_FORMAT)
def quest_progress():
    """Update the quests and user progress"""
    try:
        user_id = request.json.get("userID")
        quest_id = request.json.get("questId")
        progress = request.json.get("progress")

        data = db.quests.quest_progress(
            user_id,
            quest_id,
            progress,
        )
    except Forbidden as e:
        return jsonify({"error": str(e)}), 403

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Progress updated", "quest": data}), 200

@quest_routes.route('/api/quest/invite', methods=['POST'])
@validate_json(INVITE_TO_QUEST_FORMAT)
def quest_invite():
    """Invite user from a quest"""
    try:
        user_id = request.json.get("userID")
        quest_id = request.json.get("questId")
        invited_id = request.json.get("invitedId")

        db.quests.quest_invite(
            user_id,
            invited_id,
            quest_id
        )
    except NotFound as e:
        return jsonify({"error": str(e)}), 404

    except Conflict as e:
        return jsonify({"error": str(e)}), 409

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "User invited"}), 200

@quest_routes.route('/api/quest/status-invite', methods=['PATCH'])
@validate_json(STATUS_INVITE_QUEST_FORMAT)
def update_quest_invite_status():
    """Update the invite status"""
    try:
        user_id = request.json.get("userID")
        quest_id = request.json.get("questId")
        status = request.json.get("status")

        db.quests.quest_update_invite(
            user_id,
            quest_id,
            status
        )
    except Forbidden as e:
        return jsonify({"error": str(e)}), 403

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "User status updated"}), 200
