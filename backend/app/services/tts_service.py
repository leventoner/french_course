import hashlib
import os
from gtts import gTTS
from ..config import settings

class TTSService:
    @staticmethod
    def generate_audio(text: str, lang: str = 'fr', slow: bool = False) -> str:
        # Create hash of text and settings
        suffix = "_slow" if slow else ""
        filename = hashlib.md5((text + suffix).encode()).hexdigest() + '.mp3'
        filepath = os.path.join(settings.AUDIO_PATH, filename)
        
        # Ensure directory exists
        os.makedirs(settings.AUDIO_PATH, exist_ok=True)
        
        # Generate if doesn't exist
        if not os.path.exists(filepath):
            try:
                tts = gTTS(text=text, lang=lang, slow=slow)
                tts.save(filepath)
            except Exception as e:
                print(f"Error generating TTS: {e}")
                return ""
                
        # Return filename or relative path
        return filename

tts_service = TTSService()
