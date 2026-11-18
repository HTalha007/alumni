import React from 'react';
import { motion } from 'framer-motion';
import {
  IconGraduationCap,
  IconSearch,
  IconBriefcase,
  IconUsers,
  IconBuilding
} from '../components/Icons';

export default function NotFoundPage({ setActivePage }) {
  return (
    <div className="w-full min-h-[80vh] pt-32 pb-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Arka Plan Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Rozet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <span>404 Hatası</span>
          <span>•</span>
          <span>Generic 404 Redirect</span>
        </motion.div>

        {/* 404 Büyük Sayı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-4"
        >
          <div className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200 via-slate-500 to-slate-800 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-blue-600 flex items-center justify-center font-bold text-white text-base">
                İÜ
              </div>
            </div>
          </div>
        </motion.div>

        {/* Açıklama */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3"
        >
          Aradığınız Sayfa veya Rota Bulunamadı
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
        >
          Talep ettiğiniz adres sistemimizde mevcut değil veya taşınmış olabilir. Üniversite mezunlar ağında kaybolmamanız için sizi doğru rotalara yönlendirelim.
        </motion.p>

        {/* Yönlendirme Butonları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 w-full"
        >
          <button
            onClick={() => setActivePage('home')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 flex items-center space-x-2"
          >
            <span>Ana Sayfaya Dön</span>
          </button>

          <button
            onClick={() => setActivePage('directory')}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2"
          >
            <IconUsers className="w-4 h-4 text-blue-400" />
            <span>Mezun Dizini</span>
          </button>

          <button
            onClick={() => setActivePage('jobs')}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2"
          >
            <IconBriefcase className="w-4 h-4 text-indigo-400" />
            <span>Kariyer Panosu</span>
          </button>
        </motion.div>

        {/* Sistem Bilgisi Notu */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-xs text-slate-500 font-mono">
          FastAPI MVC Guardian 404 & Frontend Client-Side Handler Aktif
        </div>
      </div>
    </div>
  );
}
