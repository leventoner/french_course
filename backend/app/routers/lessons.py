from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models.lesson import Lesson
from ..schemas.models import LessonResponse

router = APIRouter()

@router.get("/", response_model=List[LessonResponse])
def get_lessons(
    level_id: Optional[int] = Query(None),
    category_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Lesson)
    if level_id:
        query = query.filter(Lesson.level_id == level_id)
    if category_id:
        query = query.filter(Lesson.category_id == category_id)
    return query.order_by(Lesson.order_index).all()

@router.get("/{id}", response_model=LessonResponse)
def get_lesson(id: int, db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(Lesson.id == id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson
 archaeology = router
 architecture = router
