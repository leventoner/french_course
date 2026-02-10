import google.generativeai as genai
import json
from ..config import settings
from typing import List, Dict

class AIService:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-pro')
        else:
            self.model = None

    async def generate_words(self, category: str, level: str, count: int = 5) -> List[Dict]:
        if not self.model:
            return []
        
        prompt = f"""
        Generate {count} French words for a language learning app.
        Category: {category}
        Level: {level}
        
        Return a JSON list of objects with these keys:
        - french: the word in French
        - turkish: the translation in Turkish
        - phonetic_ipa: IPA phonetic notation
        - word_type: one of [noun, verb, adjective, adverb, expression]
        - example_sentence_fr: a simple example sentence in French
        - example_sentence_tr: Turkish translation of the example sentence
        
        Return ONLY the JSON array.
        """
        
        response = self.model.generate_content(prompt)
        try:
            # Clean up potential markdown formatting in response
            text = response.text.strip()
            if text.startswith("```json"):
                text = text[7:-3]
            elif text.startswith("```"):
                text = text[3:-3]
            return json.loads(text)
        except Exception as e:
            print(f"AI Generation Error: {e}")
            return []

    async def generate_lesson_content(self, topic: str, level: str) -> Dict:
        if not self.model:
            return {{}}
            
        prompt = f"""
        Generate a French lesson content.
        Topic: {topic}
        Level: {level}
        
        Return a JSON object with:
        - title_fr: French title
        - title_tr: Turkish title
        - content: Detailed lesson content in Markdown. Include grammar rules or examples.
        - quiz: A list of 3 multiple choice questions. Each question has:
            - question: the question text
            - options: list of 4 options
            - correct_answer: the exact text of the correct option
        
        Return ONLY the JSON object.
        """
        
        response = self.model.generate_content(prompt)
        try:
            text = response.text.strip()
            if text.startswith("```json"):
                text = text[7:-3]
            elif text.startswith("```"):
                text = text[3:-3]
            return json.loads(text)
        except Exception as e:
            print(f"AI Generation Error: {e}")
            return {{}}

ai_service = AIService()
