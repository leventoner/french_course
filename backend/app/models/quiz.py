from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..database import Base

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    level_id = Column(Integer, ForeignKey("levels.id"))
    quiz_type = Column(String) # multiple_choice, fill_blank, match_pairs, translate, listen_write, image_select, word_order
    questions_json = Column(JSON)
    time_limit_seconds = Column(Integer, nullable=True)
    pass_score = Column(Integer, default=70)
    xp_reward = Column(Integer, default=20)

    lesson = relationship("Lesson", back_populates="quizzes")
