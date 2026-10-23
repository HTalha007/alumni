# İstanbul Üniversitesi Mezun Platformu (Alumni Tracking System)

## 🎯 Proje Kapsamı ve Temel Modüller
Bu proje, İstanbul Üniversitesi mezunlarının birbirleriyle bağlantıda kalmasını, üniversite etkinliklerini takip etmesini ve kariyer ağlarını genişletmesini sağlayan modern bir web platformudur.

Temel Modüller:
1. **Dinamik Mezun Dizini:** Öğrencilerin ve mezunların bölümlerine, mezuniyet yıllarına göre listelendiği gelişmiş arama modülü.
2. **Duyuru ve Etkinlik Yönetimi:** Üniversite içi gelişmelerin, duyuruların ve kariyer buluşmalarının yayınlandığı tam CRUD destekli akış.
3. **Scrollytelling Vitrin:** Awwwards standartlarında, kullanıcı kaydırdıkça canlanan istatistik ve hikaye odaklı ön yüz.
4. **Kariyer ve İş İlanları Panosu:** Mezunların iş ilanı oluşturabildiği ve başvuru yapabildiği modül.

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
│   ├── routers/           # [CONTROLLER] Web ve API kontrolcüleri (users, announcements, jobs)
│   ├── models.py          # [MODEL] SQLAlchemy veritabanı tabloları ve Pydantic şemaları
│   ├── database.py        # [ALTYAPI] SQLAlchemy ORM ve veritabanı bağlantısı
│   ├── seed.py            # [ALTYAPI] Otomatik test verisi tohumlayıcı
│   ├── main.py            # Uygulama merkezi ve router (Swagger: /api/swagger) entegrasyonları
│   └── requirements.txt   # Python bağımlılıkları
│
├── frontend/              # [VIEW] React & Tailwind UI Katmanı
│   ├── src/               # Arayüz bileşenleri ve scrollytelling sayfaları
│   └── package.json       # Frontend bağımlılıkları
│
├── docs/                  # Teknik dokümantasyon (DDD)
├── docker-compose.yml     # Konteyner orkestrasyonu
└── README.md              # Proje dokümantasyonu ve mimari rehberi