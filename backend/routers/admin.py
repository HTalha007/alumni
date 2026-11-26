from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User, JobPosting, Application, Announcement, UserResponse, UserRoleUpdate
from dependencies import require_admin
from typing import List

router = APIRouter(prefix="/admin", tags=["Admin Oversight & Management"])

@router.get("/stats")
def get_admin_dashboard_stats(
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    total_users = db.query(User).count()
    total_alumni = db.query(User).filter(User.role == "alumni").count()
    total_students = db.query(User).filter(User.role == "student").count()
    total_admins = db.query(User).filter(User.role == "admin").count()
    total_jobs = db.query(JobPosting).count()
    total_apps = db.query(Application).count()
    total_announcements = db.query(Announcement).count()

    return {
        "total_users": total_users,
        "total_alumni": total_alumni,
        "total_students": total_students,
        "total_admins": total_admins,
        "total_jobs": total_jobs,
        "total_applications": total_apps,
        "total_announcements": total_announcements
    }


@router.get("/users", response_model=List[UserResponse])
def get_all_users_for_admin(
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    return db.query(User).order_by(User.id.desc()).all()


@router.put("/users/{user_id}/role", response_model=UserResponse)
def update_user_role(
    user_id: int,
    role_in: UserRoleUpdate,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    valid_roles = ["admin", "alumni", "student"]
    if role_in.role not in valid_roles:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Geçersiz rol. Kabul edilen roller: {', '.join(valid_roles)}"
        )

    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")

    # Kendi admin rolünü kaldırmayı engelle (kendini kilitlememe kuralı)
    if target_user.id == admin.id and role_in.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Kendi yöneticilik (Admin) rolünüzü kaldıramazsınız."
        )

    target_user.role = role_in.role
    db.commit()
    db.refresh(target_user)
    return target_user


@router.put("/users/{user_id}/status", response_model=UserResponse)
def toggle_user_active_status(
    user_id: int,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")

    if target_user.id == admin.id:
        raise HTTPException(status_code=400, detail="Kendi hesabınızı askıya alamazsınız.")

    target_user.is_active = not target_user.is_active
    db.commit()
    db.refresh(target_user)
    return target_user


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_by_admin(
    user_id: int,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")

    if target_user.id == admin.id:
        raise HTTPException(status_code=400, detail="Kendi hesabınızı silemezsiniz.")

    db.delete(target_user)
    db.commit()
    return None


@router.delete("/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_by_admin(
    job_id: int,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    job = db.query(JobPosting).filter(JobPosting.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="İş ilanı bulunamadı.")

    db.delete(job)
    db.commit()
    return None


@router.delete("/announcements/{announcement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_announcement_by_admin(
    announcement_id: int,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    ann = db.query(Announcement).filter(Announcement.id == announcement_id).first()
    if not ann:
        raise HTTPException(status_code=404, detail="Duyuru bulunamadı.")

    db.delete(ann)
    db.commit()
    return None
