from database import SessionLocal, engine, Base
from sqlalchemy import Column, Integer, String

class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    graduation_year = Column(Integer)
    department = Column(String)

Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    if db.query(DBUser).count() == 0:
        alumni_samples = [
            DBUser(name="Ahmet Yılmaz", email="ahmet@alumni.istanbul.edu.tr", graduation_year=2021, department="Management Information Systems"),
            DBUser(name="Ayşe Kaya", email="ayse@alumni.istanbul.edu.tr", graduation_year=2023, department="Computer Engineering"),
            DBUser(name="Hasan Talha", email="htgzl.phone@gmail.com", graduation_year=2026, department="Management Information Systems"),
            DBUser(name="Zeynep Demir", email="zeynep@alumni.istanbul.edu.tr", graduation_year=2020, department="Economics")
        ]
        db.add_all(alumni_samples)
        db.commit()
    db.close()

if __name__ == "__main__":
    seed_data()