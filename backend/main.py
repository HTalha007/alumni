from fastapi import FastAPI
from routers import users, announcements

app = FastAPI(
    title="Istanbul University Alumni Platform API",
    description="Backend API refactored to MVC pattern with Users and Announcements modules.",
    version="1.2.0"
)

# 2. Hafta Rotaları
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

# 4. Hafta MVC Modüllerini Uygulamaya Bağlama
app.include_router(users.router)
app.include_router(announcements.router)