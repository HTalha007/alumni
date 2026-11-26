from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel, EmailStr
from typing import Optional

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=True)
    department = Column(String, nullable=True)
    graduation_year = Column(String, nullable=True)
    title = Column(String, nullable=True)
    role = Column(String, default="alumni", nullable=False)  # 'admin', 'alumni', 'student'
    is_active = Column(Boolean, default=True, nullable=False)

    job_postings = relationship("JobPosting", back_populates="author", cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="applicant", cascade="all, delete-orphan")


class JobPosting(Base):
    __tablename__ = "job_postings"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))

    author = relationship("User", back_populates="job_postings")
    applications = relationship("Application", back_populates="job_posting", cascade="all, delete-orphan")


class Application(Base):
    __tablename__ = "applications"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    job_posting_id = Column(Integer, ForeignKey("job_postings.id"))
    applicant_id = Column(Integer, ForeignKey("users.id"))
    cover_letter = Column(Text)

    job_posting = relationship("JobPosting", back_populates="applications")
    applicant = relationship("User", back_populates="applications")


class Announcement(Base):
    __tablename__ = "announcements"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    category = Column(String, default="Genel")
    date = Column(String, nullable=True)


# ==========================================
# Pydantic Şemaları
# ==========================================

# --- Auth Şemaları ---
class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    department: str
    graduation_year: str | int = 2026
    title: Optional[str] = "Mezun"
    role: Optional[str] = "alumni"  # 'admin', 'alumni', 'student'

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    department: Optional[str] = None
    graduation_year: Optional[str | int] = None
    title: Optional[str] = None
    role: str = "alumni"
    is_active: bool = True

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class UserRoleUpdate(BaseModel):
    role: str  # 'admin', 'alumni', 'student'

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None
    graduation_year: Optional[str | int] = None
    title: Optional[str] = None

# --- Eski Kodlarla Geriye Dönük Uyumluluk Şemaları ---
class UserCreate(BaseModel):
    name: str
    email: Optional[str] = "alumni@istanbul.edu.tr"
    department: Optional[str] = "Management Information Systems"
    graduation_year: Optional[str | int] = 2026
    title: Optional[str] = "Alumni"
    role: Optional[str] = "alumni"

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    department: Optional[str] = None
    graduation_year: Optional[str | int] = None
    title: Optional[str] = None
    role: Optional[str] = None

class AnnouncementCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = "Genel"
