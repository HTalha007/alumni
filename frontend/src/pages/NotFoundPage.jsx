import React from 'react';
import { IconSearch } from '../components/Icons';

export default function NotFoundPage({ setActivePage }) {
  return (
    <div className="w-full min-h-[70vh] py-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
      <div className="max-w-xl mx-auto border border-[#E2DFD7] bg-white p-8 sm:p-12 text-left rounded-sm">
        {/* Üst Kicker */}
        <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-[#E2DFD7]">
          <span className="w-2 h-2 bg-[#7C1D26]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#7C1D26] font-semibold">
            Hata Kodu 404 &bull; Rota Bulunamadı
          </span>
        </div>

        {/* Başlık */}
        <h1 className="font-serif text-3xl sm:text-4xl text-[#161616] tracking-tight leading-tight mb-4">
          Talep Edilen Kütük Sayfası Mevcut Değil.
        </h1>

        <p className="text-xs sm:text-sm text-[#5A5854] leading-relaxed mb-6">
          Erişmeye çalıştığınız web adresi, rota veya API kaynağı İstanbul Üniversitesi Mezun Platformu arşivinde yer almamaktadır veya yayından kaldırılmıştır.
        </p>

        {/* Yönlendirme Seçenekleri */}
        <div className="p-4 bg-[#F2F0EA] border border-[#E2DFD7] rounded-sm mb-6 space-y-2 text-xs">
          <div className="font-serif font-bold text-[#161616]">Önerilen Başvuru Rotaları:</div>
          <ul className="space-y-1.5 text-[#5A5854]">
            <li>
              &bull; Ana sayfaya dönerek genel kütük indeksine ulaşabilirsiniz.
            </li>
            <li>
              &bull; Mezun kütüğünde isim veya fakülte bazlı arama yapabilirsiniz.
            </li>
            <li>
              &bull; Açık staj ve kariyer pozisyonları için kariyer panosunu ziyaret edebilirsiniz.
            </li>
          </ul>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setActivePage('home')}
            className="px-5 py-2.5 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors"
          >
            Genel Bakışa Dön
          </button>
          <button
            onClick={() => setActivePage('directory')}
            className="px-4 py-2.5 bg-transparent hover:bg-[#F2F0EA] text-[#161616] border border-[#E2DFD7] text-xs font-semibold rounded-sm transition-colors"
          >
            Mezun Kütüğünü Aç
          </button>
          <button
            onClick={() => setActivePage('jobs')}
            className="px-4 py-2.5 bg-transparent hover:bg-[#F2F0EA] text-[#161616] border border-[#E2DFD7] text-xs font-semibold rounded-sm transition-colors"
          >
            Kariyer Panosu
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-[#E2DFD7] font-mono text-[10px] text-[#5A5854]">
          FastAPI MVC Guardian 404 & Frontend Client-Side Handler Aktif
        </div>
      </div>
    </div>
  );
}
