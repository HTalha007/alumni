---
name: "Istanbul University Editorial Design System"
version: "2.0.0"
primary_color: "#0F2942"
secondary_color: "#7C1D26"
background_color: "#FAF9F6"
surface_color: "#F2F0EA"
text_primary: "#161616"
text_secondary: "#5A5854"
border_color: "#E2DFD7"
font_family_serif: "'Newsreader', 'Playfair Display', Georgia, serif"
font_family_sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
font_family_mono: "'JetBrains Mono', monospace"
---

# İstanbul Üniversitesi Mezun Platformu - Editoryal Tasarım Sistemi (DESIGN.md)

Bu doküman, İstanbul Üniversitesi'nin 1453'e uzanan kurumsal ciddiyetini, editoryal tipografisini ve modern dijital arşiv standartlarını belirler. Standart AI/SaaS şablonlarından (gradientler, blur efektleri, neon renkler, devasa balon köşeler) kesin olarak arındırılmıştır.

---

## 1. Katı Tasarım İlkeleri ve Yasaklar (Anti-AI Rules)

Aşağıdaki kalıpların platformun hiçbir yerinde kullanılmasına izin verilmez:
- ❌ **YASAK:** Gradient arka planlar (`bg-gradient-*`) ve neon renk tonları.
- ❌ **YASAK:** Arka planda uçuşan bulanık ışık küreleri (`blur-[...]`, ambient glow).
- ❌ **YASAK:** Ağır gölgeler (`shadow-lg`, `shadow-xl`, `shadow-2xl`).
- ❌ **YASAK:** Arayüz içi emojiler (⚡, 🚨, 🏛️, 🚀, vb.). Tüm simgeler sade, 1.5px/1px ince vektörel çizgi ikonları olacaktır.
- ❌ **YASAK:** Yuvarlak balon köşeler (`rounded-2xl`, `rounded-3xl`, `rounded-full`). Sadece keskin veya mikro köşeler (`rounded-none`, `rounded-sm`, `rounded`) kullanılacaktır.
- ❌ **YASAK:** Klişe animasyonlu sıçrama ve nabız efektleri (`animate-pulse`, `animate-bounce`, `animate-ping`).
- ❌ **YASAK:** Ortalanmış yapay 3'lü ikon-kart şablonları. Tüm içerik editoryal gazete/dergi hiyerarşisiyle **sola yaslı**, net çizgi ayraçlı ve asimetrik tipografik grid ile kurgulanacaktır.
- ❌ **YASAK:** İçi boş pazarlama sloganları ("Geleceği şekillendiriyoruz", "Lider ağ" vb.). Bunun yerine doğrudan, kurumsal ve nesnel Türkçe metinler kullanılacaktır.

---

## 2. Renk Paleti ve Görevleri

Tasarım sıcak kağıt dokusu, editoryal mat mürekkep ve köklü üniversite laciverti üzerine inşa edilmiştir:

| Rol | Semantik İsim | HEX Değeri | Tailwind / CSS Karşılığı | Kullanım Amacı |
| :--- | :--- | :--- | :--- | :--- |
| **Ana Zemin** | `--color-bg` | `#FAF9F6` | `bg-[#FAF9F6]` | Sıcak kağıt beyazı / mat kanvas |
| **İkincil Yüzey** | `--color-surface` | `#F2F0EA` | `bg-[#F2F0EA]` | Tablo başlıkları, form alanları, filtre barları |
| **Kart Zemin** | `--color-card` | `#FFFFFF` | `bg-white` | İçerik kartları, modal pencereleri |
| **Ana Çizgi / Kenarlık** | `--color-border` | `#E2DFD7` | `border-[#E2DFD7]` | 1px katı ayraç çizgileri, kart sınırları |
| **Koyu Çizgi / Vurgu** | `--color-border-dark` | `#161616` | `border-[#161616]` | Başlık altı editoryal vurgu çizgileri (2px) |
| **Ana Metin (Mürekkep)**| `--color-text-primary`| `#161616` | `text-[#161616]` | Manşetler, gövde metinleri, tablo verileri |
| **İkincil Metin** | `--color-text-muted` | `#5A5854` | `text-[#5A5854]` | Açıklamalar, unvanlar, meta bilgiler |
| **Kurumsal Lacivert** | `--color-primary` | `#0F2942` | `bg-[#0F2942]`, `text-[#0F2942]`| Birincil butonlar, ana kurumsal kimlik |
| **Akademik Bordo** | `--color-accent` | `#7C1D26` | `text-[#7C1D26]`, `border-[#7C1D26]`| Rektörlük etiketleri, tarih damgaları, fakülte aksanları |
| **Durum / Aktif** | `--color-status-ok` | `#1E4D2B` | `text-[#1E4D2B]`, `bg-[#1E4D2B]/10` | Aktif kayıt ve onay rozetleri |

---

## 3. Tipografi Sistemi

Platformda editoryal gazete ve akademik yayın standartlarına uygun 3 font ailesi kullanılır:

1. **Başlıklar (Serif):** `Newsreader`, `Playfair Display`, `Georgia`, `serif`
   - Karakter: Zarif, akademik, otoriter, negatif harf aralığı (`tracking-tight`).
2. **Arayüz ve Gövde (Sans-serif):** `Plus Jakarta Sans`, `-apple-system`, `sans-serif`
   - Karakter: Yüksek okunabilirlik, geometrik ve nötr.
3. **Meta Veriler ve Sayısal Etiketler (Monospace):** `JetBrains Mono`, `monospace`
   - Karakter: Mezuniyet yılı, kayıt numarası, tarih damgası, API durumu.

### Tipografi Ölçeği

| Düzey | Font Ailesi | Boyut / Satır Boyu | Ağırlık | Harf Aralığı | Tailwind Sınıfı |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Manşet (Hero H1)** | Serif | `3.5rem (56px) / 1.15` | Regular (400) / Medium (500) | `-0.02em` | `font-serif text-4xl sm:text-6xl text-[#161616] tracking-tight` |
| **Bölüm Başlığı (H2)**| Serif | `2.25rem (36px) / 1.2` | Medium (500) / Semibold (600) | `-0.01em` | `font-serif text-2xl sm:text-3xl text-[#161616]` |
| **Kart Başlığı (H3)** | Sans / Serif | `1.125rem (18px) / 1.35`| Semibold (600) | Normal | `font-sans text-lg font-semibold text-[#161616]` |
| **Gövde Metni** | Sans | `0.9375rem (15px) / 1.6`| Regular (400) | Normal | `font-sans text-[15px] text-[#5A5854] leading-relaxed` |
| **Üst Başlık (Kicker)**| Sans | `0.6875rem (11px) / 1.4`| Bold (700) | `+0.08em` | `font-sans text-[11px] font-bold uppercase tracking-widest text-[#7C1D26]` |
| **Meta / Tarih** | Mono | `0.75rem (12px) / 1.4` | Medium (500) | Normal | `font-mono text-xs text-[#5A5854]` |

---

## 4. Bileşen Kuralları (Component Rules)

### 4.1. Navbar (Üst Başlık ve Kurumsal Antet)
- Üstte sabit ancak gölgesiz; sıcak zemin renginde, altta net `1px solid #E2DFD7` çizgi.
- Sol tarafta İstanbul Üniversitesi kurumsal tipografisi ve kuruluş yılı (`1453`).
- Menü bağlantıları sade, büyük harf veya küçük harf zarif sans-serif, hover'da lacivert alt çizgi.
- Aksiyon butonları minimal: `bg-[#0F2942]` düz zemin, keskin köşe (`rounded-sm`).

### 4.2. Butonlar (Buttons)
- **Primary:** `px-4 py-2 bg-[#0F2942] hover:bg-[#163859] text-white text-xs font-semibold rounded-sm transition-colors border border-[#0F2942]`
- **Secondary / Outline:** `px-4 py-2 bg-transparent hover:bg-[#F2F0EA] text-[#161616] text-xs font-semibold rounded-sm border border-[#E2DFD7] transition-colors`
- **Accent:** `px-4 py-2 bg-[#7C1D26] hover:bg-[#94232E] text-white text-xs font-semibold rounded-sm transition-colors`

### 4.3. Kartlar ve Bölümler (Cards & Sections)
- Köşeler: Kesinlikle `rounded-sm` (maksimum 2px) veya `rounded-none`.
- Kenarlık: `1px solid #E2DFD7`.
- Zemin: Beyaz (`#FFFFFF`) veya açık taş (`#F2F0EA`).
- Asimetrik editoryal sütun düzeni: Manşet sol kolonda geniş açıklama, sağda tek sütunlu veri akışı veya 2 sütunlu editoryal grid.

### 4.4. Formlar ve Girdiler (Forms & Inputs)
- Zemin: `#FFFFFF` veya `#FAF9F6`.
- Kenarlık: `1px solid #E2DFD7`, tıklandığında (focus) `border-[#0F2942]` veya `outline-none ring-1 ring-[#0F2942]`.
- Etiketler: Küçük, hafif koyu, net ve sola yaslı.

### 4.5. Rozetler ve Etiketler (Tags & Badges)
- Yuvarlak balon YOK; dikdörtgen, keskin kenarlı etiketler:
- `px-2 py-0.5 border border-[#E2DFD7] bg-[#F2F0EA] text-[11px] font-mono text-[#161616] rounded-none`

---

## 5. Editoryal İletişim Dili (Microcopy)

- Klişe ve gösterişli pazarlama sözleri yerine doğrudan nesnel ifadeler:
  - *"Geçmişin gücüyle geleceği şekillendir"* yerine -> **"İstanbul Üniversitesi Mezun Kütüğü ve Kariyer Ağı"**
  - *"Awwwards seviyesinde lider platform"* yerine -> **"Fakülteler ve Mezunlar Arası Resmi İletişim Platformu"**
  - *"Hemen Başvur, Fırsatı Kaçırma"* yerine -> **"Başvuru İlet"**
  - *"Ağa Katıl"* yerine -> **"Mezun Kaydı Oluştur"**
