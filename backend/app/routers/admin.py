from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import User, Lesson, Word, Category, Quiz
from ..schemas import user as user_schemas
from ..schemas import models as models_schemas
from .auth import get_current_user
from ..services.ai_service import ai_service

router = APIRouter()

def check_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bu işlem için yönetici yetkisi gereklidir."
        )
    return current_user

@router.get("/stats", dependencies=[Depends(check_admin)])
def get_admin_stats(db: Session = Depends(get_db)):
    return {
        "total_users": db.query(User).count(),
        "total_lessons": db.query(Lesson).count(),
        "total_words": db.query(Word).count(),
        # Add more stats as needed
    }

# Words Management
@router.get("/words", response_model=List[models_schemas.WordResponse], dependencies=[Depends(check_admin)])
def get_all_words(db: Session = Depends(get_db)):
    return db.query(Word).all()

@router.post("/words", response_model=models_schemas.WordResponse, dependencies=[Depends(check_admin)])
def create_word(word_in: models_schemas.WordCreate, db: Session = Depends(get_db)):
    word = Word(**word_in.dict())
    db.add(word)
    db.commit()
    db.refresh(word)
    return word

# Lessons Management
@router.get("/lessons", response_model=List[models_schemas.LessonResponse], dependencies=[Depends(check_admin)])
def get_all_lessons(db: Session = Depends(get_db)):
    return db.query(Lesson).all()

@router.post("/lessons", response_model=models_schemas.LessonResponse, dependencies=[Depends(check_admin)])
def create_lesson(lesson_in: models_schemas.LessonCreate, db: Session = Depends(get_db)):
    lesson = Lesson(**lesson_in.dict())
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson

# AI Generation
@router.post("/generate/words", dependencies=[Depends(check_admin)])
async def generate_ai_words(category: str, level: str, count: int = 5):
    words = await ai_service.generate_words(category, level, count)
    return words

@router.post("/generate/lesson", dependencies=[Depends(check_admin)])
async def generate_ai_lesson(topic: str, level: str):
    lesson = await ai_service.generate_lesson_content(topic, level)
    return lesson
