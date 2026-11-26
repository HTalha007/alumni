from database import SessionLocal, engine, Base
from models import User, JobPosting, Application, Announcement
from security import hash_password
from sqlalchemy import text

def ensure_columns():
    with engine.connect() as conn:
        try:
            existing = [row[1] for row in conn.execute(text("PRAGMA table_info(users)")).fetchall()]
            if existing:
                if "email" not in existing:
                    conn.execute(text("ALTER TABLE users ADD COLUMN email VARCHAR"))
                if "hashed_password" not in existing:
                    conn.execute(text("ALTER TABLE users ADD COLUMN hashed_password VARCHAR"))
                if "role" not in existing:
                    conn.execute(text("ALTER TABLE users ADD COLUMN role VARCHAR DEFAULT 'alumni'"))
                if "is_active" not in existing:
                    conn.execute(text("ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1"))
                existing_ann = [row[1] for row in conn.execute(text("PRAGMA table_info(announcements)")).fetchall()]
            if existing_ann:
                if "category" not in existing_ann:
                    conn.execute(text("ALTER TABLE announcements ADD COLUMN category VARCHAR DEFAULT 'Genel'"))
                if "date" not in existing_ann:
                    conn.execute(text("ALTER TABLE announcements ADD COLUMN date VARCHAR"))

            conn.commit()
        except Exception as e:
            print(f"Tablo kolon güncelleme hatası/notu: {e}")

Base.metadata.create_all(bind=engine)

def seed_data():
    ensure_columns()
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # 1. Varsayılan Kullanıcılar (Admin, Mezun, Öğrenci)
        admin_email = "htgzl.phone@gmail.com"
        hasan_admin = db.query(User).filter(User.email == admin_email).first()
        if not hasan_admin:
            hasan_admin = User(
                name="Hasan Talha",
                email=admin_email,
                hashed_password=hash_password("admin123"),
                graduation_year="2026",
                department="Yönetim Bilişim Sistemleri",
                title="Sistem Yöneticisi & Lead Architect",
                role="admin",
                is_active=True
            )
            db.add(hasan_admin)
        else:
            hasan_admin.role = "admin"
            hasan_admin.hashed_password = hash_password("admin123")
            hasan_admin.is_active = True

        # Yedek kurumsal admin
        corp_admin_email = "admin@istanbul.edu.tr"
        corp_admin = db.query(User).filter(User.email == corp_admin_email).first()
        if not corp_admin:
            corp_admin = User(
                name="Rektörlük Koordinatörü",
                email=corp_admin_email,
                hashed_password=hash_password("admin123"),
                graduation_year="2010",
                department="Hukuk Fakültesi",
                title="Rektör Danışmanı",
                role="admin",
                is_active=True
            )
            db.add(corp_admin)

        # Örnek Mezun
        alumni_email = "ahmet@alumni.istanbul.edu.tr"
        sample_alumni = db.query(User).filter(User.email == alumni_email).first()
        if not sample_alumni:
            sample_alumni = User(
                name="Ahmet Yılmaz",
                email=alumni_email,
                hashed_password=hash_password("alumni123"),
                graduation_year="2021",
                department="Bilgisayar Mühendisliği",
                title="Kıdemli Yazılım Mühendisi",
                role="alumni",
                is_active=True
            )
            db.add(sample_alumni)
        else:
            if not sample_alumni.hashed_password:
                sample_alumni.hashed_password = hash_password("alumni123")

        # Örnek Öğrenci
        student_email = "ogrenci@istanbul.edu.tr"
        sample_student = db.query(User).filter(User.email == student_email).first()
        if not sample_student:
            sample_student = User(
                name="Elif Yurt",
                email=student_email,
                hashed_password=hash_password("student123"),
                graduation_year="2027",
                department="İktisat Fakültesi",
                title="3. Sınıf Öğrencisi",
                role="student",
                is_active=True
            )
            db.add(sample_student)

        db.commit()

        # 2. Örnek İlanlar
        author = db.query(User).filter(User.role.in_(["admin", "alumni"])).first()
        if author and db.query(JobPosting).count() == 0:
            job1 = JobPosting(
                title="Junior Backend Geliştirici (Python/FastAPI)",
                description="Kurum: İstanbul Teknopark Ar-Ge\nŞehir: İstanbul\n\nPozisyon Detayı:\nPython, FastAPI ve SQL bilen genç mezun ve mezun adayı çalışma arkadaşı aranmaktadır.",
                author_id=author.id
            )
            job2 = JobPosting(
                title="Hukuk Stajyeri / Legal Intern",
                description="Kurum: Aksoy & Ortakları Hukuk Bürosu\nŞehir: İstanbul (Çağlayan)\n\nPozisyon Detayı:\nTicaret ve sözleşmeler hukuku alanında yetiştirilmek üzere son sınıf öğrencisi veya yeni mezun aranıyor.",
                author_id=author.id
            )
            db.add_all([job1, job2])
            db.commit()

            applicant = db.query(User).filter(User.role == "student").first() or author
            app1 = Application(
                job_posting_id=job1.id,
                applicant_id=applicant.id,
                cover_letter="İstanbul Üniversitesi'nde aldığım kuramsal eğitimi kurumunuzun teknoloji projelerinde pratiğe dönüştürmek istiyorum."
            )
            db.add(app1)
            db.commit()

        # 3. Örnek Duyurular
        if db.query(Announcement).count() == 0:
            ann1 = Announcement(
                title="2026 Geleneksel Mezunlar Günü Beyazıt Buluşması",
                content="Tüm dönem mezunlarımız ve mensuplarımızla Beyazıt Tarihi Kapısı altında 15 Mayıs'ta bir araya geliyoruz.",
                category="Etkinlik",
                date="2026-05-15"
            )
            ann2 = Announcement(
                title="Kariyer ve Mentorluk Ağı Başvuruları Başladı",
                content="Öğrencilerimize rehberlik etmek isteyen deneyimli mezunlarımız için mentorluk eşleştirme başvuruları açılmıştır.",
                category="Kariyer",
                date="2026-04-01"
            )
            db.add_all([ann1, ann2])
            db.commit()

        print("Veritabanı seed işlemi başarıyla tamamlandı.")
    except Exception as e:
        print(f"Seed işlemi hatası: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
