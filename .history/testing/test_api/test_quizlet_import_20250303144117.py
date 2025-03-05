"""Test the Quizlet import functionality"""

from .base import BaseApiActionsMixin
from api_routes import Routes

class TestQuizletImport(BaseApiActionsMixin):
    """Test class for Quizlet import functionality"""

    def test_successful_quizlet_import(self):
        """Test successful import from Quizlet"""
        # Create a test user first
        token = self.create_user("test_user")
        
        # Test data
        test_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "quizlet_url": "https://quizlet.com/12345678/test-set"
        }

        # Make the API call
        response = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        print(response.ge()
        # Assert response status
        assert response.get("success") == "Flashcards imported from Quizlet"

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

        # Make the API call and expect an error
        response = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        print(response)
        # Assert error response
        assert "error" in response

    def test_duplicate_set_name(self):
        """Test importing same set twice (should fail on second attempt)"""
        # Create a test user
        token = self.create_user("test_user")
        
        # Test data
        test_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "quizlet_url": "https://quizlet.com/12345678/test-set"
        }

        # First import should succeed
        self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        
        # Second import should fail with duplicate error
        response = self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
        assert response.get("error") == "Flashcard set name already exists"

    def test_missing_parameters(self):
        """Test import with missing required parameters"""
        # Create a test user
        token = self.create_user("test_user")
        
        # Test data with missing URL
        test_data = {
            "jwtToken": token,
            "folder": "test_folder"
        }

        try:
            self.post_api(Routes.ROUTE_IMPORT_FROM_QUIZLET["url"], test_data)
            assert False, "Should have raised an error for missing quizlet_url"
        except AssertionError as e:
            assert "quizlet_url" in str(e) 