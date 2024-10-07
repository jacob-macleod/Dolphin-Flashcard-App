import sys
import os
import unittest
import pytest

from testing.api_routes import Routes

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "..", "backend")
sys.path.append(src_path)

class TestFlashcards(unittest.TestCase):
    pass