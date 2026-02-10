from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from .database import engine, Base
from .config import settings

# Import models to ensure they are registered
from .models import * # Import all from __init__.py

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure media directory exists
os.makedirs(settings.AUDIO_PATH, exist_ok=True)
os.makedirs(settings.IMAGE_PATH, exist_ok=True)

# Mount static files
app.mount("/media", StaticFiles(directory=settings.MEDIA_ROOT), name="media")

@app.get("/")
def read_root():
    return {"message": "Welcome to FrançApp API"}

# Routers
from .routers import auth, levels, words, tts, lessons, grammar, progress, achievements

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(levels.router, prefix="/levels", tags=["levels"])
app.include_router(words.router, prefix="/words", tags=["words"])
app.include_router(lessons.router, prefix="/lessons", tags=["lessons"])
app.include_router(grammar.router, prefix="/grammar", tags=["grammar"])
app.include_router(progress.router, prefix="/progress", tags=["progress"])
app.include_router(achievements.router, prefix="/achievements", tags=["achievements"])
app.include_router(tts.router, prefix="/tts", tags=["tts"])
