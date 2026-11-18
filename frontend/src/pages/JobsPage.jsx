import React, { useState } from 'react';
import {
  IconBriefcase,
  IconBuilding,
  IconPlus,
  IconArrowUpRight,
  IconSearch
} from '../components/Icons';

export default function JobsPage({ jobs, loading, onOpenCreateJob, onOpenApplyJob }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const descMatch = job.description ? job.description.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    return titleMatch || descMatch;
  });

  return (
    <div className="w-full pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Üst Editoryal Başlık ve Aksiyonlar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 pb-6 border-b border-[#E2DFD7]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C1D26] font-semibold">
            Mesleki Dayanışma &bull; İstihdam Panosu
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#161616] mt-1 tracking-tight">
            Kariyer & İş / Staj İlanları
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5854] mt-2 max-w-2xl leading-relaxed">
            İstanbul Üniversitesi mezunlarının kurucusu veya yöneticisi olduğu kurumların doğrudan mezun ve öğrencilere yönelik açık pozisyonları.
          </p>
        </div>

        <button
          onClick={onOpenCreateJob}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors whitespace-nowrap"
        >
          <IconPlus className="w-3.5 h-3.5 text-white" />
          <span>Yeni İlan Tanzim Et</span>
        </button>
      </div>

      {/* Arama Masası */}
      <div className="bg-[#F2F0EA] border border-[#E2DFD7] p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between rounded-sm">
        <div className="relative w-full sm:w-96">
          <IconSearch className="w-4 h-4 text-[#5A5854] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pozisyon, kurum veya uzmanlık ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#E2DFD7] text-xs text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
          />
        </div>

        <div className="font-mono text-xs text-[#5A5854]">
          Açık Pozisyon Sayısı: <span className="font-bold text-[#161616]">{filteredJobs.length}</span>
        </div>
      </div>

      {/* İlan Kartları Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="h-48 bg-white border border-[#E2DFD7] rounded-sm animate-pulse" />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job, idx) => (
            <div
              key={job.id || idx}
              className="bg-white border border-[#E2DFD7] p-6 rounded-sm hover:border-[#0F2942] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between pb-3 mb-3 border-b border-[#E2DFD7]">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#161616]">
                      {job.title}
                    </h3>
                    <p className="font-mono text-xs text-[#5A5854] mt-0.5">
                      İlan Veren Mezun Sicil: <span className="font-bold text-[#7C1D26]">#{job.author_id}</span>
                    </p>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 bg-[#1E4D2B]/10 text-[#1E4D2B] border border-[#1E4D2B]/20">
                    Aktif
                  </span>
                </div>

                <div className="text-xs text-[#5A5854] leading-relaxed whitespace-pre-line bg-[#FAF9F6] p-3 border border-[#E2DFD7] rounded-sm max-h-32 overflow-y-auto">
                  {job.description || 'Bu ilan için ayrıntılı açıklama tanzim edilmemiştir.'}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E2DFD7] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#5A5854]">
                  Doğrulanmış İÜ İlanı
                </span>
                <button
                  onClick={() => onOpenApplyJob(job.id, job.title)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors"
                >
                  <span>Başvuru İlet</span>
                  <IconArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-[#E2DFD7] text-xs text-[#5A5854] rounded-sm">
          Arama kriterlerine uygun kariyer ilanı bulunamadı.
        </div>
      )}
    </div>
  );
}
