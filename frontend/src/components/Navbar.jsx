import React, { useState } from 'react';
import { IconBriefcase, IconPlus } from './Icons';

export default function Navbar({ activePage, setActivePage, onOpenAddAlumni, onOpenCreateJob }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Genel Bakış' },
    { id: 'directory', label: 'Mezun Kütüğü' },
    { id: 'jobs', label: 'Kariyer & İlanlar' },
    { id: 'announcements', label: 'Duyurular & Bülten' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FAF9F6] border-b border-[#E2DFD7]">
      {/* Üst Kurumsal Çizgi */}
      <div className="h-1 bg-[#0F2942] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Sol: Kurumsal Tipografi ve Amblem */}
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center space-x-3.5 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 border border-[#0F2942] bg-[#0F2942] flex items-center justify-center font-serif text-white font-bold text-lg tracking-tight">
              İÜ
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#161616] group-hover:text-[#0F2942] transition-colors leading-tight">
                İstanbul Üniversitesi
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5854]">
                Mezunlar Platformu &bull; Kuruluş 1453
              </span>
            </div>
          </button>

          {/* Orta: Editoryal Menü */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors pb-1 relative ${
                    isActive
                      ? 'text-[#0F2942] border-b-2 border-[#0F2942]'
                      : 'text-[#5A5854] hover:text-[#161616]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Sağ: Kurumsal Aksiyon Butonları */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenCreateJob}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#F2F0EA] hover:bg-[#E2DFD7] text-[#161616] text-xs font-semibold rounded-sm border border-[#E2DFD7] transition-colors"
            >
              <IconBriefcase className="w-3.5 h-3.5 text-[#0F2942]" />
              <span>İlan Ver</span>
            </button>
            <button
              onClick={onOpenAddAlumni}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors border border-[#0F2942]"
            >
              <IconPlus className="w-3.5 h-3.5 text-white" />
              <span>Mezun Kaydı</span>
            </button>
          </div>

          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#161616] border border-[#E2DFD7] bg-[#F2F0EA] rounded-sm focus:outline-none"
            aria-label="Menüyü aç/kapat"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-t border-[#E2DFD7] px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 text-xs font-semibold uppercase tracking-wider ${
                  activePage === link.id
                    ? 'text-[#0F2942] font-bold border-l-2 border-[#0F2942] pl-2'
                    : 'text-[#5A5854] hover:text-[#161616] pl-2'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E2DFD7] flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCreateJob();
              }}
              className="w-full text-center py-2 bg-[#F2F0EA] border border-[#E2DFD7] text-[#161616] text-xs font-semibold rounded-sm"
            >
              İlan Ver
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddAlumni();
              }}
              className="w-full text-center py-2 bg-[#0F2942] text-white text-xs font-semibold rounded-sm"
            >
              Mezun Kaydı
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
