from fastapi import APIRouter, HTTPException, status
from typing import List
from models import User, UserCreate

router = APIRouter(prefix="/api/users", tags=["Users"])

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

@router.get("", response_model=List[User])
def get_all_users():
    return fake_users_db

@router.get("/{user_id}", response_model=User)
def get_user_by_id(user_id: int):
    user = next((u for u in fake_users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate):
    new_id = len(fake_users_db) + 1 if fake_users_db else 1
    new_user = {"id": new_id, **user_in.model_dump()}
    fake_users_db.append(new_user)
    return new_user

@router.put("/{user_id}", response_model=User)
def update_user(user_id: int, user_in: UserCreate):
    user_idx = next((i for i, u in enumerate(fake_users_db) if u["id"] == user_id), None)
    if user_idx is None:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = {"id": user_id, **user_in.model_dump()}
    fake_users_db[user_idx] = updated_user
    return updated_user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int):
    user_idx = next((i for i, u in enumerate(fake_users_db) if u["id"] == user_id), None)
    if user_idx is None:
        raise HTTPException(status_code=404, detail="User not found")
    fake_users_db.pop(user_idx)
    return None