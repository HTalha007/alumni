from fastapi import APIRouter, HTTPException, status
from typing import List
from models import Announcement, AnnouncementCreate

router = APIRouter(prefix="/api/announcements", tags=["Announcements"])

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

@router.get("", response_model=List[Announcement])
def get_all_announcements():
    return fake_announcements_db

@router.post("", response_model=Announcement, status_code=status.HTTP_201_CREATED)
def create_announcement(announcement_in: AnnouncementCreate):
    new_id = len(fake_announcements_db) + 1 if fake_announcements_db else 1
    new_announcement = {
        "id": new_id,
        "date": "2026-10-20",
        **announcement_in.model_dump()
    }
    fake_announcements_db.append(new_announcement)
    return new_announcement