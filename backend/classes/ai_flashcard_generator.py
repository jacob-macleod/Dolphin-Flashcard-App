"""
Manage the generation of AI flashcards
"""
import google.generativeai as genai
import json


class GeminiModel:
    """
    Manage the low-level of how code interacts with the Gemini API
    """

    def __init__(self, api_key_file="ai_api_key.txt"):
        with open(api_key_file, "r", encoding="utf-8") as api_file:
            api_key = api_file.read().strip()

        genai.configure(api_key=api_key)
        self._model = genai.GenerativeModel("gemini-2.5-flash")

    def send_prompt(self, prompt: str) -> str:
        """
        Send a prompt to the AI

        Args:
            prompt (str): The prompt to send

        Returns:
            str: The returned text
        """
        response = self._model.generate_content(prompt)
        return response.text if hasattr(response, "text") else str(response)


class FlashcardGenerator:
    """
    Singleton class to manage the high level of how flashcards are generated
    """

    _instance = None

    def __new__(cls, model_type: str = "gemini"):
        if cls._instance is None:
            cls._instance = super(FlashcardGenerator, cls).__new__(cls)
            if model_type == "gemini":
                cls._instance._model = GeminiModel()
            else:
                raise ValueError("Invalid API type")
        return cls._instance

    def generate_flashcard(self, topic: str, number_of_cards: str = "20"):
        """
        Generate flashcards

        Args:
            topic (str): The topic to generate flashcards about
            number_of_cards (str): The number of cards to generate

        Returns:
            dict | list: Parsed JSON of generated flashcards
        """
        prompt = (
            f"Create a flashcard set with {number_of_cards} cards for UK A-level Physics about {topic}. "
            f"Return it as JSON with fields 'front' and 'back'. Do not add ``` or 'json'."
        )

        generated = self._model.send_prompt(prompt)

        # Clean up unwanted formatting
        cleaned = generated.replace("```json", "").replace("```", "").strip()

        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            return {"error": "Failed to parse AI response", "raw": cleaned}
