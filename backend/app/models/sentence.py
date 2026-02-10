from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Sentence(Base):
    __tablename__ = "sentences"

    id = Column(Integer, primary_key=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    french = Column(Text)
    turkish = Column(Text)
    phonetic_ipa = Column(String, nullable=True)
    audio_url = Column(String, nullable=True)
    context_description = Column(Text, nullable=True)
    formality_level = Column(String) # formal, informal
