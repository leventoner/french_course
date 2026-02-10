from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models.grammar import GrammarRule
from ..schemas.models import GrammarRuleResponse

router = APIRouter()

@router.get("/", response_model=List[GrammarRuleResponse])
def get_grammar_rules(
    level_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(GrammarRule)
    if level_id:
        query = query.filter(GrammarRule.level_id == level_id)
    return query.order_by(GrammarRule.order_index).all()
