import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconBriefcase, IconCheck } from './Icons';

export default function CreateJobModal({ isOpen, onClose, onSuccess, alumniList }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    city: '',
    description: '',
    author_id: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // DDD Domain Doğrulamaları
    if (formData.title.length > 120) {
      setError('İlan başlığı en fazla 120 karakter olabilir (docs/ddd.md kuralı).');
      setSubmitting(false);
      return;
    }
    if (!formData.company.trim()) {
      setError('Şirket adı zorunludur (docs/ddd.md kuralı).');
      setSubmitting(false);
      return;
    }

    try {
      // Backend /jobs/ Pydantic JobCreate (title, description, author_id) bekler
      // Şirket ve şehir bilgilerini description ile zenginleştirerek saklıyoruz
      const fullDescription = [
        `Şirket: ${formData.company}`,
        formData.city ? `Şehir: ${formData.city}` : null,
        formData.description ? `\nDetay:\n${formData.description}` : null
      ].filter(Boolean).join('\n');

      const payload = {
        title: formData.title.trim(),
        description: fullDescription,
        author_id: parseInt(formData.author_id)
      };

      const res = await fetch('http://127.0.0.1:8000/jobs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('İlan yayınlanırken bir sorun oluştu.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
        setFormData({ title: '', company: '', city: '', description: '', author_id: '' });
      }, 1500);
    } catch (err) {
      setError(err.message || 'İlan kaydedilemedi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative z-10"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <IconBriefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Yeni Kariyer İlanı Yayınla</h3>
                <p className="text-xs text-slate-400">İstanbul Üniversitesi mezun ve öğrencilerine açık pozisyon paylaşın.</p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
              <IconX className="w-5 h-5" />
            </button>
          </div>

          {success ? (
            <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <IconCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">İlanınız Yayınlandı!</h4>
              <p className="text-xs text-slate-400">Kariyer panosunda tüm mezunların başvurusuna açıldı.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {error}
                </div>
              )}

              {/* Title (Max 120 char) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">İlan Başlığı *</label>
                  <span className={`text-[11px] ${formData.title.length > 120 ? 'text-rose-400 font-bold' : 'text-slate-500'}`}>
                    {formData.title.length}/120
                  </span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={120}
                  placeholder="Örn: Senior Frontend Developer (React / TypeScript)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Company & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Şirket Adı *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Getir / Trendyol"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Şehir (Opsiyonel)</label>
                  <input
                    type="text"
                    placeholder="Örn: İstanbul (Hibrit)"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Author ID selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">İlanı Açan Mezun *</label>
                <select
                  required
                  value={formData.author_id}
                  onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">İlan veren mezunu seçin...</option>
                  {alumniList.map((alumnus) => (
                    <option key={alumnus.id} value={alumnus.id}>
                      {alumnus.name} (#{alumnus.id}) - {alumnus.title || alumnus.department}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">İlan Detayı & Nitelikler (Opsiyonel)</label>
                <textarea
                  rows="3"
                  placeholder="Aranan yetkinlikler, çalışma koşulları ve staj/iş imkanları..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
                >
                  {submitting ? 'Yayınlanıyor...' : 'İlanı Yayınla'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
