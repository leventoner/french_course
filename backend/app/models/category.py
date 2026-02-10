from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.id"))
    name_tr = Column(String)
    name_fr = Column(String)
    icon_url = Column(String, nullable=True)
    order_index = Column(Integer)
    category_type = Column(String) # vocabulary, grammar, conversation, culture

    level = relationship("Level", back_populates="categories")
    words = relationship("Word", back_populates="category")
    lessons = relationship("Lesson", back_populates="category")
