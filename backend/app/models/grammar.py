from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..database import Base

class GrammarRule(Base):
    __tablename__ = "grammar_rules"

    id = Column(Integer, primary_key=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.id"))
    title_tr = Column(String)
    title_fr = Column(String)
    explanation_tr = Column(Text)
    formula = Column(String, nullable=True)
    examples_json = Column(JSON)
    order_index = Column(Integer)
    difficulty = Column(Integer)

    level = relationship("Level", back_populates="grammar_rules")
