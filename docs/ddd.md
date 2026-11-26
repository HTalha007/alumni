Domain Driven Design (DDD) - Istanbul University Alumni Platform

1. Domain Overview

The platform connects Istanbul University students, alumni, and administrators to facilitate verified academic networking, career opportunities, event tracking, and secure administrative oversight.

2. Core Domains & Bounded Contexts

Authentication & Identity Context:
- Manages user credentials, authentication tokens (JWT), password hashing, and Role-Based Access Control (RBAC).
- Defines permissions and access boundaries for `admin`, `alumni`, and `student` roles.

Alumni & Profile Context:
- Manages user identity, graduation details, academic department, current professional title, and contact preferences.

Career & Job Board Context:
- Manages job and internship postings, applications, and applicant cover letters under domain constraints.

Announcement Context:
- Centralized board for university, rectorship, and alumni network announcements and event notifications.

3. User Roles & Permission Boundaries (RBAC)

Role: admin (Yönetici)
- Access Boundary: Full platform administrative access.
- Capabilities:
  * View, edit, activate/deactivate, and delete all user records.
  * Assign and change user roles (`admin`, `alumni`, `student`).
  * Publish, update, and remove official announcements.
  * Review, manage, or remove any job posting and application.
  * Access the secure Admin Panel.

Role: alumni (Doğrulanmış Mezun)
- Access Boundary: Graduate member access.
- Capabilities:
  * Manage own profile (personal info, title, graduation year, contact).
  * Create, publish, update, and delete own job/internship postings.
  * Review applications submitted to own job postings.
  * Submit applications with cover letters to other job postings.
  * Search and browse the alumni directory and read announcements.

Role: student (Öğrenci)
- Access Boundary: Student member access.
- Capabilities:
  * Manage own student profile and department info.
  * Search and filter the alumni directory for networking and mentorship.
  * Browse career postings and apply with a cover letter.
  * Read announcements and event calendars.
  * Restriction: Cannot publish job postings or access administrative features.

4. Ubiquitous Language

Alumni: A verified graduate of Istanbul University.
Student: An enrolled active student of Istanbul University.
Admin: Authorized platform and rectorship coordinator.
Department: Academic faculty or division completed/attended.
Job Posting: Employment or internship opening published by an alumni or admin.
Application: Formal application submitted by a student or alumni with a cover letter.
Token: Cryptographically signed JWT identifying the authenticated session and user role.

5. Database Schema (Veritabanı Şeması)

Users (Kullanıcılar - users)
- id: Integer (Primary Key)
- name: String (Ad Soyad) - Rule: Required
- email: String (E-posta) - Rule: Required, Unique, Valid Email Format
- hashed_password: String (Şifre Özeti) - Rule: Required, Cryptographically Hashed
- department: String (Fakülte / Bölüm) - Rule: Required
- graduation_year: Integer / String (Mezuniyet / Giriş Yılı) - Rule: Required
- title: String (Unvan / Mevcut Durum) - Rule: Optional, Default: "Mezun" / "Öğrenci"
- role: String (Kullanıcı Rolü) - Rule: Required, Values: ['admin', 'alumni', 'student'], Default: 'alumni'
- is_active: Boolean - Rule: Required, Default: True

Job Postings (İş İlanları - job_postings)
- id: Integer (Primary Key)
- title: String (İlan Başlığı) - Rule: Required, Max 120 characters
- company: String (Şirket) - Rule: Required
- city: String (Şehir) - Rule: Optional
- description: Text (İlan Detayı) - Rule: Optional
- author_id: Integer (Foreign Key -> users.id) - İlanı açan mezun

Applications (Başvurular - applications)
- id: Integer (Primary Key)
- job_posting_id: Integer (Foreign Key -> job_postings.id)
- applicant_id: Integer (Foreign Key -> users.id) - Başvuran kişi
- cover_letter: Text (Ön Yazı)
