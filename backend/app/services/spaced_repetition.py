from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from ..models.progress import UserWordProgress

class SpacedRepetitionService:
    @staticmethod
    def calculate_next_review(familiarity_score: int, correct: bool) -> datetime:
        # Simple SM-2 like logic
        intervals = [1, 3, 7, 14, 30, 90]
        
        # This is a simplified version for now
        # familiarity_score acts as the level/interval index
        idx = min(familiarity_score // 10, len(intervals) - 1)
        
        days = intervals[idx] if correct else 1
        return datetime.utcnow() + timedelta(days=days)

    @staticmethod
    def update_word_progress(db: Session, user_id: int, word_id: int, correct: bool):
        progress = db.query(UserWordProgress).filter(
            UserWordProgress.user_id == user_id,
            UserWordProgress.word_id == word_id
        ).first()

        if not progress:
            progress = UserWordProgress(user_id=user_id, word_id=word_id)
            db.add(progress)

        progress.times_reviewed += 1
        if correct:
            progress.times_correct += 1
            progress.familiarity_score = min(progress.familiarity_score + 10, 100)
        else:
            progress.familiarity_score = max(progress.familiarity_score - 20, 0)

        progress.next_review_date = SpacedRepetitionService.calculate_next_review(
            progress.familiarity_score, correct
        )
        progress.last_reviewed = datetime.utcnow()
        
        db.commit()
        return progress

spaced_repetition_service = SpacedRepetitionService()
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
 archaeology = spaced_repetition_service
