# Domain Driven Design (DDD) - Istanbul University Alumni Platform

## 1. Domain Overview
The platform connects Istanbul University students and alumni to facilitate professional networking, event tracking, and career opportunities.

## 2. Core Domains & Bounded Contexts
- **Alumni & Profile Context:** Manages user identity, graduation details, social profiles, and skill tags.
- **Announcement Context:** Centralized board for university and alumni network announcements.
- **Career & Job Board Context (Phase 2):** Job and internship listings targeting graduates.

## 3. Ubiquitous Language
- **Alumni :** A verified graduate of Istanbul University.
- **Department :** Academic division the graduate completed.
- **Seeder:** Automatic script populating initial verified graduate records.


## Veritabanı Şeması (Database Schema)

### Job Postings (İş İlanları - job_postings)
* **id**: Integer (Primary Key)
* **title**: String (İlan Başlığı)
* **description**: Text (İlan Detayı)
* **author_id**: Integer (Foreign Key -> users.id) - İlanı açan mezun

### Applications (Başvurular - applications)
* **id**: Integer (Primary Key)
* **job_posting_id**: Integer (Foreign Key -> job_postings.id)
* **applicant_id**: Integer (Foreign Key -> users.id) - Başvuran kişi
* **cover_letter**: Text (Ön Yazı)