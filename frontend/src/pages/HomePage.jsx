import React from 'react';
import { motion } from 'framer-motion';
import {
  IconGraduationCap,
  IconSearch,
  IconBriefcase,
  IconUsers,
  IconBuilding,
  IconGlobe,
  IconSparkles,
  IconArrowUpRight,
  IconShield,
  IconBell
} from '../components/Icons';

export default function HomePage({
  apiStatus,
  alumniCount,
  jobCount,
  announcementCount,
  searchTerm,
  setSearchTerm,
  setActivePage,
  onOpenAddAlumni
}) {
  const handleQuickSearch = (e) => {
    e.preventDefault();
    setActivePage('directory');
  };

  const stats = [
    {
      id: 1,
      icon: <IconBuilding className="w-6 h-6 text-amber-400" />,
      value: "1453",
      label: "Kuruluş Tarihi",
      desc: "570 yılı aşkın köklü bilim, hukuk ve akademi geleneği."
    },
    {
      id: 2,
      icon: <IconGraduationCap className="w-6 h-6 text-blue-400" />,
      value: alumniCount ? `${alumniCount}+ Kayıtlı` : "450.000+",
      label: "Yaşayan Mezun",
      desc: "Dünyanın her kıtasına yayılmış lider mezun ağı."
    },
    {
      id: 3,
      icon: <IconBriefcase className="w-6 h-6 text-indigo-400" />,
      value: jobCount ? `${jobCount} Açık İlan` : "1.200+",
      label: "Kariyer Fırsatı",
      desc: "Mezunlar arası doğrudan staj, iş ve mentorluk köprüsü."
    },
    {
      id: 4,
      icon: <IconGlobe className="w-6 h-6 text-emerald-400" />,
      value: "85+",
      label: "Ülke İletişim Ağı",
      desc: "Uluslararası platformda aktif İÜ mezun dernekleri."
    }
  ];

  const highlights = [
    {
      title: "Dinamik Mezun Dizini",
      desc: "Fakülte, bölüm ve mezuniyet yılına göre filtrelenebilir, canlı arama destekli doğrulanmış mezun arşivi.",
      icon: <IconUsers className="w-6 h-6 text-blue-400" />,
      page: "directory",
      badge: "Gelişmiş Filtre"
    },
    {
      title: "Kariyer & İlan Panosu",
      desc: "Mezunlarımızın açtığı staj ve pozisyonlara doğrudan ön yazı ile başvurabileceğiniz kariyer ağı.",
      icon: <IconBriefcase className="w-6 h-6 text-indigo-400" />,
      page: "jobs",
      badge: "Doğrudan Başvuru"
    },
    {
      title: "Resmi Duyuru & Etkinlikler",
      desc: "Üniversite rektörlüğü, mezunlar derneği ve fakültelerden en son gelişmeler ve buluşma takvimi.",
      icon: <IconBell className="w-6 h-6 text-amber-400" />,
      page: "announcements",
      badge: "Güncel Bülten"
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. SCROLLYTELLING HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center">
        {/* Glow Işıkları */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Canlı Backend Durum Rozeti */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 shadow-xl mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                apiStatus.connected ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                apiStatus.connected ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {apiStatus.message || 'İstanbul Üniversitesi Mezun Platformu'}
            </span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
              v1.2 MVC Live
            </span>
          </motion.div>

          {/* Ana Başlık */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white mb-6"
          >
            1453'ten Günümüze Köklü Miras, <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
              Geleceği Şekillendiren Mezun Ağı.
            </span>
          </motion.h1>

          {/* Alt Açıklama */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed font-light mb-10"
          >
            Türkiye'nin ilk üniversitesinin yarım milyona yaklaşan mezunlarını, genç yeteneklerini ve köklü fakültelerini tek bir kurumsal dijital ekosistemde buluşturuyoruz.
          </motion.p>

          {/* Hızlı Arama Barı */}
          <motion.form
            onSubmit={handleQuickSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-md flex items-center mb-8 focus-within:border-blue-500/60 transition-colors"
          >
            <div className="pl-3 text-slate-500">
              <IconSearch className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Mezun adı, bölüm veya uzmanlık unvanı arayın..."
              className="w-full px-3 py-2 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold whitespace-nowrap transition-all shadow-md shadow-blue-600/30"
            >
              Dizinde Bul
            </button>
          </motion.form>

          {/* Aksiyon Butonları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold"
          >
            <button
              onClick={() => setActivePage('directory')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 flex items-center space-x-2 transition-all shadow-sm"
            >
              <IconUsers className="w-4 h-4 text-blue-400" />
              <span>Mezunları Keşfet</span>
            </button>
            <button
              onClick={() => setActivePage('jobs')}
              className="px-6 py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center space-x-2 transition-all shadow-sm"
            >
              <IconBriefcase className="w-4 h-4 text-indigo-400" />
              <span>Kariyer Panosu</span>
            </button>
            <button
              onClick={onOpenAddAlumni}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
            >
              <IconSparkles className="w-4 h-4" />
              <span>Ağa Katıl</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. CANLI İSTATİSTİKLER (STATS & IMPACT) */}
      <section className="py-16 border-y border-slate-800/80 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/80 transition-all hover:-translate-y-1 shadow-lg shadow-black/20"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PLATFORM MODÜLLERİ VİTRİNİ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <IconSparkles className="w-3.5 h-3.5" />
            <span>Platform Yetenekleri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mezunlarımız İçin Neler Sunuyoruz?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Akademik dayanışmayı ve profesyonel kariyer ağını güçlendiren ana modüller.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setActivePage(item.page)}
              className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-7 transition-all cursor-pointer group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center space-x-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300 pt-4 border-t border-slate-800/80">
                <span>Modülü Aç</span>
                <IconArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. MEZUN İLHAM HİKAYELERİ */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <IconGraduationCap className="w-3.5 h-3.5" />
                <span>Kökler ve Başarılar</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Mezunlarımızın Ayak İzleri
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Dünyanın dört bir yanında bilime, kültüre ve teknolojiye yön veren mezunlarımızın sesi.
              </p>
            </div>
            <button
              onClick={() => setActivePage('directory')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <span>Tüm Mezunları Görüntüle</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-6">
                "İstanbul Tıp Fakültesi'nin köklü koridorlarında başlayan araştırmacı ruhumuz, bugün uluslararası biyoteknoloji laboratuvarlarımızda insanlığa şifa arıyor."
              </p>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800/60">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-xs">
                  ED
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">Dr. Elif Demir</h4>
                  <p className="text-[11px] text-slate-400">İstanbul Tıp '16 | Biyoteknoloji Kurucusu</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-6">
                "Beyazıt Kampüsü'nün tarihi kubbesi altında aldığımız hukuk formasyonu, küresel tahkim masalarında Türkiye'yi en üst düzeyde temsil etmemizi sağladı."
              </p>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800/60">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-xs">
                  ZA
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">Av. Zeynep Aksoy</h4>
                  <p className="text-[11px] text-slate-400">Hukuk Fakültesi '14 | Uluslararası Hukukçu</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-6">
                "Üniversitemizdeki kulüp ve mentorluk çalışmaları sayesinde kurduğumuz yapay zeka girişimi bugün yüzlerce mezuna istihdam kapısı oldu."
              </p>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800/60">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-xs">
                  BO
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">Barış Özkan</h4>
                  <p className="text-[11px] text-slate-400">Mühendislik '19 | AI Lead Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
