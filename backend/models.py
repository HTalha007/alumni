from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    department = Column(String)
    graduation_year = Column(String)
    title = Column(String)

    job_postings = relationship("JobPosting", back_populates="author")
    applications = relationship("Application", back_populates="applicant")


class JobPosting(Base):
    __tablename__ = "job_postings"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))

    author = relationship("User", back_populates="job_postings")
    applications = relationship("Application", back_populates="job_posting")


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


# --- Pydantic Şemaları ---
class UserCreate(BaseModel):
    name: str
    email: str | None = "alumni@istanbul.edu.tr"
    department: str | None = "Management Information Systems"
    graduation_year: str | int | None = 2026
    title: str | None = "Alumni"

class UserUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    department: str | None = None
    graduation_year: str | int | None = None
    title: str | None = None

class AnnouncementCreate(BaseModel):
    title: str
    content: str