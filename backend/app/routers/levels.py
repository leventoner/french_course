from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.level import Level
from ..models.category import Category
from ..schemas.models import LevelResponse, CategoryResponse

router = APIRouter()

@router.get("/", response_model=List[LevelResponse])
def get_levels(db: Session = Depends(get_db)):
    return db.query(Level).order_by(Level.level_number).all()

@router.get("/{id}", response_model=LevelResponse)
def get_level(id: int, db: Session = Depends(get_db)):
    level = db.query(Level).filter(Level.id == id).first()
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    return level

@router.get("/{level_id}/categories", response_model=List[CategoryResponse])
def get_level_categories(level_id: int, db: Session = Depends(get_db)):
    return db.query(Category).filter(Category.level_id == level_id).order_by(Category.order_index).all()
 archaeology = router
