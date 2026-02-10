from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class LevelBase(BaseModel):
    level_number: int
    title_tr: str
    title_fr: str
    description_tr: str
    min_xp_required: int
    color_theme: str
    icon_name: str
    total_lessons: int

class LevelResponse(LevelBase):
    id: int
    class Config:
        from_attributes = True

class WordBase(BaseModel):
    french: str
    turkish: str
    phonetic_ipa: Optional[str] = None
    example_sentence_fr: Optional[str] = None
    example_sentence_tr: Optional[str] = None
    gender: Optional[str] = None
    word_type: str
    plural_form: Optional[str] = None
    notes: Optional[str] = None

class WordCreate(WordBase):
    category_id: int
    level_id: int

class WordResponse(WordBase):
    id: int
    category_id: int
    level_id: int
    audio_url: Optional[str] = None
    image_url: Optional[str] = None
    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name_tr: str
    name_fr: str
    icon_url: Optional[str] = None
    order_index: int
    category_type: str

class CategoryResponse(CategoryBase):
    id: int
    level_id: int
    class Config:
        from_attributes = True

class LessonBase(BaseModel):
    title_tr: str
    title_fr: str
    content: str
    lesson_type: str
    xp_reward: int
    order_index: int

class LessonCreate(LessonBase):
    level_id: int
    category_id: int

class LessonResponse(LessonBase):
    id: int
    level_id: int
    category_id: int
    class Config:
        from_attributes = True

class GrammarRuleBase(BaseModel):
    title_tr: str
    title_fr: str
    explanation_tr: str
    formula: Optional[str] = None
    examples_json: Optional[List] = None
    order_index: int
    difficulty: int

class GrammarRuleResponse(GrammarRuleBase):
    id: int
    level_id: int
    class Config:
        from_attributes = True

class UserProgressBase(BaseModel):
    lesson_id: int
    completed: bool = False
    score: int = 0

class UserProgressResponse(UserProgressBase):
    id: int
    user_id: int
    attempts: int
    best_score: int
    completed_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class UserWordProgressBase(BaseModel):
    word_id: int
    familiarity_score: int = 0

class UserWordProgressResponse(UserWordProgressBase):
    id: int
    user_id: int
    times_reviewed: int
    times_correct: int
    last_reviewed: Optional[datetime] = None
    next_review_date: datetime
    class Config:
        from_attributes = True

class AchievementBase(BaseModel):
    name_tr: str
    name_fr: str
    description_tr: str
    icon_url: str
    xp_reward: int

class AchievementResponse(AchievementBase):
    id: int
    class Config:
        from_attributes = True

class UserAchievementResponse(BaseModel):
    id: int
    user_id: int
    achievement_id: int
    earned_at: datetime
    achievement: AchievementResponse
    class Config:
        from_attributes = True
