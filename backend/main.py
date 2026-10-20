from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import List, Optional

app = FastAPI(
    title="Istanbul University Alumni Platform API",
    description="Backend API for Alumni Portal with full CRUD and Swagger UI.",
    version="1.1.0"
)


# ----------------- MODELLER (Pydantic) -----------------
class UserBase(BaseModel):
    name: str
    email: str
    graduation_year: int
    department: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int


# Geçici hafıza içi veritabanı (In-memory DB)
fake_users_db = [
    {
        "id": 1,
        "name": "Ahmet Yılmaz",
        "email": "ahmet@alumni.istanbul.edu.tr",
        "graduation_year": 2021,
        "department": "Management Information Systems"
    },
    {
        "id": 2,
        "name": "Ayşe Kaya",
        "email": "ayse@alumni.istanbul.edu.tr",
        "graduation_year": 2023,
        "department": "Computer Engineering"
    }
]


# ----------------- 2. HAFTA ROTALARI -----------------
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
        "version": "1.1.0",
        "features": ["Scrollytelling Landing Page", "Alumni Directory", "Job Board"]
    }


# ----------------- 3. HAFTA CRUD ROTALARI (/api/users) -----------------

# 1. READ ALL (Tüm Mezunları Listele)
@app.get("/api/users", response_model=List[User], tags=["Users"])
def get_all_users():
    return fake_users_db


# 2. READ ONE (ID ile Tekil Getir)
@app.get("/api/users/{user_id}", response_model=User, tags=["Users"])
def get_user_by_id(user_id: int):
    user = next((u for u in fake_users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# 3. CREATE (Yeni Mezun Kaydı Ekle)
@app.post("/api/users", response_model=User, status_code=status.HTTP_201_CREATED, tags=["Users"])
def create_user(user_in: UserCreate):
    new_id = len(fake_users_db) + 1 if fake_users_db else 1
    new_user = {"id": new_id, **user_in.model_dump()}
    fake_users_db.append(new_user)
    return new_user


# 4. UPDATE (Mezun Bilgilerini Güncelle)
@app.put("/api/users/{user_id}", response_model=User, tags=["Users"])
def update_user(user_id: int, user_in: UserCreate):
    user_idx = next((i for i, u in enumerate(fake_users_db) if u["id"] == user_id), None)
    if user_idx is None:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = {"id": user_id, **user_in.model_dump()}
    fake_users_db[user_idx] = updated_user
    return updated_user


# 5. DELETE (Mezun Kaydını Sil)
@app.delete("/api/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Users"])
def delete_user(user_id: int):
    user_idx = next((i for i, u in enumerate(fake_users_db) if u["id"] == user_id), None)
    if user_idx is None:
        raise HTTPException(status_code=404, detail="User not found")
    fake_users_db.pop(user_idx)
    return None