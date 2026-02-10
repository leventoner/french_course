from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..database import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    title_tr = Column(String)
    title_fr = Column(String)
    lesson_type = Column(String) # vocabulary, grammar, listening, conversation
    content = Column(Text)
    order_index = Column(Integer)
    xp_reward = Column(Integer, default=10)

    level = relationship("Level", back_populates="lessons")
    category = relationship("Category", back_populates="lessons")
    quizzes = relationship("Quiz", back_populates="lesson")
    user_progress = relationship("UserProgress", back_populates="lesson")
