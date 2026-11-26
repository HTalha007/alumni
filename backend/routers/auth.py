from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User, JobPosting, Application, UserRegister, UserLogin, TokenResponse, UserResponse, UserProfileUpdate
from security import hash_password, verify_password, create_access_token
from dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication & Profile"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserRegister, db: Session = Depends(get_db)):
    email_clean = user_in.email.strip().lower()

    # E-posta mükerrerlik kontrolü
    existing_user = db.query(User).filter(User.email == email_clean).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu e-posta adresi ile kayıtlı bir kullanıcı zaten mevcut."
        )

    # Rol atama denetimi: Varsayılan alumni, kayıt ekranında student veya alumni seçilebilir.
    # admin rolü güvenlik sebebiyle halka açık kayıt ekranından verilemez
    safe_role = "student" if user_in.role == "student" else "alumni"

    hashed_pw = hash_password(user_in.password)

    new_user = User(
        name=user_in.name.strip(),
        email=email_clean,
        hashed_password=hashed_pw,
        department=user_in.department.strip(),
        graduation_year=str(user_in.graduation_year),
        title=user_in.title.strip() if user_in.title else ("Öğrenci" if safe_role == "student" else "Mezun"),
        role=safe_role,
        is_active=True
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # JWT Access Token üret
    access_token = create_access_token(data={
        "sub": str(new_user.id),
        "email": new_user.email,
        "role": new_user.role,
        "name": new_user.name
    })

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": new_user
    }


@router.post("/login", response_model=TokenResponse)
def login_user(login_in: UserLogin, db: Session = Depends(get_db)):
    email_clean = login_in.email.strip().lower()
    user = db.query(User).filter(User.email == email_clean).first()

    if not user or not user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Geçersiz e-posta adresi veya parola."
        )

    if not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Geçersiz e-posta adresi veya parola."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Hesabınız askıya alınmıştır. Lütfen Rektörlük ile iletişime geçiniz."
        )

    access_token = create_access_token(data={
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
        "name": user.name
    })

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserResponse)
def update_current_user_profile(
    profile_in: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if profile_in.name is not None:
        current_user.name = profile_in.name.strip()
    if profile_in.department is not None:
        current_user.department = profile_in.department.strip()
    if profile_in.graduation_year is not None:
        current_user.graduation_year = str(profile_in.graduation_year)
    if profile_in.title is not None:
        current_user.title = profile_in.title.strip()

    db.commit()
    db.refresh(current_user)
    return current_user


@router.get("/my/applications")
def get_my_applications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    apps = db.query(Application).filter(Application.applicant_id == current_user.id).all()
    result = []
    for app in apps:
        job = db.query(JobPosting).filter(JobPosting.id == app.job_posting_id).first()
        result.append({
            "id": app.id,
            "job_posting_id": app.job_posting_id,
            "job_title": job.title if job else "Silinmiş İlan",
            "job_company": job.description.split('\n')[0] if job and job.description else "",
            "cover_letter": app.cover_letter
        })
    return result


@router.get("/my/postings")
def get_my_job_postings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    postings = db.query(JobPosting).filter(JobPosting.author_id == current_user.id).all()
    result = []
    for post in postings:
        apps = db.query(Application).filter(Application.job_posting_id == post.id).all()
        app_list = []
        for a in apps:
            applicant = db.query(User).filter(User.id == a.applicant_id).first()
            app_list.append({
                "id": a.id,
                "applicant_id": a.applicant_id,
                "applicant_name": applicant.name if applicant else "Bilinmeyen Kullanıcı",
                "applicant_department": applicant.department if applicant else "",
                "cover_letter": a.cover_letter
            })
        result.append({
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "application_count": len(apps),
            "applications": app_list
        })
    return result
