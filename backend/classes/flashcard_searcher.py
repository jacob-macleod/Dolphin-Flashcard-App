"""
Allow flashcards to be searched for to find a seach term
"""


class FlashcardSearcher:
    """
    Allow flashcards to be searched for to find a seach term
    """
    def __init__(self, flashcard_data):
        """
        Init function

        Args:
            flashcard_data (<generator object Query.stream>): The fetched flashcard data from
            firebase. This stores all the data in the flashcard_set collection
        """
        self._data = flashcard_data

    def search(self, search_term: str):
        """
        Search for a flashcard by name

        Args:
            search_term (str): The search term to search for

        Returns:
            dict: The flashcard data
        """
        flashcard_found = []
        for doc in self._data:
            dict_data = doc.to_dict()
            if search_term in dict_data["name"]:
                dict_data["id"] = doc.id
                flashcard_found.append(dict_data)

        return flashcard_found
