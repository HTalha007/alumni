from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import sys
import os

# Üst dizindeki modüllere erişim için
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models import JobPosting, Application
from database import get_db

# Router'ı oluştururken prefix ekliyoruz, böylece tüm yollar /jobs ile başlayacak
router = APIRouter(prefix="/jobs", tags=["Jobs & Applications"])

# --- Pydantic Şemaları ---
class JobCreate(BaseModel):
    title: str
    description: str
    author_id: int

class ApplicationCreate(BaseModel):
    applicant_id: int
    cover_letter: str

# --- 4. ADIM: Direct Routes (İş İlanları) ---
@router.post("/")
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    new_job = JobPosting(
        title=job.title,
        description=job.description,
        author_id=job.author_id
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

@router.get("/")
def get_jobs(db: Session = Depends(get_db)):
    return db.query(JobPosting).all()

# --- 5. ADIM: Nested Routes (İç İçe Rotalar - Başvurular) ---
@router.post("/{job_id}/applications/")
def create_application(job_id: int, app_data: ApplicationCreate, db: Session = Depends(get_db)):
    new_app = Application(
        job_posting_id=job_id,
        applicant_id=app_data.applicant_id,
        cover_letter=app_data.cover_letter
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

@router.get("/{job_id}/applications/")
def get_job_applications(job_id: int, db: Session = Depends(get_db)):
    return db.query(Application).filter(Application.job_posting_id == job_id).all()