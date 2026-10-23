from fastapi import APIRouter, HTTPException, status
from typing import List
from pydantic import BaseModel
from models import UserCreate, UserUpdate

router = APIRouter()


class UserResponse(BaseModel):
    id: int
    name: str
    email: str | None = None
    graduation_year: str | int | None = None
    department: str | None = None
    title: str | None = None


fake_users_db = [
    {
        "id": 1,
        "name": "Ahmet Yılmaz",
        "email": "ahmet@alumni.istanbul.edu.tr",
        "graduation_year": 2021,
        "department": "Management Information Systems",
        "title": "Software Engineer"
    },
    {
        "id": 2,
        "name": "Ayşe Kaya",
        "email": "ayse@alumni.istanbul.edu.tr",
        "graduation_year": 2023,
        "department": "Computer Engineering",
        "title": "Data Analyst"
    }
]


@router.get("", response_model=List[UserResponse])
@router.get("/", response_model=List[UserResponse], include_in_schema=False)
def get_all_users():
    return fake_users_db


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int):
    user = next((u for u in fake_users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED, include_in_schema=False)
def create_user(user_in: UserCreate):
    new_id = max((u["id"] for u in fake_users_db), default=0) + 1
    new_user = {"id": new_id, **user_in.model_dump()}
    fake_users_db.append(new_user)
    return new_user


@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_in: UserCreate):
    user_idx = next((i for i, u in enumerate(fake_users_db) if u["id"] == user_id), None)
    if user_idx is None:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = {"id": user_id, **user_in.model_dump()}
    fake_users_db[user_idx] = updated_user
    return updated_user


@router.patch("/{user_id}", response_model=UserResponse)
def partial_update_user(user_id: int, user_in: UserUpdate):
    user_idx = next((i for i, u in enumerate(fake_users_db) if u["id"] == user_id), None)
    if user_idx is None:
        raise HTTPException(status_code=404, detail="User not found")

    stored_user = fake_users_db[user_idx].copy()
    update_data = user_in.model_dump(exclude_unset=True)
    stored_user.update(update_data)
    fake_users_db[user_idx] = stored_user
    return stored_user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int):
    user_idx = next((i for i, u in enumerate(fake_users_db) if u["id"] == user_id), None)
    if user_idx is None:
        raise HTTPException(status_code=404, detail="User not found")
    fake_users_db.pop(user_idx)
    return None