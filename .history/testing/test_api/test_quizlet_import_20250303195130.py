"""Test the Quizlet import functionality"""

from .base import BaseApiActionsMixin
from api_routes import Routes

class TestQuizletImport(BaseApiActionsMixin):
    """Test class for Quizlet import functionality"""

    def test_successful_quizlet_import(self):
        """Test successful import from Quizlet"""
        # Create a test user first
        token = self.create_user("test_user")
        print(token)
        # Create a folder for the user before importing Quizlet
        folder_creation_data = {
            "jwtToken": token,
            "folder": "test_folder"
        }
        folder_creation_response = self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], folder_creation_data)
        assert folder_creation_response["success"] == "Folder created successfully"
        # Test data
        test_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "quizlet_url": "https://quizlet.com/686459638/test-set-flash-cards/?funnelUUID=a88312bb-e490-4f6c-a7da-1d844b694e24"
        }

        # Make the API call
        response = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        print(response.content)
        # Assert response status
        assert response["success"] == "Flashcards imported from Quizlet"

    def test_invalid_url(self):
        """Test import with invalid Quizlet URL"""
        # Create a test user
        token = self.create_user("test_user")
        
        # Test data with invalid URL
        test_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "quizlet_url": "https://invalid-url.com"
        }
        res = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        assert "Invalid or inaccessible Quizlet URL" in str(res)

    def test_duplicate_set_name(self):
        """Test importing same set twice (should fail on second attempt)"""
        # Create a test user
        token = self.create_user("test_user")
        print(token)
        # Test data
        test_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "quizlet_url": "https://quizlet.com/686459638/test-set-flash-cards/?funnelUUID=a88312bb-e490-4f6c-a7da-1d844b694e24"
        }

        # First import should succeed
        first_response = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        assert first_response["success"] == "Flashcards imported from Quizlet"
    
         # Second import should fail with duplicate error
        res = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        assert "Flashcard set name already exists" in str(res)

    def test_missing_parameters(self):
        """Test import with missing required parameters"""
        # Create a test user
        token = self.create_user("test_user")
        
        # Test data with missing URL
        test_data = {
            "jwtToken": token,
            "folder": "test_folder"
        }

    
        res elf.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)


    def test_invalid_quizlet_url_format(self):
        """Test import with invalid Quizlet URL format"""
        # Create a test user
        token = self.create_user("test_user")
        
        # Test data with invalid URL format
        test_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "quizlet_url": "http://quizlet.com/686459638/test-set-flash-cards/?funnelUUID=a88312bb-e490-4f6c-a7da-1d844b694e24"
        }

        # Make the API call and expect an error
        response = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        print(response)
        # Assert error response
        assert "error" in response
        assert "Invalid Quizlet URL format" in response["error"]

    def test_unable_to_access_quizlet_set(self):
        """Test import with unable to access Quizlet set"""
        # Create a test user
        token = self.create_user("test_user")
        
        # Test data with unable to access Quizlet set
        test_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "quizlet_url": "https://quizlet.com/686459638/test-set-flash-cards/?funnelUUID=a88312bb-e490-4f6c-a7da-1d844b694e24"
        }

        # Make the API call and expect an error
        response = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        print(response)
        # Assert error response
        assert "error" in response
        assert "Unable to access Quizlet set" in response["error"]

    def test_unable_to_parse_quizlet_set(self):
        """Test import with unable to parse Quizlet set"""
        # Create a test user
        token = self.create_user("test_user")
        
        # Test data with unable to parse Quizlet set
        test_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "quizlet_url": "https://quizlet.com/686459638/test-set-flash-cards/?funnelUUID=a88312bb-e490-4f6c-a7da-1d844b694e24"
        }

        # Make the API call and expect an error
        response = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        print(response)
        # Assert error response
        assert "error" in response
        assert "Unable to parse Quizlet set" in response["error"] 