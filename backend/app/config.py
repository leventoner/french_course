from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "FrançApp"
    DATABASE_URL: str = "postgresql://francapp:francapp@db:5432/francapp"
    REDIS_URL: str = "redis://redis:6379/0"
    SECRET_KEY: str = "super-secret-key-for-francapp"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 11520 # 8 days
    
    MEDIA_ROOT: str = "/app/media"
    AUDIO_PATH: str = "/app/media/audio"
    IMAGE_PATH: str = "/app/media/images"

    class Config:
        env_file = ".env"

settings = Settings()
