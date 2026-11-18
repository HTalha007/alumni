import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconGraduationCap, IconPlus, IconBriefcase } from './Icons';

export default function Navbar({ activePage, setActivePage, onOpenAddAlumni, onOpenCreateJob }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'directory', label: 'Mezun Dizini' },
    { id: 'jobs', label: 'Kariyer & İlanlar' },
    { id: 'announcements', label: 'Duyurular' },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl shadow-black/40 py-3.5'
          : 'bg-slate-950/60 backdrop-blur-sm border-b border-slate-800/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center space-x-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-blue-600 to-indigo-700 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            İÜ
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
              İstanbul Üniversitesi
            </span>
            <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase -mt-0.5">
              Mezunlar Platformu
            </span>
          </div>
        </button>

        {/* Desktop Sayfa Navigasyonu */}
        <nav className="hidden lg:flex items-center space-x-1 p-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Hızlı Eylemler */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onOpenCreateJob}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all shadow-sm"
          >
            <IconBriefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>+ İlan Ver</span>
          </button>
          <button
            onClick={onOpenAddAlumni}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-lg shadow-blue-600/25"
          >
            <IconPlus className="w-3.5 h-3.5 text-white" />
            <span>Mezun Ol / Katıl</span>
          </button>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
          aria-label="Menüyü aç/kapat"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobil Açılır Menü */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800/90 px-6 py-5 space-y-4 backdrop-blur-xl">
          <div className="flex flex-col space-y-2 text-sm font-semibold">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-xl transition-colors ${
                  activePage === link.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCreateJob();
              }}
              className="w-full text-center py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold"
            >
              + İlan Ver
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddAlumni();
              }}
              className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Mezun Ol / Katıl
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
}
