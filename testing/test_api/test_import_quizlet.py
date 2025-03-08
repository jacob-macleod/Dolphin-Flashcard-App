"""Test the Quizlet import functionality"""

from .base import BaseApiActionsMixin
from api_routes import Routes

class TestQuizletImport(BaseApiActionsMixin):
    """Test class for Quizlet import functionality"""

    def test_quizlet_import_valid_double_newLine(self):
        """Test successful import from Quizlet"""
        # Create a test user first
        token = self.create_user("test_user")
        # Create a folder for the user before importing Quizlet
        folder_creation_data = {
            "jwtToken": token,
            "folder": "test_folder"
        }
        self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], folder_creation_data)
        # Test data
        with open("testing/test_api/flashcard_format/test_quizlet_import_double_newline_seperator.txt", "r") as file:
            content = file.read()

        quizlet_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "flashcards" : content,	
            "term_def_separator": "\t",
            "term_separator": "\n\n",            
            "flashcard_name": "Test Flashcard"
        }
        res = self.post_api(Routes.ROUTE_QUIZLET_IMPORT["url"], quizlet_data)
        assert res["success"] ==  "Flashcards imported successfully"
    
    def test_quizlet_import_valid_comma_sep(self):
        """Test successful import from Quizlet"""
        # Create a test user first
        token = self.create_user("test_user")
        # Create a folder for the user before importing Quizlet
        folder_creation_data = {
            "jwtToken": token,
            "folder": "test_folder"
        }
        self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], folder_creation_data)
        # Test data
        with open("testing/test_api/flashcard_format/test_quizlet_import_semicolon_seperator.txt", "r") as file:
            content = file.read()
     
        
        quizlet_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "flashcards" : content,	
            "term_def_separator": "\t",
            "term_separator": ",",	
            "flashcard_name": "Test Flashcard1"
        }
        res = self.post_api(Routes.ROUTE_QUIZLET_IMPORT["url"], quizlet_data)
        assert res["success"] ==  "Flashcards imported successfully"
    def test_quizlet_import_valid_comma_semicolon_sep(self):
        """Test successful import from Quizlet"""
        # Create a test user first
        token = self.create_user("test_user")
        # Create a folder for the user before importing Quizlet
        folder_creation_data = {
            "jwtToken": token,
            "folder": "test_folder1"
        }
        self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], folder_creation_data)
        # Test data
        with open("testing/test_api/flashcard_format/test_quizlet_import_comma_semicolon_seperator.txt", "r") as file:
            content = file.read()
        quizlet_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "flashcards" : content,	
            "term_def_separator": ",",
            "term_separator": ";",	
            "flashcard_name": "Test Flashcard2"
        }
        res = self.post_api(Routes.ROUTE_QUIZLET_IMPORT["url"], quizlet_data)
        print(res)
        assert res["success"] ==  "Flashcards imported successfully"
    def test_quizlet_import_newline(self):
        """Test successful import from Quizlet"""
        # Create a test user first
        token = self.create_user("test_user")
        # Create a folder for the user before importing Quizlet
        folder_creation_data = {
            "jwtToken": token,
            "folder": "test_folder1"
        }
        self.post_api(Routes.ROUTE_CREATE_FOLDER["url"], folder_creation_data)
        # Test data
        with open("testing/test_api/flashcard_format/test_quizlet_import_newline.txt", "r") as file:
            content = file.read()
       
        quizlet_data = {
            "jwtToken": token,
            "folder": "test_folder",
            "flashcards" : content,	
            "term_def_separator": "\t",
            "term_separator": "\n",	
            "flashcard_name": "Test Flashcard3"
        }
        res = self.post_api(Routes.ROUTE_QUIZLET_IMPORT["url"], quizlet_data)


        resp = self.post_api(Routes.ROUTE_GET_TODAY_CARDS["url"], {"jwtToken": token})
        assert res["success"] ==  "Flashcards imported successfully"
