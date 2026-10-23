from fastapi import APIRouter, HTTPException, status
from typing import List
from pydantic import BaseModel
from models import AnnouncementCreate

router = APIRouter()

class AnnouncementResponse(BaseModel):
    id: int
    title: str
    content: str
    category: str | None = None
    date: str | None = None

fake_announcements_db = [
    {
        "id": 1,
        "title": "2026 Mezunlar Buluşması",
        "content": "Beyazıt Kampüsü tarihi avluda tüm dönem mezunlarımızla bir araya geliyoruz.",
        "category": "Etkinlik",
        "date": "2026-11-15"
    },
    {
        "id": 2,
        "title": "Kariyer Zirvesi ve Mentorluk Başvuruları",
        "content": "Yeni mezunlara rehberlik etmek isteyen deneyimli mezunlarımız için mentorluk kayıtları başladı.",
        "category": "Kariyer",
        "date": "2026-10-30"
    }
]

@router.get("", response_model=List[AnnouncementResponse])
@router.get("/", response_model=List[AnnouncementResponse], include_in_schema=False)
def get_all_announcements():
    return fake_announcements_db

@router.get("/{announcement_id}", response_model=AnnouncementResponse)
def get_announcement_by_id(announcement_id: int):
    item = next((a for a in fake_announcements_db if a["id"] == announcement_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return item

@router.post("", response_model=AnnouncementResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=AnnouncementResponse, status_code=status.HTTP_201_CREATED, include_in_schema=False)
def create_announcement(announcement_in: AnnouncementCreate):
    new_id = max((a["id"] for a in fake_announcements_db), default=0) + 1
    new_new = {
        "id": new_id,
        "date": "2026-10-22",
        "category": "Genel",
        **announcement_in.model_dump()
    }
    fake_announcements_db.append(new_new)
    return new_new

@router.put("/{announcement_id}", response_model=AnnouncementResponse)
def update_announcement(announcement_id: int, announcement_in: AnnouncementCreate):
    idx = next((i for i, a in enumerate(fake_announcements_db) if a["id"] == announcement_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Announcement not found")
    updated = {
        "id": announcement_id,
        "date": fake_announcements_db[idx]["date"],
        "category": fake_announcements_db[idx]["category"],
        **announcement_in.model_dump()
    }
    fake_announcements_db[idx] = updated
    return updated

@router.delete("/{announcement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_announcement(announcement_id: int):
    idx = next((i for i, a in enumerate(fake_announcements_db) if a["id"] == announcement_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Announcement not found")
    fake_announcements_db.pop(idx)
    return None