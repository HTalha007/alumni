# İstanbul Üniversitesi Mezun Platformu (Alumni Tracking System)

## 🎯 Proje Kapsamı ve Temel Modüller
Bu proje, İstanbul Üniversitesi mezunlarının birbirleriyle bağlantıda kalmasını, üniversite etkinliklerini takip etmesini ve kariyer ağlarını genişletmesini sağlayan modern bir web platformudur.

Temel Modüller:
1. **Dinamik Mezun Dizini:** Öğrencilerin ve mezunların bölümlerine, mezuniyet yıllarına göre listelendiği gelişmiş arama modülü.
2. **Duyuru ve Etkinlik Yönetimi:** Üniversite içi gelişmelerin, duyuruların ve kariyer buluşmalarının yayınlandığı tam CRUD destekli akış.
3. **Scrollytelling Vitrin:** Awwwards standartlarında, kullanıcı kaydırdıkça canlanan istatistik ve hikaye odaklı ön yüz.
4. **Kariyer ve İş İlanları Panosu:** Mezunların iş ilanı oluşturabildiği ve başvuru yapabildiği modül.

---

## 📚 Tasarım ve Dokümantasyon Rehberleri
Platformun marka stratejisi ve kullanıcı arayüzü tasarım standartları aşağıdaki rehberlerde detaylandırılmıştır:
- [Marka Kimliği (brand.md)](./brand.md)
- [Tasarım Sistemi (DESIGN.md)](./DESIGN.md)

---

## 🛠 Teknoloji Yığını ve Tercih Nedenleri
Projede, kurumsal ihtiyaçlara cevap verecek hız ve modernliği sağlamak adına Ayrık (Decoupled) Monorepo mimarisi kullanılmıştır.

- **Backend:** Python & FastAPI (Yüksek asenkron işlem kapasitesi, pydantic ile otomatik veri doğrulama ve hızlı API geliştirme imkanı).
- **Veritabanı:** SQLite & SQLAlchemy ORM (Hızlı kurulum, taşınabilirlik ve ilişkisel veri bütünlüğü).
- **Frontend:** React & Tailwind CSS (Bileşen tabanlı yapı, modern ve duyarlı (responsive) arayüz tasarımı).
- **DevOps:** Docker & Docker Compose (Tüm sistemin tek komutla izole konteynerlerde çalıştırılabilmesi).

---

## 📐 Proje Dizin Yapısı ve MVC Mimarisi
Proje, Backend ve Frontend olmak üzere iki bağımsız katmandan oluşmaktadır. Backend tarafında **MVC (Model-View-Controller)** / Katmanlı Mimari standartları eksiksiz olarak uygulanmıştır.

```text
alumni/
│
├── backend/
│   ├── routers/           # [CONTROLLER] Web ve API kontrolcüleri (auth, admin, users, announcements, jobs)
│   ├── models.py          # [MODEL] SQLAlchemy veritabanı tabloları ve Pydantic şemaları
│   ├── security.py        # [GÜVENLİK] JWT token oluşturma/çözme ve PBKDF2 parola hashleme
│   ├── dependencies.py    # [YETKİLENDIRME] Auth middleware ve RBAC bağımlılıkları (require_admin vb.)
│   ├── database.py        # [ALTYAPI] SQLAlchemy ORM ve veritabanı bağlantısı
│   ├── seed.py            # [ALTYAPI] Otomatik şema kontrolü ve test verisi tohumlayıcı
│   ├── main.py            # Uygulama merkezi, Middleware Katmanı ve Router entegrasyonları
│   └── requirements.txt   # Python bağımlılıkları
│
├── frontend/              # [VIEW] React & Tailwind UI Katmanı
│   ├── src/
│   │   ├── pages/         # Sayfalar (Home, Directory, Jobs, Announcements, Login, Register, Profile, Admin)
│   │   ├── components/    # Ortak bileşenler (Navbar, Footer, Modals, Icons)
│   │   └── App.jsx        # İstemci yönlendirmesi, Auth state yönetimi ve korumalı rotalar
│   └── package.json       # Frontend bağımlılıkları
│
├── logs/                  # Hata kayıtlarının (error.logs) kalıcı olarak tutulduğu dizin
├── docs/                  # Teknik dokümantasyon (DDD vb.)
├── docker-compose.yml     # Konteyner orkestrasyonu
└── README.md              # Proje dokümantasyonu ve mimari rehberi
```

---

## 🔐 Kimlik Doğrulama ve Yetkilendirme (Authentication & Authorization)

Platformda modern ve güvenli bir **Role-Based Access Control (RBAC)** mimarisi uygulanmıştır.

### 1. Güvenlik ve Şifreleme Mimarisi
- **JWT (JSON Web Token):** RFC 7519 standartlarına uygun HS256 imzalı erişim token'ları (`backend/security.py`). İstemci tarafında `localStorage` üzerinde saklanır ve `Authorization: Bearer <token>` başlığıyla iletilir.
- **Parola Güvenliği:** Parolalar veritabanında asla düz metin (plaintext) saklanmaz. NIST standartlarına uygun PBKDF2-HMAC-SHA256 (120.000 iterasyon + 16 bayt kriptografik tuzlama) algoritmasıyla hash'lenir.
- **Auth Middleware & Dependencies:** FastAPI `HTTPBearer` altyapısı üzerine inşa edilen `dependencies.py` ara katmanı ile `get_current_active_user`, `require_admin` ve `require_alumni_or_admin` korumaları uygulanır.

### 2. Kullanıcı Rolleri ve Yetki Matrisi

| Rol | Tanım | Yetkiler ve Kapsam |
| :--- | :--- | :--- |
| **`admin`** | Sistem Yöneticisi | Tüm sistemi yönetme, kullanıcı rolleri değiştirme (`admin`/`alumni`/`student`), kullanıcı engelleme/silme, ilan ve duyuru silme, sistem istatistiklerini izleme. |
| **`alumni`** | Doğrulanmış Mezun | Yeni iş/staj ilanı oluşturma, kendi ilanlarını yönetme, ilanlarına gelen aday başvurularını inceleme, diğer ilanlara başvurma, profil güncelleme. |
| **`student`** | Aktif Öğrenci | İş ve staj ilanlarına başvurma, kendi başvurularının durumunu takip etme, mezun dizinini ve duyuruları inceleme, profil güncelleme. |
| **`guest`** | Giriş Yapmamış Ziyaretçi | Yalnızca herkese açık sayfaları (Vitrin, Mezun Dizini, Duyurular, İlan Listesi) görüntüleyebilir. Başvuru, ilan açma veya yönetim sayfalarında giriş yapmaya yönlendirilir. |

### 3. Eklenen API Uç Noktaları

#### Kimlik Doğrulama (`/api/auth`)
- `POST /api/auth/register` : Yeni kullanıcı kaydı (Öğrenci veya Mezun rolü ile).
- `POST /api/auth/login` : Kullanıcı girişi (E-posta ve şifre doğrulaması -> JWT token dönüşü).
- `GET /api/auth/me` : Aktif oturum sahibi kullanıcının profil ve rol bilgisi.
- `PUT /api/auth/me` : Kullanıcının kendi profil bilgilerini güncellemesi.
- `GET /api/auth/my/applications` : Kullanıcının yapmış olduğu iş/staj başvuruları.
- `GET /api/auth/my/postings` : Mezunun/Adminin açtığı ilanlar ve bu ilanlara gelen aday başvuruları.

#### Yönetici Paneli (`/api/admin`) — *Sadece `admin` rolü*
- `GET /api/admin/stats` : Sistem toplam kullanıcı, ilan, başvuru ve duyuru metrikleri.
- `GET /api/admin/users` : Sistemdeki tüm kullanıcıların listesi.
- `PUT /api/admin/users/{user_id}/role` : Kullanıcının rolünü değiştirme (`admin`, `alumni`, `student`).
- `PUT /api/admin/users/{user_id}/status` : Kullanıcıyı aktif/pasif yapma.
- `DELETE /api/admin/users/{user_id}` : Kullanıcıyı sistemden silme.
- `DELETE /api/admin/jobs/{job_id}` : Kural dışı iş ilanını yayından kaldırma/silme.
- `DELETE /api/admin/announcements/{id}` : Duyuruyu silme.

---

### 4. Hazır Test Kullanıcıları ve Giriş Bilgileri

Sistem ilk ayağa kalktığında `backend/seed.py` otomatik olarak aşağıdaki rollere sahip hesapları veritabanına tohumlar:

| Ad Soyad | E-Posta | Şifre | Rol | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| **Hasan Talha** | `htgzl.phone@gmail.com` | `admin123` | `admin` | **Özel Yönetici Hesabı (Süper Admin)** |
| **İÜ Rektörlük** | `admin@istanbul.edu.tr` | `admin123` | `admin` | Kurumsal Sistem Yöneticisi |
| **Ahmet Yılmaz** | `ahmet@alumni.istanbul.edu.tr` | `alumni123` | `alumni` | Bilgisayar Müh. 2020 Mezunu |
| **Elif Yurt** | `ogrenci@istanbul.edu.tr` | `student123` | `student` | Hukuk Fakültesi Aktif Öğrencisi |

> **Hızlı Giriş İpucu:** Giriş sayfasında (`/login`) tek tıkla test hesaplarının bilgilerini forma dolduran hazır test butonları yer almaktadır.

---

### 5. Dinamik Navigasyon ve Kullanıcı Arayüzü
- **Ziyaretçi Görünümü:** Navbar üzerinde "Giriş Yap" ve "Aramıza Katıl" butonları görünür.
- **Kullanıcı Girişi Yapıldığında:** Kullanıcının adı, mezuniyet/bölüm etiketi ve rol rozeti belirir. "Kişisel Panel" menüsü aktifleşir.
- **Yönetici Girişi Yapıldığında:** Navbar'da belirgin editoryal kırmızı rozetli **"Yönetici Paneli"** bağlantısı görünür ve `/admin` yönetim paneline doğrudan erişim sağlanır.
- **Kişisel Panel (`/profile`):** Kullanıcı kendi bilgilerini güncelleyebilir, öğrenci ise yaptığı başvuruları ve durumlarını takip eder; mezun ise açtığı iş ilanlarını ve bu ilanlara başvuran adayların listesini görüntüler.

---

## 🚀 Projeyi Yerel Ortamda Çalıştırma

### 1. Backend (FastAPI)
```bash
cd backend
# Sanal ortamı aktive edin (varsa)
.venv\Scripts\activate   # Windows
# source .venv/bin/activate # Linux/Mac

# Geliştirme sunucusunu başlatın
uvicorn main:app --reload --port 8000
```
- API Belgeleri (Swagger): `http://localhost:8000/docs`
- 404 Generic Sayfası: `http://localhost:8000/404`

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- Web Arayüzü: `http://localhost:5173`
