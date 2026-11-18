import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconBriefcase,
  IconBuilding,
  IconPlus,
  IconArrowUpRight,
  IconSearch,
  IconMapPin,
  IconCheck
} from '../components/Icons';

export default function JobsPage({ jobs, loading, onOpenCreateJob, onOpenApplyJob }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const descMatch = job.description ? job.description.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    return titleMatch || descMatch;
  });

  return (
    <div className="w-full pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Başlık ve Eylemler */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <IconBriefcase className="w-3.5 h-3.5" />
            <span>Kariyer Köprüsü (docs/ddd.md Uyumlu)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Kariyer & İş / Staj Panosu
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            İstanbul Üniversitesi mezunlarının kurduğu veya yöneticisi olduğu şirketlerden doğrulanmış iş ve staj olanakları.
          </p>
        </div>

        <button
          onClick={onOpenCreateJob}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold transition-all shadow-lg shadow-indigo-600/25"
        >
          <IconPlus className="w-4 h-4" />
          <span>+ Yeni İş İlanı Yayınla</span>
        </button>
      </div>

      {/* Arama ve Filtre Çubuğu */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xl">
        <div className="relative w-full sm:w-96">
          <IconSearch className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pozisyon, şirket veya anahtar kelime ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Toplam Aktif Pozisyon: <span className="text-indigo-400 font-bold">{filteredJobs.length}</span>
        </div>
      </div>

      {/* İlan Kartları Listesi */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-52 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job, idx) => (
            <motion.div
              key={job.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                      <IconBuilding className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        İlan Sahibi Mezun ID: <span className="text-amber-400 font-semibold font-mono">#{job.author_id}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Aktif İlan
                  </span>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line max-h-36 overflow-y-auto">
                  {job.description || 'Bu ilan için ek açıklama girilmedi.'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-500">
                  Doğrulanmış İÜ İş/Staj Duyurusu
                </span>
                <button
                  onClick={() => onOpenApplyJob(job.id, job.title)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-600/20"
                >
                  <span>Hemen Başvur</span>
                  <IconArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-900/30 border border-slate-800/60 rounded-2xl text-slate-400 text-sm">
          Şu an aradığınız kriterlere uygun iş ilanı bulunmamaktadır. İlk ilanı siz yayınlayabilirsiniz!
        </div>
      )}
    </div>
  );
}
