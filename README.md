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
│   ├── routers/           # [CONTROLLER] Web ve API kontrolcüleri (users, announcements, jobs)
│   ├── models.py          # [MODEL] SQLAlchemy veritabanı tabloları ve Pydantic şemaları
│   ├── database.py        # [ALTYAPI] SQLAlchemy ORM ve veritabanı bağlantısı
│   ├── seed.py            # [ALTYAPI] Otomatik test verisi tohumlayıcı
│   ├── main.py            # Uygulama merkezi, Middleware Katmanı ve Router entegrasyonları
│   └── requirements.txt   # Python bağımlılıkları
│
├── frontend/              # [VIEW] React & Tailwind UI Katmanı
│   ├── src/               # Arayüz bileşenleri ve scrollytelling sayfaları
│   └── package.json       # Frontend bağımlılıkları
│
├── logs/                  # Hata kayıtlarının (error.logs) kalıcı olarak tutulduğu dizin
├── docs/                  # Teknik dokümantasyon (DDD)
├── docker-compose.yml     # Konteyner orkestrasyonu
└── README.md              # Proje dokümantasyonu ve mimari rehberi