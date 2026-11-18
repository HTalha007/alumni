import React from 'react';

export default function Footer({ aboutData, setActivePage }) {
  return (
    <footer className="border-t-2 border-[#161616] bg-[#F2F0EA] text-[#5A5854] text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Kolon 1: Kurumsal Künye */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-7 h-7 bg-[#0F2942] text-white flex items-center justify-center font-serif font-bold text-xs">
                İÜ
              </div>
              <span className="font-serif font-bold text-sm text-[#161616]">İstanbul Üniversitesi</span>
            </div>
            <p className="text-xs leading-relaxed text-[#5A5854] mb-4">
              1453 yılında Fatih Sultan Mehmed Han tarafından temelleri atılan, Türkiye'nin ilk ve en köklü üniversitesinin resmi mezun kütüğü ve kariyer platformu.
            </p>
            {aboutData && (
              <div className="font-mono text-[11px] text-[#5A5854] pt-2 border-t border-[#E2DFD7]">
                Sürüm {aboutData.version || '1.2.0'} &bull; Beyazıt Yerleşkesi
              </div>
            )}
          </div>

          {/* Kolon 2: Sayfa İndeksi */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#161616] mb-3 pb-1 border-b border-[#E2DFD7]">
              Platform İndeksi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-[#161616] hover:underline transition-colors text-left">
                  Genel Bakış
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('directory')} className="hover:text-[#161616] hover:underline transition-colors text-left">
                  Mezun Kütüğü
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('jobs')} className="hover:text-[#161616] hover:underline transition-colors text-left">
                  Kariyer Panosu & İlanlar
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('announcements')} className="hover:text-[#161616] hover:underline transition-colors text-left">
                  Resmi Duyurular & Bülten
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('notfound')} className="hover:text-[#7C1D26] text-[#5A5854] hover:underline transition-colors text-left">
                  Hata Sayfası (404)
                </button>
              </li>
            </ul>
          </div>

          {/* Kolon 3: Resmi İletişim */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#161616] mb-3 pb-1 border-b border-[#E2DFD7]">
              Rektörlük & İletişim
            </h4>
            <ul className="space-y-1.5 text-xs text-[#5A5854]">
              <li className="font-medium text-[#161616]">İstanbul Üniversitesi Rektörlüğü</li>
              <li>Mezunlar Koordinatörlüğü</li>
              <li>34452 Beyazıt, Fatih, İstanbul</li>
              <li className="font-mono pt-1">Santral: +90 (212) 440 00 00</li>
              <li className="font-mono">E-posta: mezun@istanbul.edu.tr</li>
            </ul>
          </div>

          {/* Kolon 4: Akademik Arşiv */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#161616] mb-3 pb-1 border-b border-[#E2DFD7]">
              Mimari & Güvenlik
            </h4>
            <p className="text-xs text-[#5A5854] leading-relaxed mb-3">
              FastAPI MVC mimarisi, SQLAlchemy ilişkisel veritabanı ve editoryal tasarım standartları ile doğrulanmış mezun verisi işlenmektedir.
            </p>
            <div className="font-mono text-[10px] text-[#5A5854] space-y-1">
              <div>&bull; 5xx Guardian & Logger Aktif</div>
              <div>&bull; Generic 404 Yönlendirme Devrede</div>
              <div>&bull; DDD Domain Kuralları Denetimli</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E2DFD7] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#5A5854] gap-3">
          <p>&copy; {new Date().getFullYear()} İstanbul Üniversitesi. Tüm hakları saklıdır.</p>
          <div className="flex space-x-6 text-[#5A5854]">
            <span className="hover:text-[#161616] cursor-pointer">Kişisel Verilerin Korunması</span>
            <span className="hover:text-[#161616] cursor-pointer">Arşiv Mevzuatı</span>
            <span className="hover:text-[#161616] cursor-pointer">Kullanım Şartları</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
