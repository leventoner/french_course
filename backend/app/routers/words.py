from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models.word import Word
from ..schemas.models import WordResponse

router = APIRouter()

@router.get("/", response_model=List[WordResponse])
def get_words(
    level_id: Optional[int] = None,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Word)
    if level_id:
        query = query.filter(Word.level_id == level_id)
    if category_id:
        query = query.filter(Word.category_id == category_id)
    if search:
        query = query.filter(
            (Word.french.ilike(f"%{search}%")) | 
            (Word.turkish.ilike(f"%{search}%"))
        )
    return query.all()

@router.get("/{id}", response_model=WordResponse)
def get_word(id: int, db: Session = Depends(get_db)):
    word = db.query(Word).filter(Word.id == id).first()
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    return word
