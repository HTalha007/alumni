from pydantic import BaseModel
from typing import Optional

# Kullanıcı / Mezun Şemaları
class UserBase(BaseModel):
    name: str
    email: str
    graduation_year: int
    department: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

# Duyuru Şemaları (4. Hafta Kapsamı)
class AnnouncementBase(BaseModel):
    title: str
    content: str
    category: str

class AnnouncementCreate(AnnouncementBase):
    pass

class Announcement(AnnouncementBase):
    id: int
    date: str