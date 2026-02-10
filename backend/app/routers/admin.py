from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import User, Lesson, Word, Category, Quiz
from ..schemas import user as user_schemas
from .auth import get_current_user

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

# CRUD endpoints for lessons, words, etc. will go here
