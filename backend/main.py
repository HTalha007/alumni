from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from routers import users, announcements, jobs
from database import SessionLocal, engine, Base
from models import User, JobPosting, Application
import time
from datetime import datetime
import os

# 6. Görev İçin Hazırlık
os.makedirs("logs", exist_ok=True)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Istanbul University Alumni Platform API",
    description="Backend API refactored to MVC pattern with Users, Announcements, and Jobs modules.",
    version="1.2.0",
    docs_url="/api/swagger",
    openapi_url="/api/openapi.json"
)


# ==========================================
# 7. GÖREV: Generic 404 Page (Genel 404 Sayfası)
# ==========================================
@app.get("/404", include_in_schema=False)
def generic_404_page():
    return JSONResponse(
        status_code=404,
        content={
            "error": "404 - Not Found",
            "message": "Aradığınız sayfa, rota veya kaynak bulunamadı (Generic 404 Page).",
            "action": "Lütfen adresi kontrol edip geçerli bir API ucuna istek atın."
        }
    )


# 5. Görev: 5xx Guardian Middleware
@app.middleware("http")
async def guardian_5xx_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        error_message = f"[{current_time}] 🚨 KRİTİK SUNUCU HATASI (500): {e} | Rota: {request.url.path}"
        print(error_message)
        with open("logs/error.logs", "a", encoding="utf-8") as log_file:
            log_file.write(error_message + "\n")
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "reason": "Sistemde beklenmeyen bir hata oluştu ve sunucu çökmekten kurtarıldı. Lütfen daha sonra tekrar deneyiniz."
            }
        )


# ==========================================
# 7. GÖREV: Redirect Invalid Request (Geçersiz İstekleri Yönlendir)
# (Eski 404 Guardian'ı güncelledik)
# ==========================================
@app.middleware("http")
async def guardian_404_redirect_middleware(request: Request, call_next):
    response = await call_next(request)

    # Eğer istek atılan rota sistemde yoksa (404 hatası) ve şu an zaten /404 sayfasında değilsek:
    if response.status_code == 404 and request.url.path != "/404":
        # Kullanıcıyı otomatik olarak Genel 404 Sayfasına YÖNLENDİR (Redirect)
        return RedirectResponse(url="/404")

    return response


# 3. ve 6. Görev Birleşimi: Logger Middleware
@app.middleware("http")
async def logger_middleware(request: Request, call_next):
    start_time = time.time()

    response = await call_next(request)

    process_time_ms = (time.time() - start_time) * 1000
    current_time = datetime.now().strftime("%H:%M:%S")
    method = request.method
    route = request.url.path
    status_code = response.status_code

    print(f"{current_time},{method},{route},{status_code},{process_time_ms:.0f} ms")

    if status_code >= 400:
        file_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        error_log_line = f"[{file_time}] ⚠️ HTTP HATASI ({status_code}): {method} {route} - Süre: {process_time_ms:.0f} ms"
        with open("logs/error.logs", "a", encoding="utf-8") as log_file:
            log_file.write(error_log_line + "\n")

    return response


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


@app.get("/api/crash", include_in_schema=False)
def trigger_crash():
    return 1 / 0


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