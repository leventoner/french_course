from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import UserProgress, UserWordProgress, Lesson, User
from ..schemas.models import UserProgressResponse, UserProgressBase, UserWordProgressResponse
from ..dependencies import get_current_user

router = APIRouter()

@router.get("/lessons", response_model=List[UserProgressResponse])
def get_user_lesson_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(UserProgress).filter(UserProgress.user_id == current_user.id).all()

@router.post("/lessons", response_model=UserProgressResponse)
def record_lesson_progress(
    progress_in: UserProgressBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if lesson exists
    lesson = db.query(Lesson).filter(Lesson.id == progress_in.lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    # Check for existing progress
    db_progress = db.query(UserProgress).filter(
        UserProgress.user_id == current_user.id,
        UserProgress.lesson_id == progress_in.lesson_id
    ).first()

    if db_progress:
        db_progress.attempts += 1
        if progress_in.score > db_progress.best_score:
            db_progress.best_score = progress_in.score
        db_progress.score = progress_in.score
        if progress_in.completed:
            db_progress.completed = True
    else:
        db_progress = UserProgress(
            user_id=current_user.id,
            lesson_id=progress_in.lesson_id,
            completed=progress_in.completed,
            score=progress_in.score,
            attempts=1,
            best_score=progress_in.score
        )
        db.add(db_progress)

    # Award XP if completed
    if progress_in.completed:
        current_user.total_xp += lesson.xp_reward
        # Simple streak logic: if last login was yesterday, increment streak
        # (This would normally be more complex, checking dates)
        # For now just increment streak if it's the first lesson today
        # current_user.streak_days += 1 

    db.commit()
    db.refresh(db_progress)
    return db_progress

@router.get("/words", response_model=List[UserWordProgressResponse])
def get_user_word_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(UserWordProgress).filter(UserWordProgress.user_id == current_user.id).all()
