from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Achievement, UserAchievement, User
from ..schemas.models import AchievementResponse, UserAchievementResponse
from ..dependencies import get_current_user

router = APIRouter()

@router.get("/", response_model=List[AchievementResponse])
def get_all_achievements(db: Session = Depends(get_db)):
    return db.query(Achievement).all()

@router.get("/user", response_model=List[UserAchievementResponse])
def get_user_achievements(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(UserAchievement).filter(UserAchievement.user_id == current_user.id).all()
