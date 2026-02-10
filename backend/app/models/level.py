from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from ..database import Base

class Level(Base):
    __tablename__ = "levels"

    id = Column(Integer, primary_key=True, index=True)
    level_number = Column(Integer, unique=True, index=True)
    title_tr = Column(String)
    title_fr = Column(String)
    description_tr = Column(Text)
    min_xp_required = Column(Integer)
    color_theme = Column(String)
    icon_name = Column(String)
    total_lessons = Column(Integer)

    categories = relationship("Category", back_populates="level")
    words = relationship("Word", back_populates="level")
    grammar_rules = relationship("GrammarRule", back_populates="level")
    lessons = relationship("Lesson", back_populates="level")
