from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    current_level = Column(Integer, default=1)
    total_xp = Column(Integer, default=0)
    streak_days = Column(Integer, default=0)
    last_login = Column(DateTime(timezone=True), onupdate=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    preferred_daily_goal = Column(Integer, default=10)
    avatar_url = Column(String, nullable=True)

    progress = relationship("UserProgress", back_populates="user")
    word_progress = relationship("UserWordProgress", back_populates="user")
    achievements = relationship("UserAchievement", back_populates="user")
