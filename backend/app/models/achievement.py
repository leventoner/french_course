from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    name_tr = Column(String)
    name_fr = Column(String)
    description_tr = Column(Text)
    icon_url = Column(String)
    condition_type = Column(String)
    condition_value = Column(Integer)
    xp_reward = Column(Integer)

    users = relationship("UserAchievement", back_populates="achievement")

class UserAchievement(Base):
    __tablename__ = "user_achievements"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    achievement_id = Column(Integer, ForeignKey("achievements.id"))
    earned_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="achievements")
    achievement = relationship("Achievement", back_populates="users")
