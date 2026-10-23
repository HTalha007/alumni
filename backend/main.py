from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, announcements, jobs
from database import SessionLocal, engine, Base
from models import User, JobPosting, Application

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Istanbul University Alumni Platform API",
    description="Backend API refactored to MVC pattern with Users, Announcements, and Jobs modules.",
    version="1.2.0",
    docs_url="/api/swagger",
    openapi_url="/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "success", "message": "Welcome to Istanbul University Alumni API"}

@app.get("/hello")
def get_hello():
    return {"message": "Hello, World!"}

@app.get("/hello/{name}")
def get_hello_name(name: str):
    return {"message": f"Hello, {name}!"}

@app.get("/sum/{a}/{b}")
def calculate_sum(a: int, b: int):
    return {"operation": "addition", "a": a, "b": b, "result": a + b}

@app.get("/about")
def get_about():
    return {
        "project": "Alumni Platform",
        "institution": "Istanbul University",
        "version": "1.2.0",
        "features": ["Scrollytelling Landing Page", "Alumni Directory", "Job Board", "Announcements"]
    }

app.include_router(users.router, prefix="/api/users", tags=["Users (API)"])
app.include_router(announcements.router, prefix="/api/announcements", tags=["Announcements (API)"])

app.include_router(users.router, prefix="/users", tags=["Users"], include_in_schema=False)
app.include_router(announcements.router, prefix="/announcements", tags=["Announcements"], include_in_schema=False)
app.include_router(jobs.router)
app.include_router(jobs.router, prefix="/api", include_in_schema=False)


def seed_jobs_and_applications():
    db = SessionLocal()
    try:
        first_user = db.query(User).first()
        if not first_user:
            first_user = User(
                name="Ahmet Yılmaz",
                department="Management Information Systems",
                graduation_year="2021",
                title="Software Engineer"
            )
            second_user = User(
                name="Ayşe Kaya",
                department="Computer Engineering",
                graduation_year="2023",
                title="Data Analyst"
            )
            db.add_all([first_user, second_user])
            db.commit()
            db.refresh(first_user)

        if db.query(JobPosting).count() == 0:
            job1 = JobPosting(
                title="Frontend Developer (React/Vite)",
                description="Awwwards seviyesinde arayüzler geliştirebilecek yetenekli takım arkadaşı arıyoruz.",
                author_id=first_user.id
            )
            job2 = JobPosting(
                title="Data Analyst",
                description="Python ve SQL yetenekleri gelişmiş, analitik düşünen uzman aranıyor.",
                author_id=first_user.id
            )
            db.add_all([job1, job2])
            db.commit()
            db.refresh(job1)

            app1 = Application(
                job_posting_id=job1.id,
                applicant_id=first_user.id,
                cover_letter="React ve Tailwind konusunda kendime güveniyorum. Bu pozisyon tam bana göre!"
            )
            db.add(app1)
            db.commit()
    except Exception as e:
        print(f"Seed hatası: {e}")
    finally:
        db.close()

seed_jobs_and_applications()