import React, { useState } from 'react';
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
    <div className="w-full pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Üst Editoryal Başlık ve Aksiyonlar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 pb-6 border-b border-[#E2DFD7]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C1D26] font-semibold">
            Rektörlük &bull; Resmi Bülten
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#161616] mt-1 tracking-tight">
            Üniversite Duyuruları & Faaliyet Takvimi
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5854] mt-2 max-w-2xl leading-relaxed">
            Rektörlük makamı, fakülteler ve mezun derneklerimizin resmi duyuru, anma, akademik toplantı ve mezunlar günü bildirimleri.
          </p>
        </div>

        <button
          onClick={onOpenCreateAnnouncement}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors whitespace-nowrap"
        >
          <IconPlus className="w-3.5 h-3.5 text-white" />
          <span>Yeni Duyuru Tanzim Et</span>
        </button>
      </div>

      {/* Arama ve Kategori Masası */}
      <div className="bg-[#F2F0EA] border border-[#E2DFD7] p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between rounded-sm">
        <div className="relative w-full md:w-80">
          <IconSearch className="w-4 h-4 text-[#5A5854] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Duyuru veya etkinlik içeriğinde ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#E2DFD7] text-xs text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors border ${
                activeCategory === cat
                  ? 'bg-[#0F2942] text-white border-[#0F2942]'
                  : 'bg-white text-[#5A5854] border-[#E2DFD7] hover:text-[#161616]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Duyuru Listesi (Editoryal Gazete Sütunları) */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-48 bg-white border border-[#E2DFD7] rounded-sm animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ann, idx) => (
            <div
              key={ann.id || idx}
              onClick={() => setSelectedAnnouncement(ann)}
              className="bg-white border border-[#E2DFD7] p-6 rounded-sm hover:border-[#0F2942] transition-colors cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DFD7]">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#F2F0EA] border border-[#E2DFD7] text-[#7C1D26] font-semibold">
                    {ann.category || 'Duyuru'}
                  </span>
                  <div className="font-mono text-[11px] text-[#5A5854] flex items-center space-x-1">
                    <IconCalendar className="w-3.5 h-3.5 text-[#5A5854]" />
                    <span>{ann.date || 'Tarih Yok'}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#161616] group-hover:text-[#0F2942] transition-colors line-clamp-2 mb-2">
                  {ann.title}
                </h3>
                <p className="text-xs text-[#5A5854] leading-relaxed line-clamp-3">
                  {ann.content}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E2DFD7] flex items-center justify-between text-xs font-semibold text-[#0F2942]">
                <span>Metni İncele</span>
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-[#E2DFD7] text-xs text-[#5A5854] rounded-sm">
          Arama ve filtre kriterlerine uygun resmi duyuru kaydı bulunamadı.
        </div>
      )}

      {/* Duyuru İnceleme Modalı */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#161616]/40 backdrop-blur-[2px]"
            onClick={() => setSelectedAnnouncement(null)}
          />
          <div className="relative bg-white border border-[#E2DFD7] rounded-sm max-w-lg w-full p-6 z-10">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2DFD7]">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#F2F0EA] border border-[#E2DFD7] text-[#7C1D26] font-semibold">
                {selectedAnnouncement.category || 'Duyuru'}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-[#5A5854] hover:text-[#161616] p-1"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#161616] mb-2 leading-snug">
              {selectedAnnouncement.title}
            </h3>
            <p className="font-mono text-[11px] text-[#5A5854] mb-4">
              Yayın Tarihi: {selectedAnnouncement.date || 'Belirtilmedi'} &bull; İstanbul Üniversitesi
            </p>
            <div className="text-xs sm:text-sm text-[#161616] leading-relaxed whitespace-pre-line bg-[#FAF9F6] p-4 border border-[#E2DFD7] rounded-sm max-h-72 overflow-y-auto mb-6">
              {selectedAnnouncement.content}
            </div>
            <div className="flex justify-end pt-3 border-t border-[#E2DFD7]">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 bg-[#F2F0EA] text-[#161616] text-xs font-semibold hover:bg-[#E2DFD7] rounded-sm"
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
