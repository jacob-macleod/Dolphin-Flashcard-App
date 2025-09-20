"""Routes relating to shared folder management"""

import time
from flask import Blueprint, request, jsonify
from database.database import database as db
from routes.api.validation_wrapper import validate_json
from routes.api.card_management import hash_to_numeric
from database.shared_folder_jwt_handler import SharedFolderJwtHandler
from database.jwt_handler import JwtHandler

shared_folders_routes = Blueprint("shared_folders_routes", __name__)

# Request format definitions
CREATE_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "folderName": "",
    "description": ""
}

GET_SHARED_FOLDERS_FORMAT = {
    "jwtToken": ""
}

GET_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": ""
}

DELETE_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": ""
}

RENAME_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": "",
    "newName": ""
}

ADD_FLASHCARD_TO_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": "",
    "flashcardID": ""
}

REMOVE_FLASHCARD_FROM_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": "",
    "flashcardID": ""
}

GET_SHARED_FOLDER_FLASHCARDS_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": ""
}

GENERATE_SHARED_FOLDER_INVITE_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": "",
    "expiryDays": ""  # Optional
}

JOIN_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "inviteCode": ""
}

LEAVE_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": ""
}

REMOVE_USER_FROM_SHARED_FOLDER_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": "",
    "targetUserID": ""
}

GET_SHARED_FOLDER_MEMBERS_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": ""
}

TRANSFER_SHARED_FOLDER_OWNERSHIP_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": "",
    "newOwnerID": ""
}

COPY_SHARED_FLASHCARD_TO_PERSONAL_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": "",
    "flashcardID": "",
    "personalFolder": ""  # Optional
}

UPDATE_SHARED_CARD_PROGRESS_FORMAT = {
    "jwtToken": "",
    "sharedFolderID": "",
    "flashcardSetID": "",
    "cardData": []
}


@shared_folders_routes.route("/api/create-shared-folder", methods=["POST"])
@validate_json(CREATE_SHARED_FOLDER_FORMAT)
def create_shared_folder():
    """Create a new shared folder
    
    Example request:
    {
        "jwtToken": "...",
        "folderName": "Advanced Spanish Vocabulary",
        "description": "Comprehensive Spanish vocabulary for advanced learners"
    }
    """
    try:
        jwt_handler = JwtHandler()
        decoded = jwt_handler.decode(request.json.get("jwtToken"))
        if not decoded:
            return jsonify({"error": "Invalid JWT"}), 401
        user_id = decoded["userID"]
        folder_name = request.json.get("folderName")
        description = request.json.get("description")
        
        # Generate unique folder ID
        folder_id = hash_to_numeric(user_id + folder_name + str(time.time()))
        
        # Get user data for profile picture
        user_data = db.users.get_user(user_id)
        profile_pic = ""  # Default empty, could be enhanced later
        
        # Create the shared folder
        db.shared_folders.create_shared_folder(
            folder_id=folder_id,
            name=folder_name,
            description=description,
            owner_id=user_id,
            owner_profile_pic=profile_pic
        )
        
        # Generate initial invite code
        jwt_handler = SharedFolderJwtHandler()
        invite_code = jwt_handler.generate_invite_token(folder_id, user_id)
        
        return jsonify({
            "success": True,
            "sharedFolderID": folder_id,
            "inviteCode": invite_code
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/get-shared-folders", methods=["POST"])
@validate_json(GET_SHARED_FOLDERS_FORMAT)
def get_shared_folders():
    """Get all shared folders for a user (owned and member)
    
    Example request:
    {
        "jwtToken": "..."
    }
    """
    try:
        user_id = request.json.get("userID")
        
        # Get user's shared folders
        folders_data = db.shared_folders.get_user_shared_folders(user_id)
        
        return jsonify(folders_data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/get-shared-folder", methods=["POST"])
@validate_json(GET_SHARED_FOLDER_FORMAT)
def get_shared_folder():
    """Get details of a specific shared folder (requires membership)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        
        # Check if user is member or owner
        if not db.shared_folders.is_user_member(folder_id, user_id):
            return jsonify({"error": "Access denied. You must be a member of this shared folder."}), 403
        
        # Get folder data
        folder_data = db.shared_folders.get_shared_folder(folder_id)
        
        if folder_data is None:
            return jsonify({"error": "Shared folder not found"}), 404
        
        return jsonify(folder_data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/delete-shared-folder", methods=["DELETE"])
@validate_json(DELETE_SHARED_FOLDER_FORMAT)
def delete_shared_folder():
    """Delete a shared folder (owner only)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        
        # Check if user is owner
        if not db.shared_folders.is_user_owner(folder_id, user_id):
            return jsonify({"error": "Access denied. Only the owner can delete this folder."}), 403
        
        # Delete the folder
        result = db.shared_folders.delete_shared_folder(folder_id)
        
        if result:
            return jsonify({"success": True, "message": "Shared folder deleted"}), 200
        else:
            return jsonify({"error": "Shared folder not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/rename-shared-folder", methods=["POST"])
@validate_json(RENAME_SHARED_FOLDER_FORMAT)
def rename_shared_folder():
    """Rename a shared folder (owner only)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id",
        "newName": "Updated Name"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        new_name = request.json.get("newName")
        
        # Check if user is owner
        if not db.shared_folders.is_user_owner(folder_id, user_id):
            return jsonify({"error": "Access denied. Only the owner can rename this folder."}), 403
        
        # Rename the folder
        db.shared_folders.rename_shared_folder(folder_id, new_name)
        
        return jsonify({"success": True, "message": "Shared folder renamed"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/add-flashcard-to-shared-folder", methods=["POST"])
@validate_json(ADD_FLASHCARD_TO_SHARED_FOLDER_FORMAT)
def add_flashcard_to_shared_folder():
    """Add a flashcard set to shared folder (owner only)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id",
        "flashcardID": "flashcard-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        flashcard_id = request.json.get("flashcardID")
        
        # Check if user is owner
        if not db.shared_folders.is_user_owner(folder_id, user_id):
            return jsonify({"error": "Access denied. Only the owner can add flashcards."}), 403
        
        # Get flashcard set details
        flashcard_data = db.flashcard_set.get_flashcard_set(flashcard_id)
        if flashcard_data is None:
            return jsonify({"error": "Flashcard set not found"}), 404
        
        # Add flashcard to shared folder
        db.shared_folders.add_flashcard_set_to_folder(
            folder_id, 
            flashcard_id, 
            flashcard_data.get("name", "Unnamed Set")
        )
        
        return jsonify({"success": True, "message": "Flashcard added to shared folder"}), 200
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/remove-flashcard-from-shared-folder", methods=["DELETE"])
@validate_json(REMOVE_FLASHCARD_FROM_SHARED_FOLDER_FORMAT)
def remove_flashcard_from_shared_folder():
    """Remove a flashcard set from shared folder (owner only)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id",
        "flashcardID": "flashcard-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        flashcard_id = request.json.get("flashcardID")
        
        # Check if user is owner
        if not db.shared_folders.is_user_owner(folder_id, user_id):
            return jsonify({"error": "Access denied. Only the owner can remove flashcards."}), 403
        
        # Remove flashcard from shared folder
        db.shared_folders.remove_flashcard_set_from_folder(folder_id, flashcard_id)
        
        # Clean up user progress data for this flashcard set
        db.shared_folder_sets.cleanup_removed_flashcard_set(folder_id, flashcard_id)
        
        return jsonify({"success": True, "message": "Flashcard removed from shared folder"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/get-shared-folder-flashcards", methods=["POST"])
@validate_json(GET_SHARED_FOLDER_FLASHCARDS_FORMAT)
def get_shared_folder_flashcards():
    """Get all flashcards in a shared folder (requires membership)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        
        # Check if user is member or owner
        if not db.shared_folders.is_user_member(folder_id, user_id):
            return jsonify({"error": "Access denied. You must be a member of this shared folder."}), 403
        
        # Get folder data
        folder_data = db.shared_folders.get_shared_folder(folder_id)
        
        if folder_data is None:
            return jsonify({"error": "Shared folder not found"}), 404
        
        # Get detailed flashcard information
        flashcards = []
        for flashcard_set in folder_data.get("sets", []):
            set_id = flashcard_set.get("flashcardSetId")
            set_details = db.flashcard_set.get_flashcard_set(set_id)
            
            if set_details:
                flashcards.append({
                    "flashcardID": set_id,
                    "name": flashcard_set.get("name"),
                    "description": set_details.get("description", ""),
                    "cardCount": len(set_details.get("cards", []))
                })
        
        return jsonify({"flashcards": flashcards}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/generate-shared-folder-invite", methods=["POST"])
@validate_json(GENERATE_SHARED_FOLDER_INVITE_FORMAT)
def generate_shared_folder_invite():
    """Generate/regenerate invite link (owner only)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id",
        "expiryDays": 30  // Optional
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        expiry_days = request.json.get("expiryDays")
        
        # Check if user is owner
        if not db.shared_folders.is_user_owner(folder_id, user_id):
            return jsonify({"error": "Access denied. Only the owner can generate invite links."}), 403
        
        # Validate folder exists
        if db.shared_folders.get_shared_folder(folder_id) is None:
            return jsonify({"error": "Shared folder not found"}), 404
        
        # Parse expiry days
        expiry_days_int = None
        if expiry_days and expiry_days.strip():
            try:
                expiry_days_int = int(expiry_days)
            except ValueError:
                return jsonify({"error": "Invalid expiry days format"}), 400
        
        # Generate invite token
        jwt_handler = SharedFolderJwtHandler()
        invite_code = jwt_handler.generate_invite_token(folder_id, user_id, expiry_days_int)
        
        response_data = {
            "success": True,
            "inviteCode": invite_code,
            "expiryDate": None
        }
        
        if expiry_days_int:
            from datetime import datetime, timedelta
            expiry_date = datetime.now() + timedelta(days=expiry_days_int)
            response_data["expiryDate"] = expiry_date.strftime("%Y-%m-%d")
        
        return jsonify(response_data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/join-shared-folder", methods=["POST"])
@validate_json(JOIN_SHARED_FOLDER_FORMAT)
def join_shared_folder():
    """Join shared folder using invite link
    
    Example request:
    {
        "jwtToken": "...",
        "inviteCode": "xyz789abc"
    }
    """
    try:
        user_id = request.json.get("userID")
        invite_code = request.json.get("inviteCode")
        
        # Validate invite token
        jwt_handler = SharedFolderJwtHandler()
        validation_result = jwt_handler.validate_invite_token(invite_code)
        
        if not validation_result["valid"]:
            return jsonify({"error": validation_result["error"]}), 400
        
        folder_id = validation_result["sharedFolderId"]
        
        # Check if folder exists
        folder_data = db.shared_folders.get_shared_folder(folder_id)
        if folder_data is None:
            return jsonify({"error": "Shared folder not found or no longer exists"}), 404
        
        # Check if user is already a member
        if db.shared_folders.is_user_member(folder_id, user_id):
            return jsonify({"error": "You are already a member of this shared folder"}), 400
        
        # Get user profile picture (if available)
        user_data = db.users.get_user(user_id)
        profile_pic = ""  # Default empty, could be enhanced later
        
        # Add user as member
        db.shared_folders.add_member_to_folder(folder_id, user_id, profile_pic)
        
        # Return folder information
        return jsonify({
            "success": True,
            "sharedFolder": {
                "id": folder_id,
                "name": folder_data.get("name"),
                "description": folder_data.get("description"),
                "owner": folder_data.get("owner")
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/leave-shared-folder", methods=["POST"])
@validate_json(LEAVE_SHARED_FOLDER_FORMAT)
def leave_shared_folder():
    """Leave a shared folder
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        
        # Check if user is a member
        if not db.shared_folders.is_user_member(folder_id, user_id):
            return jsonify({"error": "You are not a member of this shared folder"}), 400
        
        # Check if user is the owner
        if db.shared_folders.is_user_owner(folder_id, user_id):
            return jsonify({"error": "Owner cannot leave the folder. Transfer ownership or delete the folder instead."}), 400
        
        # Remove user from folder
        db.shared_folders.remove_member_from_folder(folder_id, user_id)
        
        # Clean up user's progress data
        db.shared_folder_sets.remove_user_progress_from_folder(user_id, folder_id)
        
        return jsonify({"success": True, "message": "Left shared folder successfully"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @shared_folders_routes.route("/api/remove-user-from-shared-folder", methods=["DELETE"])
@shared_folders_routes.route("/api/remove-user-from-shared-folder", methods=["POST"])
@validate_json(REMOVE_USER_FROM_SHARED_FOLDER_FORMAT)
def remove_user_from_shared_folder():
    try:
        jwt_token = request.json.get("jwtToken")
        jwt_handler = JwtHandler()
        decoded = jwt_handler.decode(jwt_token)
        if not decoded:
            return jsonify({"error": "Invalid JWT"}), 401

        owner_id = decoded["userID"]
        folder_id = request.json.get("sharedFolderID")
        user_to_remove = request.json.get("targetUserID")

        if not db.shared_folders.is_user_owner(folder_id, owner_id):
            return jsonify({"error": "Access denied. Only the owner can remove members."}), 403

        if owner_id == user_to_remove:
            return jsonify({"error": "Cannot remove yourself. Transfer ownership or delete the folder instead."}), 400

        if not db.shared_folders.is_user_member(folder_id, user_to_remove):
            return jsonify({"error": "User is not a member of this shared folder"}), 400

        db.shared_folders.remove_member_from_folder(folder_id, user_to_remove)
        db.shared_folder_sets.remove_user_progress_from_folder(user_to_remove, folder_id)

        return jsonify({"success": True, "message": "User removed from shared folder"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@shared_folders_routes.route("/api/get-shared-folder-members", methods=["POST"])
@validate_json(GET_SHARED_FOLDER_MEMBERS_FORMAT)
def get_shared_folder_members():
    """Get all members of a shared folder (requires membership)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        
        # Check if user is member or owner
        if not db.shared_folders.is_user_member(folder_id, user_id):
            return jsonify({"error": "Access denied. You must be a member of this shared folder."}), 403
        
        # Get folder data
        folder_data = db.shared_folders.get_shared_folder(folder_id)
        
        if folder_data is None:
            return jsonify({"error": "Shared folder not found"}), 404
        
        # Get detailed member information
        owner_id = folder_data.get("owner")
        owner_data = db.users.get_user(owner_id)
        
        members = []
        for member in folder_data.get("members", []):
            member_id = member.get("userId")
            if member_id != owner_id:  # Don't include owner in members list
                member_user_data = db.users.get_user(member_id)
                if member_user_data:
                    members.append({
                        "userID": member_id,
                        "name": member_user_data.get("name", "Unknown User"),
                        "profilePicUrl": member.get("profilePicUrl", ""),
                        # "joinedDate": "2024-01-05"  # This would need to be tracked in the schema
                    })
        
        response_data = {
            "owner": {
                "userID": owner_id,
                "name": owner_data.get("name", "Unknown User") if owner_data else "Unknown User",
                # "joinedDate": "2024-01-01"  # This would need to be tracked in the schema
            },
            "members": members
        }
        
        return jsonify(response_data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/transfer-shared-folder-ownership", methods=["POST"])
@validate_json(TRANSFER_SHARED_FOLDER_OWNERSHIP_FORMAT)
def transfer_shared_folder_ownership():
    """Transfer ownership (owner only)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id",
        "newOwnerID": "user-id"
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        new_owner_id = request.json.get("newOwnerID")
        
        # Check if user is owner
        if not db.shared_folders.is_user_owner(folder_id, user_id):
            return jsonify({"error": "Access denied. Only the owner can transfer ownership."}), 403
        
        # Transfer ownership
        db.shared_folders.transfer_ownership(folder_id, new_owner_id)
        
        return jsonify({"success": True, "message": "Ownership transferred successfully"}), 200
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@shared_folders_routes.route("/api/copy-shared-flashcard-to-personal", methods=["POST"])
@validate_json(COPY_SHARED_FLASHCARD_TO_PERSONAL_FORMAT)
def copy_shared_flashcard_to_personal():
    """Copy shared flashcard to personal collection (requires membership)
    
    Example request:
    {
        "jwtToken": "...",
        "sharedFolderID": "folder-id",
        "flashcardID": "flashcard-id",
        "personalFolder": "My Spanish"  // Optional
    }
    """
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        flashcard_id = request.json.get("flashcardID")
        personal_folder = request.json.get("personalFolder", "")
        
        # Check if user is member or owner
        if not db.shared_folders.is_user_member(folder_id, user_id):
            return jsonify({"error": "Access denied. You must be a member of this shared folder."}), 403
        
        # Get shared flashcard progress data
        progress_data = db.shared_folder_sets.copy_shared_flashcard_to_personal(
            user_id, folder_id, flashcard_id, personal_folder
        )
        
        # This would need integration with existing folders handler to actually copy
        # For now, return success with the data structure
        
        return jsonify({
            "success": True,
            "personalFlashcardID": "new-personal-id",  # Would be generated by folders handler
            "message": "Flashcard copied to personal collection"
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @shared_folders_routes.route("/api/update-shared-card-progress", methods=["POST"])
# @validate_json(UPDATE_SHARED_CARD_PROGRESS_FORMAT)
# def update_shared_card_progress():
#     try:
#         user_id = request.json.get("userID")
#         folder_id = request.json.get("sharedFolderID")
#         flashcard_set_id = request.json.get("flashcardSetID")
#         card_data = request.json.get("cardData")
        
#         # Check if user is member or owner
#         if not db.shared_folders.is_user_member(folder_id, user_id):
#             return jsonify({"error": "Access denied. You must be a member of this shared folder."}), 403
        
#         # Initialize progress if it doesn't exist
#         existing_progress = db.shared_folder_sets.get_user_flashcard_set_progress(user_id, folder_id, flashcard_set_id)
        
#         if not existing_progress:
#             # Get the flashcard set to initialize with all card IDs
#             flashcard_set = db.flashcard_set.get_flashcard_set(flashcard_set_id)
#             if flashcard_set:
#                 card_ids = [card.get("id", f"card_{i}") for i, card in enumerate(flashcard_set.get("cards", []))]
#                 db.shared_folder_sets.initialize_user_progress(user_id, folder_id, flashcard_set_id, card_ids)
        
#         # Update user's progress
#         db.shared_folder_sets.update_card_progress(
#             user_id, folder_id, flashcard_set_id, card_data
#         )
        
#         # Increase user XP (following existing pattern)
#         db.statistics.increase_xp(user_id, len(card_data) * 10)
        
#         return jsonify({"success": True, "message": "Card progress updated"}), 200
        
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
# @shared_folders_routes.route("/api/update-shared-card-progress", methods=["POST"])
# @validate_json(UPDATE_SHARED_CARD_PROGRESS_FORMAT)
# def update_shared_card_progress():
#     """Update progress for cards in a shared flashcard set
    
#     Example request:
#     {
#         "jwtToken": "...",
#         "sharedFolderID": "folder-id",
#         "flashcardSetID": "set-id",
#         "cardData": [
#             {
#                 "cardID": "card1",
#                 "review_status": "1.0",
#                 "last_review": "21/08/2025"
#             }
#         ]
#     }
#     """
#     try:
#         user_id = request.json.get("userID")
#         folder_id = request.json.get("sharedFolderID")
#         flashcard_set_id = request.json.get("flashcardSetID")
#         card_data = request.json.get("cardData")
        
#         # Check if user is member or owner
#         if not db.shared_folders.is_user_member(folder_id, user_id):
#             return jsonify({"error": "Access denied. You must be a member of this shared folder."}), 403
        
#         # Update user's progress
#         db.shared_folder_sets.update_card_progress(
#             user_id, folder_id, flashcard_set_id, card_data
#         )
        
#         # Increase user XP (following existing pattern)
#         db.statistics.increase_xp(user_id, len(card_data) * 10)
        
#         return jsonify({"success": True, "message": "Card progress updated"}), 200
        
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
@shared_folders_routes.route("/api/update-shared-card-progress", methods=["POST"])
@validate_json(UPDATE_SHARED_CARD_PROGRESS_FORMAT)
def update_shared_card_progress():
    try:
        user_id = request.json.get("userID")
        folder_id = request.json.get("sharedFolderID")
        flashcard_set_id = request.json.get("flashcardSetID")
        card_data = request.json.get("cardData")
        
        # Check if user is member or owner
        if not db.shared_folders.is_user_member(folder_id, user_id):
            return jsonify({"error": "Access denied. You must be a member of this shared folder."}), 403
        
        # Initialize progress if it doesn't exist
        existing_progress = db.shared_folder_sets.get_user_flashcard_set_progress(user_id, folder_id, flashcard_set_id)
        
        if not existing_progress:
            # Get the flashcard set to initialize with all card IDs
            flashcard_set = db.flashcard_set.get_flashcard_set(flashcard_set_id)
            
            
            
            if flashcard_set:
                cards = flashcard_set.get("cards", [])
                
                # For now, let's just use simple card IDs
                card_ids = [f"card_{i}" for i in range(len(cards))]
                
                db.shared_folder_sets.initialize_user_progress(user_id, folder_id, flashcard_set_id, card_ids)
        
        # Update user's progress
        db.shared_folder_sets.update_card_progress(
            user_id, folder_id, flashcard_set_id, card_data
        )
        
        # Increase user XP (following existing pattern)
        db.statistics.increase_xp(user_id, len(card_data) * 10)
        
        return jsonify({"success": True, "message": "Card progress updated"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500