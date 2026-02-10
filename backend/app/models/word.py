from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..database import Base

class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    level_id = Column(Integer, ForeignKey("levels.id"))
    french = Column(String, index=True)
    turkish = Column(String, index=True)
    phonetic_ipa = Column(String, nullable=True)
    example_sentence_fr = Column(Text, nullable=True)
    example_sentence_tr = Column(Text, nullable=True)
    audio_url = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    gender = Column(String, nullable=True) # m, f, neutral
    word_type = Column(String) # noun, verb, adjective, etc.
    plural_form = Column(String, nullable=True)
    notes = Column(Text, nullable=True)

    category = relationship("Category", back_populates="words")
    level = relationship("Level", back_populates="words")
    user_progress = relationship("UserWordProgress", back_populates="word")
