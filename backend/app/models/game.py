from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..database import Base

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    level_id = Column(Integer, ForeignKey("levels.id"))
    game_type = Column(String) # memory_cards, hangman, word_search, speed_translate, image_guess, sentence_builder
    config_json = Column(JSON)
    xp_reward = Column(Integer, default=30)
