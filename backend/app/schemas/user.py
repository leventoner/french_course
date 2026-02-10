from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    preferred_daily_goal: Optional[int] = None
    avatar_url: Optional[str] = None

class UserResponse(UserBase):
    id: int
    current_level: int
    total_xp: int
    streak_days: int
    last_login: Optional[datetime]
    created_at: datetime
    preferred_daily_goal: int
    avatar_url: Optional[str]

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
