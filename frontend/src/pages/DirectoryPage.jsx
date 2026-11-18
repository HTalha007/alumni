import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconUsers,
  IconSearch,
  IconPlus,
  IconGraduationCap,
  IconShield,
  IconBuilding
} from '../components/Icons';

export default function DirectoryPage({ alumniList, searchTerm, setSearchTerm, onOpenAddAlumni, loading }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' veya 'table'
  const [selectedDept, setSelectedDept] = useState('Tümü');
  const [selectedYear, setSelectedYear] = useState('Tümü');

  // Benzersiz bölümler ve yıllar
  const departments = ['Tümü', ...Array.from(new Set(alumniList.map((a) => a.department).filter(Boolean)))];
  const years = ['Tümü', ...Array.from(new Set(alumniList.map((a) => a.graduation_year).filter(Boolean))).sort((a, b) => b - a)];

  const filteredAlumni = alumniList.filter((user) => {
    const nameMatch = user.name ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const deptMatch = user.department ? user.department.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const titleMatch = user.title ? user.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchesSearch = nameMatch || deptMatch || titleMatch;

    const matchesDept = selectedDept === 'Tümü' || user.department === selectedDept;
    const matchesYear = selectedYear === 'Tümü' || String(user.graduation_year) === String(selectedYear);

    return matchesSearch && matchesDept && matchesYear;
  });

  return (
    <div className="w-full pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Başlık ve Eylemler */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <IconUsers className="w-3.5 h-3.5" />
            <span>Doğrulanmış Mezun Topluluğu</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            İstanbul Üniversitesi Mezun Dizini
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Tüm fakültelerimizden mezunlarımızı keşfedin, dönem arkadaşlarınızı bulun ve profesyonel ağınızı güçlendirin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Görünüm Değiştirici */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kartlar
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tablo
            </button>
          </div>

          <button
            onClick={onOpenAddAlumni}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-600/20"
          >
            <IconPlus className="w-4 h-4" />
            <span>+ Mezun Kaydı Ekle</span>
          </button>
        </div>
      </div>

      {/* Arama ve Filtre Kontrolleri Barı */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
        <div className="relative w-full md:w-96">
          <IconSearch className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="İsim, unvan veya uzmanlık alanı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Bölüm Seçici */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium">Bölüm:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Mezuniyet Yılı Seçici */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium">Yıl:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          <div className="text-xs font-semibold text-slate-400 pl-2 border-l border-slate-800">
            Toplam: <span className="text-white font-bold">{filteredAlumni.length}</span>
          </div>
        </div>
      </div>

      {/* Veri Listeleme Alanı */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-44 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredAlumni.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((user, idx) => {
              const initials = user.name
                ? user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()
                : 'İÜ';

              return (
                <motion.div
                  key={user.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-slate-900/90 transition-all shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                          {initials}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                            {user.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {user.title || 'Mezun'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                        '{user.graduation_year || '2024'}
                      </span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center text-xs text-slate-300">
                        <IconGraduationCap className="w-4 h-4 text-blue-400 mr-2 shrink-0" />
                        <span className="truncate">{user.department || 'İstanbul Üniversitesi'}</span>
                      </div>
                      {user.email && (
                        <div className="text-xs text-slate-400 truncate pl-6">
                          {user.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="inline-flex items-center space-x-1 text-emerald-400 text-[11px]">
                      <IconShield className="w-3.5 h-3.5" />
                      <span>Doğrulanmış Mezun</span>
                    </span>
                    <span className="text-blue-400 font-medium">Bağlantı Kur →</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-900/90">
                    <th className="py-4 px-6 font-semibold">Ad Soyad</th>
                    <th className="py-4 px-6 font-semibold">Bölüm / Fakülte</th>
                    <th className="py-4 px-6 font-semibold">Mezuniyet</th>
                    <th className="py-4 px-6 font-semibold">Mevcut Unvan</th>
                    <th className="py-4 px-6 font-semibold text-right">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                  {filteredAlumni.map((user, idx) => (
                    <tr key={user.id || idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{user.name}</td>
                      <td className="py-4 px-6 text-slate-400">{user.department}</td>
                      <td className="py-4 px-6 text-amber-300 font-mono text-xs">{user.graduation_year}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                          {user.title || 'Mezun'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-xs text-emerald-400 font-medium">
                          ✓ Onaylı
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <div className="py-16 text-center bg-slate-900/30 border border-slate-800/60 rounded-2xl text-slate-400 text-sm">
          Aradığınız filtre kriterlerine uygun mezun kaydı bulunamadı.
        </div>
      )}
    </div>
  );
}
