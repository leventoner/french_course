from sqlalchemy.orm import Session
from ..database import SessionLocal, engine, Base
from ..models import (
    User, Level, Category, Word, Lesson, GrammarRule, Quiz, Game, 
    Sentence, UserProgress, UserWordProgress, Achievement, UserAchievement
)
from ..services.tts_service import tts_service
from ..services.auth_service import auth_service

def seed_data():
    db = SessionLocal()
    
    # Root kullanıcı kontrolü
    root_user = db.query(User).filter(User.username == "root").first()
    if not root_user:
        print("Root kullanıcısı oluşturuluyor...")
        root_user = User(
            username="root",
            email="root@francapp.com",
            password_hash=auth_service.get_password_hash("root"),
            current_level=1,
            total_xp=0,
            streak_days=0,
            is_admin=True
        )
        db.add(root_user)
        db.commit()
    
    # Seviyeler
    levels_data = [
        {
            "level_number": 1,
            "title_tr": "Yeni Başlayanlar (A1.1)",
            "title_fr": "Vrais Débutants (A1.1)",
            "description_tr": "Fransızca'ya ilk adım: Alfabe, basit selamlaşmalar ve sayılar.",
            "min_xp_required": 0,
            "color_theme": "#2563EB", # Blue
            "icon_name": "BookOpen",
            "total_lessons": 10
        },
        {
            "level_number": 2,
            "title_tr": "Temel Seviye (A1.2)",
            "title_fr": "Niveau Élémentaire (A1.2)",
            "description_tr": "Kendinizi tanıtma, aile, hobiler ve günlük rutinler.",
            "min_xp_required": 500,
            "color_theme": "#DC2626", # Red
            "icon_name": "MessageSquare",
            "total_lessons": 15
        },
        {
            "level_number": 3,
            "title_tr": "Orta Öncesi (A2)",
            "title_fr": "Pré-Intermédiaire (A2)",
            "description_tr": "Geçmiş zaman, alışveriş, seyahat ve temel ihtiyaçlar.",
            "min_xp_required": 1500,
            "color_theme": "#059669", # Green
            "icon_name": "Plane",
            "total_lessons": 20
        }
    ]

    existing_levels = db.query(Level).count()
    if existing_levels == 0:
        print("Seviyeler ekleniyor...")
        levels = []
        for l_data in levels_data:
            level = Level(**l_data)
            db.add(level)
            db.flush()
            levels.append(level)
    else:
        levels = db.query(Level).order_by(Level.level_number).all()

    # Kategoriler (Level 1 için)
    categories_data = [
        {"level_id": levels[0].id, "name_tr": "Selamlaşma", "name_fr": "Salutations", "order_index": 1, "category_type": "vocabulary", "icon_name": "Smile"},
        {"level_id": levels[0].id, "name_tr": "Sayılar", "name_fr": "Les Nombres", "order_index": 2, "category_type": "vocabulary", "icon_name": "Hash"},
        {"level_id": levels[0].id, "name_tr": "Renkler", "name_fr": "Les Couleurs", "order_index": 3, "category_type": "vocabulary", "icon_name": "Palette"},
        {"level_id": levels[0].id, "name_tr": "Temel Gramer", "name_fr": "Grammaire de Base", "order_index": 4, "category_type": "grammar", "icon_name": "FileText"},
        {"level_id": levels[0].id, "name_tr": "Okuma Parçaları", "name_fr": "Lectures", "order_index": 5, "category_type": "reading", "icon_name": "Library"}
    ]

    existing_cats = db.query(Category).count()
    if existing_cats == 0:
        print("Kategoriler ekleniyor...")
        cats = []
        for c_data in categories_data:
            cat = Category(**c_data)
            db.add(cat)
            db.flush()
            cats.append(cat)
    else:
        cats = db.query(Category).all()

    # Kelimeler (Genişletilmiş)
    words_data = [
        # Selamlaşma
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Bonjour", "turkish": "Merhaba / Günaydın", "phonetic_ipa": "/bɔ̃.ʒuʁ/", "word_type": "adverb"},
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Salut", "turkish": "Selam", "phonetic_ipa": "/sa.ly/", "word_type": "expression"},
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Bonsoir", "turkish": "İyi akşamlar", "phonetic_ipa": "/bɔ̃.swaʁ/", "word_type": "expression"},
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Bonne nuit", "turkish": "İyi geceler", "phonetic_ipa": "/bɔn nɥi/", "word_type": "expression"},
        {"category_id": cats[0].id, "level_id": levels[0].id, "french": "Ça va ?", "turkish": "Nasıl gidiyor? / İyi misin?", "phonetic_ipa": "/sa va/", "word_type": "expression"},
        # Sayılar
        {"category_id": cats[1].id, "level_id": levels[0].id, "french": "Un", "turkish": "Bir", "phonetic_ipa": "/œ̃/", "word_type": "number"},
        {"category_id": cats[1].id, "level_id": levels[0].id, "french": "Deux", "turkish": "İki", "phonetic_ipa": "/dø/", "word_type": "number"},
        {"category_id": cats[1].id, "level_id": levels[0].id, "french": "Trois", "turkish": "Üç", "phonetic_ipa": "/tʁwa/", "word_type": "number"},
        {"category_id": cats[1].id, "level_id": levels[0].id, "french": "Quatre", "turkish": "Dört", "phonetic_ipa": "/katʁ/", "word_type": "number"},
        {"category_id": cats[1].id, "level_id": levels[0].id, "french": "Cinq", "turkish": "Beş", "phonetic_ipa": "/sɛ̃k/", "word_type": "number"},
        # Renkler
        {"category_id": cats[2].id, "level_id": levels[0].id, "french": "Rouge", "turkish": "Kırmızı", "phonetic_ipa": "/ʁuʒ/", "word_type": "adjective"},
        {"category_id": cats[2].id, "level_id": levels[0].id, "french": "Bleu", "turkish": "Mavi", "phonetic_ipa": "/blø/", "word_type": "adjective"},
        {"category_id": cats[2].id, "level_id": levels[0].id, "french": "Vert", "turkish": "Yeşil", "phonetic_ipa": "/vɛʁ/", "word_type": "adjective"},
        {"category_id": cats[2].id, "level_id": levels[0].id, "french": "Blanc", "turkish": "Beyaz", "phonetic_ipa": "/blɑ̃/", "word_type": "adjective"},
        {"category_id": cats[2].id, "level_id": levels[0].id, "french": "Noir", "turkish": "Siyah", "phonetic_ipa": "/nwaʁ/", "word_type": "adjective"},
    ]

    if db.query(Word).count() == 0:
        print("Kelimeler ve sesler ekleniyor...")
        for w_data in words_data:
            word = Word(**w_data)
            try:
                audio_file = tts_service.generate_audio(word.french)
                word.audio_url = f"/media/audio/{audio_file}"
            except Exception as e:
                print(f"Ses oluşturma hatası ({word.french}): {e}")
            db.add(word)

    # Dersler
    lessons_data = [
        {
            "level_id": levels[0].id,
            "category_id": cats[0].id,
            "title_tr": "İlk Selamlaşma",
            "title_fr": "Premiers Contacts",
            "lesson_type": "vocabulary",
            "content": "Fransızlar selamlaşmaya çok önem verirler. En yaygın ifade 'Bonjour'dur. Arkadaşlarınızla 'Salut' diyebilirsiniz.\n\nEgzersiz: Aşağıdaki kelimeleri tekrar edin ve seslerini dinleyin.",
            "xp_reward": 50,
            "order_index": 1
        },
        {
            "level_id": levels[0].id,
            "category_id": cats[4].id,
            "title_tr": "Bir Kafe Hikayesi",
            "title_fr": "Une Histoire de Café",
            "lesson_type": "reading",
            "content": "**Metin:**\nMarie bir kafeye gider. 'Bonjour!' der. Bir kahve ister (Un café, s'il vous plaît). Garson 'Voila' der. Marie teşekkür eder: 'Merci!'.\n\n**Sözlük:**\n- S'il vous plaît: Lütfen\n- Un café: Bir kahve\n- Garçon: Garson / Genç adam",
            "xp_reward": 100,
            "order_index": 1
        }
    ]

    if db.query(Lesson).count() == 0:
        print("Dersler ekleniyor...")
        for l_data in lessons_data:
            lesson = Lesson(**l_data)
            db.add(lesson)
            db.flush()
            
            # Quiz ekle her derse
            if l_data["lesson_type"] == "vocabulary":
                quiz = Quiz(
                    lesson_id=lesson.id,
                    level_id=levels[0].id,
                    quiz_type="multiple_choice",
                    questions_json=[
                        {"question": "Hangisi 'Merhaba' demektir?", "options": ["Bonjour", "Merci", "Noir"], "answer": "Bonjour"},
                        {"question": "Hangisi 'Selam' demektir?", "options": ["Salut", "Trois", "Vert"], "answer": "Salut"}
                    ],
                    xp_reward=20
                )
                db.add(quiz)

    # Başarımlar
    achievements_data = [
        {"name_tr": "İlk Adım", "name_fr": "Premier Pas", "description_tr": "İlk dersini tamamla.", "condition_type": "lessons_completed", "condition_value": 1, "xp_reward": 100, "icon_url": "stars"},
        {"name_tr": "Kelime Avcısı", "name_fr": "Chasseur de Mots", "description_tr": "50 kelime öğren.", "condition_type": "words_learned", "condition_value": 50, "xp_reward": 250, "icon_url": "target"},
        {"name_tr": "Yorulmaz", "name_fr": "Infatigable", "description_tr": "7 günlük seri yakala.", "condition_type": "streak_days", "condition_value": 7, "xp_reward": 500, "icon_url": "flame"}
    ]

    if db.query(Achievement).count() == 0:
        print("Başarımlar ekleniyor...")
        for a_data in achievements_data:
            achievement = Achievement(**a_data)
            db.add(achievement)

    db.commit()
    print("Seed işlemi başarıyla tamamlandı!")
    db.close()

if __name__ == "__main__":
    seed_data()
