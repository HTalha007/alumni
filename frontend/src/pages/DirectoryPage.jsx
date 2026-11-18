import React, { useState } from 'react';
import {
  IconSearch,
  IconPlus,
  IconGraduationCap,
  IconShield
} from '../components/Icons';

export default function DirectoryPage({ alumniList, searchTerm, setSearchTerm, onOpenAddAlumni, loading }) {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDept, setSelectedDept] = useState('Tümü');
  const [selectedYear, setSelectedYear] = useState('Tümü');

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
    <div className="w-full pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Üst Editoryal Başlık ve Aksiyonlar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 pb-6 border-b border-[#E2DFD7]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C1D26] font-semibold">
            Arşiv &bull; Kütük Sorgulama
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#161616] mt-1 tracking-tight">
            İstanbul Üniversitesi Mezun Kütüğü
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5854] mt-2 max-w-2xl leading-relaxed">
            Fakültelerimize kayıtlı tüm mezunlarımızın dönem kütükleri ve mesleki unvan kayıtları.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          {/* Görünüm Değiştirici */}
          <div className="inline-flex border border-[#E2DFD7] bg-white rounded-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                viewMode === 'grid' ? 'bg-[#0F2942] text-white' : 'text-[#5A5854] hover:text-[#161616]'
              }`}
            >
              Kartlar
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                viewMode === 'table' ? 'bg-[#0F2942] text-white' : 'text-[#5A5854] hover:text-[#161616]'
              }`}
            >
              Kütük Defteri
            </button>
          </div>

          <button
            onClick={onOpenAddAlumni}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0F2942] hover:bg-[#183856] text-white text-xs font-semibold rounded-sm transition-colors whitespace-nowrap"
          >
            <IconPlus className="w-3.5 h-3.5 text-white" />
            <span>Yeni Kayıt</span>
          </button>
        </div>
      </div>

      {/* Arama ve Filtre Masası */}
      <div className="bg-[#F2F0EA] border border-[#E2DFD7] p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between rounded-sm">
        <div className="relative w-full md:w-96">
          <IconSearch className="w-4 h-4 text-[#5A5854] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="İsim, unvan veya uzmanlık ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#E2DFD7] text-xs text-[#161616] placeholder-[#5A5854] focus:outline-none focus:border-[#0F2942] rounded-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Bölüm Seçimi */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#5A5854] font-medium">Bölüm:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#E2DFD7] text-xs text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Dönem Yılı Seçimi */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#5A5854] font-medium">Dönem:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#E2DFD7] text-xs text-[#161616] focus:outline-none focus:border-[#0F2942] rounded-sm font-mono"
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          <div className="font-mono text-xs text-[#5A5854] pl-2 border-l border-[#E2DFD7]">
            Kayıt: <span className="font-bold text-[#161616]">{filteredAlumni.length}</span>
          </div>
        </div>
      </div>

      {/* Veri Listeleme */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-40 bg-white border border-[#E2DFD7] rounded-sm animate-pulse" />
          ))}
        </div>
      ) : filteredAlumni.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAlumni.map((user, idx) => (
              <div
                key={user.id || idx}
                className="bg-white border border-[#E2DFD7] p-5 rounded-sm hover:border-[#0F2942] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between pb-3 mb-3 border-b border-[#E2DFD7]">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#161616]">
                        {user.name}
                      </h3>
                      <p className="text-xs text-[#5A5854] mt-0.5">
                        {user.title || 'Mezun'}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 border border-[#E2DFD7] bg-[#F2F0EA] text-[#7C1D26]">
                      '{user.graduation_year || '2024'}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-[#5A5854]">
                    <div className="flex items-center space-x-1.5">
                      <IconGraduationCap className="w-3.5 h-3.5 text-[#0F2942] shrink-0" />
                      <span className="truncate">{user.department || 'İstanbul Üniversitesi'}</span>
                    </div>
                    {user.email && (
                      <div className="font-mono text-[11px] text-[#5A5854] truncate pl-5">
                        {user.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2DFD7] flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center space-x-1 text-[#1E4D2B] font-medium">
                    <IconShield className="w-3 h-3" />
                    <span>Doğrulanmış Sicil</span>
                  </span>
                  <span className="font-mono text-[#5A5854]">ID #{user.id}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E2DFD7] rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2DFD7] bg-[#F2F0EA] text-[#161616] text-xs font-serif font-bold">
                    <th className="py-3 px-4">Kayıtlı İsim</th>
                    <th className="py-3 px-4">Fakülte / Bölüm</th>
                    <th className="py-3 px-4 font-mono">Dönem</th>
                    <th className="py-3 px-4">Unvan</th>
                    <th className="py-3 px-4 text-right">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DFD7] text-xs text-[#5A5854]">
                  {filteredAlumni.map((user, idx) => (
                    <tr key={user.id || idx} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#161616]">{user.name}</td>
                      <td className="py-3 px-4">{user.department}</td>
                      <td className="py-3 px-4 font-mono text-[#7C1D26]">{user.graduation_year}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 border border-[#E2DFD7] bg-[#F2F0EA] text-[11px] text-[#161616]">
                          {user.title || 'Mezun'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-[11px] text-[#1E4D2B]">
                        ✓ Onaylı Sicil
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <div className="py-16 text-center bg-white border border-[#E2DFD7] text-xs text-[#5A5854] rounded-sm">
          Arama kriterlerine uygun kütük kaydı bulunamadı.
        </div>
      )}
    </div>
  );
}
