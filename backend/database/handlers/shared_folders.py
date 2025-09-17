"""Provides utility classes for interacting with the shared_folders database
"""

from database.handlers.database_handler import DatabaseHandler
from classes.date import Date


class SharedFolders(DatabaseHandler):
    """Provides utility classes for interacting with the shared_folders database"""

    def __init__(self, context):
        """Initialise the class

        Args:
            context (FirebaseDatabase | LocalDatabase): The concrete database implementation
            use to perform queries
        """
        super().__init__(context, db_name="shared_folders")
        self._date = Date()

    def create_shared_folder(self, folder_id: str, name: str, description: str, owner_id: str, owner_profile_pic: str = ""):
        """Create a new shared folder

        Args:
            folder_id (str): The unique folder ID
            name (str): The folder name
            description (str): The folder description
            owner_id (str): The user ID of the folder owner
            owner_profile_pic (str): Profile picture URL of the owner
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id)
        shared_folder.set({
            "name": name,
            "description": description,
            "owner": owner_id,
            "members": [
                {
                    "userId": owner_id,
                    "profilePicUrl": owner_profile_pic
                }
            ],
            "sets": []
        })

    def get_shared_folder(self, folder_id: str):
        """Get a shared folder by ID

        Args:
            folder_id (str): The folder ID to get

        Returns:
            dict: The shared folder data
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id).get()
        if shared_folder.exists:
            return shared_folder.to_dict()
        return None

    def get_user_shared_folders(self, user_id: str):
        """Get all shared folders where user is owner or member

        Args:
            user_id (str): The user ID

        Returns:
            dict: Dictionary with 'owned' and 'member' folders
        """
        # Get all shared folders where user is in members array
        all_folders = self._context.collection(self._db_name).stream()
        
        owned_folders = []
        member_folders = []
        
        for doc in all_folders:
            folder_data = doc.to_dict()
            folder_data['id'] = doc.id
            
            # Check if user is owner
            if folder_data.get('owner') == user_id:
                owned_folders.append(folder_data)
            else:
                # Check if user is in members list
                for member in folder_data.get('members', []):
                    if member.get('userId') == user_id:
                        member_folders.append(folder_data)
                        break
        
        return {
            "ownedFolders": owned_folders,
            "memberFolders": member_folders
        }

    def add_member_to_folder(self, folder_id: str, user_id: str, profile_pic_url: str = ""):
        """Add a member to a shared folder

        Args:
            folder_id (str): The folder ID
            user_id (str): The user ID to add
            profile_pic_url (str): Profile picture URL of the user
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id)
        folder_data = shared_folder.get().to_dict()
        
        if folder_data is None:
            raise ValueError("Shared folder does not exist")
        
        # Check if user is already a member
        for member in folder_data.get('members', []):
            if member.get('userId') == user_id:
                raise ValueError("User is already a member of this folder")
        
        # Add new member
        new_member = {
            "userId": user_id,
            "profilePicUrl": profile_pic_url
        }
        folder_data['members'].append(new_member)
        
        shared_folder.set(folder_data)

    def remove_member_from_folder(self, folder_id: str, user_id: str):
        """Remove a member from a shared folder

        Args:
            folder_id (str): The folder ID
            user_id (str): The user ID to remove
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id)
        folder_data = shared_folder.get().to_dict()
        
        if folder_data is None:
            raise ValueError("Shared folder does not exist")
        
        # Remove member from members list
        folder_data['members'] = [
            member for member in folder_data.get('members', [])
            if member.get('userId') != user_id
        ]
        
        shared_folder.set(folder_data)

    def add_flashcard_set_to_folder(self, folder_id: str, flashcard_set_id: str, flashcard_set_name: str):
        """Add a flashcard set to a shared folder

        Args:
            folder_id (str): The folder ID
            flashcard_set_id (str): The flashcard set ID
            flashcard_set_name (str): The name of the flashcard set
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id)
        folder_data = shared_folder.get().to_dict()
        
        if folder_data is None:
            raise ValueError("Shared folder does not exist")
        
        # Check if flashcard set already exists in folder
        for existing_set in folder_data.get('sets', []):
            if existing_set.get('flashcardSetId') == flashcard_set_id:
                raise ValueError("Flashcard set already exists in this folder")
        
        # Add new flashcard set
        new_set = {
            "flashcardSetId": flashcard_set_id,
            "name": flashcard_set_name
        }
        folder_data['sets'].append(new_set)
        
        shared_folder.set(folder_data)

    def remove_flashcard_set_from_folder(self, folder_id: str, flashcard_set_id: str):
        """Remove a flashcard set from a shared folder

        Args:
            folder_id (str): The folder ID
            flashcard_set_id (str): The flashcard set ID to remove
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id)
        folder_data = shared_folder.get().to_dict()
        
        if folder_data is None:
            raise ValueError("Shared folder does not exist")
        
        # Remove flashcard set from sets list
        folder_data['sets'] = [
            flashcard_set for flashcard_set in folder_data.get('sets', [])
            if flashcard_set.get('flashcardSetId') != flashcard_set_id
        ]
        
        shared_folder.set(folder_data)

    def delete_shared_folder(self, folder_id: str):
        """Delete a shared folder

        Args:
            folder_id (str): The folder ID to delete
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id)
        if shared_folder.get().exists:
            shared_folder.delete()
            return True
        return False

    def rename_shared_folder(self, folder_id: str, new_name: str):
        """Rename a shared folder

        Args:
            folder_id (str): The folder ID
            new_name (str): The new name for the folder
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id)
        folder_data = shared_folder.get().to_dict()
        
        if folder_data is None:
            raise ValueError("Shared folder does not exist")
        
        folder_data['name'] = new_name
        shared_folder.set(folder_data)

    def transfer_ownership(self, folder_id: str, new_owner_id: str):
        """Transfer ownership of a shared folder

        Args:
            folder_id (str): The folder ID
            new_owner_id (str): The new owner's user ID
        """
        shared_folder = self._context.collection(self._db_name).document(folder_id)
        folder_data = shared_folder.get().to_dict()
        
        if folder_data is None:
            raise ValueError("Shared folder does not exist")
        
        # Check if new owner is a member of the folder
        is_member = False
        for member in folder_data.get('members', []):
            if member.get('userId') == new_owner_id:
                is_member = True
                break
        
        if not is_member:
            raise ValueError("New owner must be a member of the folder")
        
        folder_data['owner'] = new_owner_id
        shared_folder.set(folder_data)

    def is_user_member(self, folder_id: str, user_id: str):
        """Check if a user is a member of a shared folder

        Args:
            folder_id (str): The folder ID
            user_id (str): The user ID to check

        Returns:
            bool: True if user is a member (including owner), False otherwise
        """
        folder_data = self.get_shared_folder(folder_id)
        if folder_data is None:
            return False
        
        # Check if user is owner
        if folder_data.get('owner') == user_id:
            return True
        
        # Check if user is in members list
        for member in folder_data.get('members', []):
            if member.get('userId') == user_id:
                return True
        
        return False

    def is_user_owner(self, folder_id: str, user_id: str):
        """Check if a user is the owner of a shared folder

        Args:
            folder_id (str): The folder ID
            user_id (str): The user ID to check

        Returns:
            bool: True if user is the owner, False otherwise
        """
        folder_data = self.get_shared_folder(folder_id)
        if folder_data is None:
            return False
        
        return folder_data.get('owner') == user_id