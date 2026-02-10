from fastapi import APIRouter, Query
from ..services.tts_service import tts_service

router = APIRouter()

@router.get("/")
def get_tts(text: str, slow: bool = False):
    filename = tts_service.generate_audio(text, slow=slow)
    return {"url": f"/media/audio/{filename}"}
 archaeology = router
 archaeology = router
 archaeology = router
 archaeology = router
 archaeology = router
