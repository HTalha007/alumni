import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconBell,
  IconCalendar,
  IconPlus,
  IconArrowUpRight,
  IconSearch,
  IconX
} from '../components/Icons';

export default function AnnouncementsPage({
  announcements,
  loading,
  onOpenCreateAnnouncement
}) {
  const [activeCategory, setActiveCategory] = useState('Hepsi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const categories = ['Hepsi', 'Etkinlik', 'Kariyer', 'Genel'];

  const filtered = announcements.filter((item) => {
    const matchesCat =
      activeCategory === 'Hepsi' ||
      (item.category && item.category.toLowerCase() === activeCategory.toLowerCase());
    const matchesSearch =
      (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Başlık ve Eylemler */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <IconBell className="w-3.5 h-3.5" />
            <span>Resmi Duyuru & Etkinlikler (/api/announcements Uyumlu)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Üniversite & Mezunlar Bülteni
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            İstanbul Üniversitesi rektörlüğü, mezun dernekleri ve fakültelerimizden duyurular, etkinlikler ve akademik gelişmeler.
          </p>
        </div>

        <button
          onClick={onOpenCreateAnnouncement}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
        >
          <IconPlus className="w-4 h-4" />
          <span>+ Yeni Duyuru Ekle</span>
        </button>
      </div>

      {/* Arama ve Kategori Filtreleri Barı */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
        <div className="relative w-full md:w-80">
          <IconSearch className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Duyuru veya etkinlik içeriği ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Duyuru Kartları Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-52 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ann, idx) => (
            <motion.div
              key={ann.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setSelectedAnnouncement(ann)}
              className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all cursor-pointer group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold">
                    {ann.category || 'Duyuru'}
                  </span>
                  <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                    <IconCalendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{ann.date || 'Güncel'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2">
                  {ann.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {ann.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                <span>Detayları İncele</span>
                <IconArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-900/30 border border-slate-800/60 rounded-2xl text-slate-400 text-sm">
          Bu arama veya filtre kriterine uygun duyuru bulunamadı.
        </div>
      )}

      {/* Duyuru Detay Modalı */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedAnnouncement(null)}
          />
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                {selectedAnnouncement.category || 'Duyuru'}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{selectedAnnouncement.title}</h3>
            <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
              <IconCalendar className="w-3.5 h-3.5 text-slate-500" />
              Yayın Tarihi: {selectedAnnouncement.date || 'Güncel'}
            </p>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 max-h-72 overflow-y-auto mb-6">
              {selectedAnnouncement.content}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
