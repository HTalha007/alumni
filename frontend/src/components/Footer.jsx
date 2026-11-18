import React from 'react';
import { IconGraduationCap } from './Icons';

export default function Footer({ aboutData, setActivePage }) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Kolon 1: Logo & Marka Özeti */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-sm shadow-md">
                İÜ
              </div>
              <span className="font-bold text-white text-sm">İstanbul Üniversitesi</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              1453 yılından bu yana bilimin ve kültürün öncüsü olan İstanbul Üniversitesi'nin mezun takip, kariyer ve iş birliği platformu.
            </p>
            {aboutData && (
              <div className="text-[11px] text-slate-500 font-mono">
                Sürüm: {aboutData.version || '1.2.0'} | {aboutData.institution || 'İstanbul Üniversitesi'}
              </div>
            )}
          </div>

          {/* Kolon 2: Sayfalar / Hızlı Erişim */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Sayfalar</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-blue-400 transition-colors">
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('directory')} className="hover:text-blue-400 transition-colors">
                  Mezun Dizini
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('jobs')} className="hover:text-blue-400 transition-colors">
                  Kariyer & İlanlar
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('announcements')} className="hover:text-blue-400 transition-colors">
                  Duyuru & Etkinlikler
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('notfound')} className="hover:text-rose-400 text-slate-500 transition-colors">
                  Örnek 404 Sayfası
                </button>
              </li>
            </ul>
          </div>

          {/* Kolon 3: Yerleşke & İletişim */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">İletişim & Yerleşke</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>İstanbul Üniversitesi Rektörlüğü</li>
              <li>34452 Beyazıt / Fatih / İstanbul</li>
              <li>Telefon: +90 (212) 440 00 00</li>
              <li>E-posta: mezun@istanbul.edu.tr</li>
            </ul>
          </div>

          {/* Kolon 4: Tasarım & Mimari */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Mimarisi & Standartlar</h4>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] text-slate-300">FastAPI MVC</span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] text-slate-300">React 19</span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] text-slate-300">DESIGN.md</span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] text-slate-300">Tailwind CSS</span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] text-slate-300">Framer Motion</span>
            </div>
            <p className="text-[11px] text-slate-500">
              `brand.md` ve `DESIGN.md` standartlarına tam uyumlu editoryal tasarım sistemi.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} İstanbul Üniversitesi Mezunlar Portalı. Tüm Hakları Saklıdır.</p>
          <div className="flex space-x-6 text-slate-400">
            <span className="hover:text-slate-300 cursor-pointer">Gizlilik Politikası</span>
            <span className="hover:text-slate-300 cursor-pointer">Kullanım Şartları</span>
            <span className="hover:text-slate-300 cursor-pointer">KVKK Aydınlatma</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
