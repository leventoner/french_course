from sqlalchemy.orm import Session
from ..database import SessionLocal, engine, Base
from ..models import Level, Category, Word, Lesson, GrammarRule, Quiz, Game, Sentence, UserProgress, UserWordProgress, Achievement, UserAchievement
from ..services.tts_service import tts_service

def seed_data():
    db = SessionLocal()
    
    # Check if data exists
    if db.query(Level).first():
        print("Data zaten mevcut, seed işlemi atlanıyor.")
        return

    print("Veriler ekleniyor...")

    # Levels
    levels_data = [
        {
            "level_number": 1,
            "title_tr": "Başlangıç",
            "title_fr": "Débutant",
            "description_tr": "Alfabe, selamlaşma ve temel ifadeler.",
            "min_xp_required": 0,
            "color_theme": "#2563EB",
            "icon_name": "baguette",
            "total_lessons": 5
        },
        {
            "level_number": 2,
            "title_tr": "Temel",
            "title_fr": "Élémentaire",
            "description_tr": "Aile, meslekler ve günlük yaşam.",
            "min_xp_required": 500,
            "color_theme": "#DC2626",
            "icon_name": "croissant",
            "total_lessons": 8
        }
    ]

    levels = []
    for l_data in levels_data:
        level = Level(**l_data)
        db.add(level)
        db.flush()
        levels.append(level)

    # Categories for Level 1
    categories_l1 = [
        {"level_id": levels[0].id, "name_tr": "Selamlaşma", "name_fr": "Salutations", "order_index": 1, "category_type": "vocabulary"},
        {"level_id": levels[0].id, "name_tr": "Sayılar (0-20)", "name_fr": "Les Nombres", "order_index": 2, "category_type": "vocabulary"}
    ]

    cats = []
    for c_data in categories_l1:
        cat = Category(**c_data)
        db.add(cat)
        db.flush()
        cats.append(cat)

    # Words for Selamlaşma
    words_data = [
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Bonjour", "turkish": "Merhaba / Günaydın", "phonetic_ipa": "/bɔ̃.ʒuʁ/", "word_type": "expression"},
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Salut", "turkish": "Selam", "phonetic_ipa": "/sa.ly/", "word_type": "expression"},
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Au revoir", "turkish": "Hoşçakal", "phonetic_ipa": "/o.ʁə.vwaʁ/", "word_type": "expression"},
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Merci", "turkish": "Teşekkür ederim", "phonetic_ipa": "/mɛʁ.si/", "word_type": "expression"},
    ]

    for w_data in words_data:
        word = Word(**w_data)
        audio_file = tts_service.generate_audio(word.french)
        word.audio_url = f"/media/audio/{audio_file}"
        db.add(word)

    # Lessons for Level 1
    lessons_data = [
        {
            "level_id": levels[0].id,
            "category_id": cats[0].id,
            "title_tr": "Temel Selamlaşma",
            "title_fr": "Salutations de Base",
            "content": "Fransızca'da en yaygın selamlaşma Bonjour'dur. Günün her saati kullanılabilir.",
            "lesson_type": "standard",
            "xp_reward": 100,
            "order_index": 1
        },
        {
            "level_id": levels[0].id,
            "category_id": cats[0].id,
            "title_tr": "Vedalaşma Kalıpları",
            "title_fr": "Prendre Congé",
            "content": "Hoşçakal demek için 'Au revoir' kullanılır. Arkadaş arasında 'Salut' da denebilir.",
            "lesson_type": "standard",
            "xp_reward": 80,
            "order_index": 2
        }
    ]

    for l_data in lessons_data:
        lesson = Lesson(**l_data)
        db.add(lesson)

    # Grammar Rules for Level 1
    grammar_data = [
        {
            "level_id": levels[0].id,
            "title_tr": "Şahıs Zamirleri",
            "title_fr": "Les Pronoms Personnels Sujets",
            "explanation_tr": "Cümledeki özneyi belirten zamirlerdir.",
            "formula": "Je, Tu, Il/Elle, Nous, Vous, Ils/Elles",
            "examples_json": [
                {"fr": "Je parle français.", "tr": "Ben Fransızca konuşuyorum."},
                {"fr": "Tu es étudiant.", "tr": "Sen öğrencisin."}
            ],
            "order_index": 1,
            "difficulty": 1
        }
    ]

    for g_data in grammar_data:
        rule = GrammarRule(**g_data)
        db.add(rule)

    db.commit()
    print("Seed tamamlandı!")
    db.close()

if __name__ == "__main__":
    seed_data()
