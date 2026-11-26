import React, { useState } from 'react';
import { IconBriefcase, IconPlus, IconShield, IconUsers } from './Icons';

export default function Navbar({
  activePage,
  setActivePage,
  currentUser,
  onLogout,
  onOpenAddAlumni,
  onOpenCreateJob
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Genel Bakış' },
    { id: 'directory', label: 'Mezun Kütüğü' },
    { id: 'jobs', label: 'Kariyer & İlanlar' },
    { id: 'announcements', label: 'Duyurular & Bülten' },
  ];

  if (currentUser) {
    navLinks.push({ id: 'profile', label: 'Kişisel Panel' });
  }

  if (currentUser && currentUser.role === 'admin') {
    navLinks.push({ id: 'admin', label: 'Yönetici Paneli', isAdminBadge: true });
  }

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FAF9F6] border-b border-[#E2DFD7]">
      {/* Üst Kurumsal Çizgi */}
      <div className={`h-1 w-full ${currentUser?.role === 'admin' ? 'bg-[#7C1D26]' : 'bg-[#0F2942]'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Sol: Kurumsal Tipografi ve Amblem */}
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center space-x-3.5 text-left focus:outline-none group"
          >
            <div className={`w-10 h-10 border flex items-center justify-center font-serif text-white font-bold text-lg tracking-tight ${
              currentUser?.role === 'admin' ? 'bg-[#7C1D26] border-[#7C1D26]' : 'bg-[#0F2942] border-[#0F2942]'
            }`}>
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
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors pb-1 relative flex items-center space-x-1.5 ${
                    isActive
                      ? link.isAdminBadge
                        ? 'text-[#7C1D26] border-b-2 border-[#7C1D26] font-bold'
                        : 'text-[#0F2942] border-b-2 border-[#0F2942] font-bold'
                      : link.isAdminBadge
                      ? 'text-[#7C1D26] hover:text-[#94232E]'
                      : 'text-[#5A5854] hover:text-[#161616]'
                  }`}
                >
                  {link.isAdminBadge && <IconShield className="w-3.5 h-3.5 text-[#7C1D26]" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sağ: Kullanıcı Durumu ve Aksiyonlar */}
          <div className="hidden sm:flex items-center space-x-3">
            {currentUser ? (
              <>
                {/* Giriş Yapmış Kullanıcı Rozeti */}
                <button
                  onClick={() => setActivePage('profile')}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-[#F2F0EA] border border-[#E2DFD7] rounded-sm hover:border-[#0F2942] transition-colors text-left"
                >
                  <div className="w-6 h-6 bg-[#0F2942] text-white flex items-center justify-center font-serif text-[11px] font-bold">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#161616] leading-none">
                      {currentUser.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#7C1D26] font-bold mt-0.5">
                      [{currentUser.role}]
                    </span>
                  </div>
                </button>

                {currentUser.role !== 'student' && (
                  <button
                    onClick={onOpenCreateJob}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-[#F2F0EA] text-[#161616] text-xs font-semibold rounded-sm border border-[#E2DFD7] transition-colors"
                  >
                    <IconBriefcase className="w-3 h-3 text-[#0F2942]" />
                    <span>+ İlan Ver</span>
                  </button>
                )}

                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 bg-transparent hover:bg-[#7C1D26]/10 text-[#7C1D26] border border-[#7C1D26]/30 text-xs font-semibold rounded-sm transition-colors"
                >
                  Çıkış
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActivePage('login')}
                  className="px-3.5 py-1.5 bg-transparent hover:bg-[#F2F0EA] text-[#161616] text-xs font-semibold rounded-sm border border-[#E2DFD7] transition-colors"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => setActivePage('register')}
                  className="px-4 py-1.5 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors border border-[#0F2942]"
                >
                  Kayıt Ol
                </button>
              </>
            )}
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
          {currentUser && (
            <div className="pb-3 border-b border-[#E2DFD7] flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-[#161616] block">{currentUser.name}</span>
                <span className="font-mono text-[10px] text-[#7C1D26] uppercase font-bold">[{currentUser.role}]</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-xs text-[#7C1D26] font-semibold underline"
              >
                Çıkış Yap
              </button>
            </div>
          )}

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

          {!currentUser && (
            <div className="pt-3 border-t border-[#E2DFD7] flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActivePage('login');
                }}
                className="w-full text-center py-2 bg-[#F2F0EA] border border-[#E2DFD7] text-[#161616] text-xs font-semibold rounded-sm"
              >
                Giriş Yap
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActivePage('register');
                }}
                className="w-full text-center py-2 bg-[#0F2942] text-white text-xs font-semibold rounded-sm"
              >
                Kayıt Ol
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
