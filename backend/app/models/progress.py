from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    completed = Column(Boolean, default=False)
    score = Column(Integer, default=0)
    attempts = Column(Integer, default=0)
    best_score = Column(Integer, default=0)
    completed_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson", back_populates="user_progress")

class UserWordProgress(Base):
    __tablename__ = "user_word_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    word_id = Column(Integer, ForeignKey("words.id"))
    familiarity_score = Column(Integer, default=0) # 0-100
    times_reviewed = Column(Integer, default=0)
    times_correct = Column(Integer, default=0)
    last_reviewed = Column(DateTime(timezone=True), onupdate=func.now())
    next_review_date = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="word_progress")
    word = relationship("Word", back_populates="user_progress")
