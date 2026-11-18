---
name: "Istanbul University Alumni Design System"
version: "1.0.0"
primary_color: "#2563EB"
background_color: "#020617"
font_family_sans: "Inter, system-ui, -apple-system, sans-serif"
font_family_mono: "ui-monospace, SFMono-Regular, monospace"
---

# İstanbul Üniversitesi Mezun Platformu - Tasarım Sistemi (DESIGN.md)

Bu doküman, `brand.md` marka kimliğine ve `awesome-design-md` standartlarına dayalı olarak React + Tailwind CSS arayüz geliştirme kurallarını belirler.

---

# 1. Visual Theme & Atmosphere
- **Mood / Vibe:** Prestijli akademik miras, derin gece mavisi/slate kanvas, modern editoryal netlik ve hafif scrollytelling dinamizmi.
- **Design Philosophy:** Tarihi kurumsallığı hantal bürokrasiden arındırarak; ferah boşluklar (whitespace), yüksek kontrastlı okunabilirlik ve amaca yönelik mikro etkileşimlerle premium bir mezun deneyimi sunmak.
- **Corner Radius Strategy:** Modern ve yumuşak geometri:
  - Kartlar ve modallar: `rounded-2xl` (16px)
  - Butonlar ve inputlar: `rounded-xl` (12px)
  - Rozetler ve pill etiketler: `rounded-full` (9999px)

---

# 2. Color Palette & Roles

| Rol | Semantik Token | Hex Kodu | Tailwind Sınıfı | Kullanım Alanı |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas / Background** | `--color-bg` | `#020617` | `bg-slate-950` | Ana sayfa arka planı, zemin kanvası |
| **Surface / Card** | `--color-surface` | `#0f172a` | `bg-slate-900` | Kartlar, form kapsayıcıları, modal pencereleri |
| **Surface Glass** | `--color-surface-glass` | `rgba(15,23,42,0.75)` | `bg-slate-900/75 backdrop-blur-md` | Sticky navbar, süzülen filtre barları |
| **Border / Divider** | `--color-border` | `#1e293b` | `border-slate-800` | Kart kenarlıkları, satır ayraçları |
| **Border Hover** | `--color-border-hover` | `#334155` | `border-slate-700` | Etkileşimdeki eleman sınırları |
| **Brand Primary (Blue)**| `--color-primary` | `#2563eb` | `bg-blue-600` / `text-blue-500` | Birincil aksiyonlar, ana CTA butonları |
| **Brand Secondary (Indigo)**| `--color-secondary`| `#4f46e5` | `bg-indigo-600` / `text-indigo-400`| Kariyer modülü, alt başlık vurguları |
| **Heritage Accent (Amber)**| `--color-accent` | `#f59e0b` | `text-amber-400` / `bg-amber-500`| 1453 kuruluş vurguları, ödüller, rozetler |
| **Text High Emphasis** | `--color-text-high` | `#f8fafc` | `text-slate-50` / `text-white` | Başlıklar, metrik sayıları |
| **Text Medium Emphasis**| `--color-text-med` | `#94a3b8` | `text-slate-400` | Paragraflar, ikincil etiketler |
| **Text Subtle / Muted** | `--color-text-subtle` | `#64748b` | `text-slate-500` | Tarih damgaları, altbilgi telif metinleri |
| **Status Success** | `--color-success` | `#10b981` | `text-emerald-400` / `bg-emerald-500/10` | Aktif ilan, başarılı kayıt rozetleri |
| **Status Danger** | `--color-danger` | `#ef4444` | `text-rose-400` / `bg-rose-500/10` | Hata mesajları, kritik uyarılar |

---

# 3. Typography Rules
- **Sans-serif Font:** `Inter`, `system-ui`, `-apple-system`, `sans-serif`
- **Monospace Font:** `ui-monospace`, `SFMono-Regular`, `monospace`

| Hiyerarşi | Boyut / Line-Height | Ağırlık (Font-Weight) | Tracking (Letter-Spacing) | Tailwind Karşılığı |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Hero H1** | `3.75rem (60px) / 1.1` | Black / Extrabold (800-900) | Tight (`tracking-tight`) | `text-4xl sm:text-6xl font-black` |
| **Page H2** | `2.25rem (36px) / 1.2` | Extrabold (800) | Tight (`tracking-tight`) | `text-3xl sm:text-4xl font-extrabold` |
| **Section / Card H3** | `1.25rem (20px) / 1.3` | Bold (700) | Normal (`tracking-normal`) | `text-xl font-bold` |
| **Body Large** | `1.125rem (18px) / 1.6` | Regular / Light (300-400) | Normal | `text-lg text-slate-300 font-light` |
| **Body Regular** | `0.875rem (14px) / 1.5` | Normal (400) | Normal | `text-sm text-slate-400` |
| **Caption / Label** | `0.75rem (12px) / 1.4` | Semibold (600) | Wide (`tracking-wider`) | `text-xs font-semibold uppercase` |

---

# 4. Component Stylings

### 4.1. Navbar
- Sticky üstte sabit: `fixed top-0 left-0 right-0 z-50`
- Arka plan: `bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80`
- Logo amblemi: `bg-gradient-to-br from-amber-500 via-blue-600 to-indigo-700 rounded-xl`
- Bağlantılar: `text-slate-300 hover:text-white transition-colors`

### 4.2. Buttons (Butonlar)
- **Primary:** `px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/25 active:scale-[0.98]`
- **Secondary / Outline:** `px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium text-xs transition-all`
- **Accent (Heritage CTA):** `px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20`

### 4.3. Cards (Kartlar)
- Arka plan ve kenarlık: `bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6`
- Hover durumu: `hover:border-slate-700 hover:bg-slate-900/90 transition-all shadow-xl shadow-black/20`

### 4.4. Form / Inputs
- Alanlar: `w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors`
- Etiketler: `block text-xs font-semibold text-slate-300 mb-1.5`

### 4.5. Badges / Status Pills
- **Genel:** `px-2.5 py-1 rounded-full text-[11px] font-semibold border`
- **Etkinlik / Mavi:** `bg-blue-500/10 text-blue-400 border-blue-500/20`
- **Kariyer / İndigo:** `bg-indigo-500/10 text-indigo-400 border-indigo-500/20`
- **Tarihsel / Amber:** `bg-amber-500/10 text-amber-400 border-amber-500/20`
- **Başarı / Yeşil:** `bg-emerald-500/10 text-emerald-400 border-emerald-500/20`

### 4.6. Footer
- `border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-12`

---

# 5. Layout Principles
- **Grid & Max-Width:** Standart sayfa hizalama kapsayıcısı `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Spacing Scale:** 4px katları baz alınır (`p-4`, `p-6`, `py-12`, `py-20`).
- **Nefes Alan Tasarım (Whitespace):** Bölümler arasında en az `py-20` (80px) boşluk bırakılarak bilgi yığılması engellenir.

---

# 6. Depth & Elevation
- Koyu modda ağır drop shadow yerine **yüzey rengi basamaklandırması** (`bg-slate-950` -> `bg-slate-900/60` -> `bg-slate-800`) ve **ince bordürler** (`border-slate-800`) kullanılır.
- Glow efektleri sadece odak noktalarında `blur-[120px]` ve düşük opaklık (`opacity-15`) ile kullanılır.

---

# 7. Do's and Don'ts

### Do (Yapın):
- Semantik renk token'larına sadık kalın (`slate-950`, `slate-900`, `blue-600`, `amber-400`).
- Tüm etkileşimli buton ve form elemanlarında focus ring ve hover geçişi tanımlayın.
- `docs/ddd.md` kurallarına uyun: iş ilanı oluştururken `title` (zorunlu, max 120 karakter), `company` (zorunlu), `city` (opsiyonel), `description` (opsiyonel).

### Don't (Yapmayın):
- Rastgele, sistem dışı renkler ve sert gölgeler eklemeyin.
- Tipografide 3'ten fazla font boyutu karışıklığı yaratmayın.
- Backend kurallarını ve API veri tiplerini frontend'de bozmayın.

---

# 8. Responsive Behavior
- **Mobile (< 640px):** Tek kolonlu akış, gizlenebilir mobil menü, yatay kaydırılabilir filtre çubukları.
- **Tablet (640px - 1024px):** 2 kolonlu grid sistemleri.
- **Desktop (> 1024px):** 3 veya 4 kolonlu grid sistemleri, sabit sticky navigasyon.

---

# 9. Agent Prompt Guide
> "Bu projede arayüz geliştirirken veya güncellerken daima `DESIGN.md` ve `brand.md` rehberlerine sadık kalın. Arka planları `bg-slate-950`, kart yüzeylerini `bg-slate-900/60 border border-slate-800 rounded-2xl`, birincil butonları `bg-blue-600 rounded-xl` olarak uygulayın. `docs/ddd.md` domain kurallarını eksiksiz gözetin."
